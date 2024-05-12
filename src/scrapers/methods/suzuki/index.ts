import { cheerioFromUrl } from '@/scrapers/utils/cheerioFromUrl'
import { CheerioAPI } from 'cheerio'
import { Motorcycle, MotorcycleInfo } from '../../../../types'
import { MotorcyclesData, ScrapedMotorcycle } from '../../types'
import { DOMAIN, scrapingData } from './constants'
import { getDeductibleData } from './lib/getDeductibles'
import { getImages } from './lib/getImages'
import { getTechSpecs } from './lib/getTechSpecs'

const scrapeMotorcyclesList = ($page: CheerioAPI): MotorcyclesData[] => {
  const $motorcycles = [...$page('.moto-info')]

  const motorcycles = $motorcycles.map(motorcycle => {
    const $motorcycle = $page(motorcycle)
    const motorcycleName = $motorcycle.find('h4').first().text()
    const motorcycleUrl = $motorcycle.find('a').first().attr('href')!
    const motorcycleGroup = $motorcycle.find('div > p').first().text()

    return { motorcycleName, motorcycleUrl, motorcycleGroup }
  })

  return motorcycles
}

const scrapeMotorcycleInfo = ($page: CheerioAPI): MotorcycleInfo => {
  const model = $page('.titulo p').first().text().trim()
  const year = $page('.modelo').first().text().replace(/\D/g, '')
  const price = $page('.precio-moto').first().text().replace(/\D/g, '')
  const type = $page('.categoria').first().text().trim()
  const ivaIncluded =
    $page('.precio .iva')
      .text()
      .match(/\+ IVA/i) !== null
  const techSpecs = getTechSpecs($page)
  const deductibleData = getDeductibleData($page)
  const images = getImages($page)

  return {
    model,
    type,
    year: Number(year),
    price: {
      price: Number(price),
      currency: 'COP',
      ivaIncluded
    },
    techSpecs,
    deductibleData,
    images
  }
}

const mapMotorcyclesData = async (motorcyclesData: MotorcyclesData[]): Promise<ScrapedMotorcycle[]> => {
  const motorcyclesInfoPromises = motorcyclesData.map<Promise<ScrapedMotorcycle>>(async motorcycleData => {
    const { motorcycleUrl, motorcycleGroup } = motorcycleData

    const urlToLoad = motorcycleUrl.match(/https?:\/\//) ? motorcycleUrl : `${DOMAIN}${motorcycleUrl}`
    const $motorcyclePage = await cheerioFromUrl(urlToLoad)

    const motorcycleInfo = scrapeMotorcycleInfo($motorcyclePage)
    motorcycleInfo.model ||= motorcycleUrl.split('/').findLast(part => part.match(/[a-z]+/)) || ''

    return {
      type: motorcycleInfo.type || motorcycleGroup,
      ...motorcycleInfo
    }
  })

  const motorcyclesInfo = await Promise.all(motorcyclesInfoPromises)
  return motorcyclesInfo
}

const getPaginationUrls = ($: CheerioAPI, url: string) => {
  return $('.pager__item a')
    .toArray()
    .map(a => {
      const href = a.attribs.href
      return `${url}${href}`
    })
}

export const getAllMotorcycles = async () => {
  const { brand, urls } = scrapingData

  const motorcyclesPromises = urls.map<Promise<Motorcycle[]>>(async url => {
    const $ = await cheerioFromUrl(url)

    const paginationUrls = getPaginationUrls($, url)

    const motorcyclesData = await Promise.all(
      paginationUrls.map(async paginationUrl => {
        const $page = await cheerioFromUrl(paginationUrl)
        return scrapeMotorcyclesList($page)
      })
    )

    const flattenedMotorcyclesData = motorcyclesData.flat()

    const motorcycles = await mapMotorcyclesData(flattenedMotorcyclesData)
    return motorcycles.map(motorcycle => ({ ...motorcycle, brand }))
  })

  const motorcycles = await Promise.all(motorcyclesPromises)
  return motorcycles.flat()
}
