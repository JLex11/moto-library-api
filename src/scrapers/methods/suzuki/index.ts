import { CheerioAPI } from 'cheerio'
import { Motorcycle, MotorcycleInfo } from '../../../../types'
import { MotorcyclesData, ScrapedMotorcycle } from '../../types'
import { cheerioFromUrl } from '../../utils/cheerioFromUrl'
import { scrapingData } from './constants'
import { getDeductibleData } from './lib/getDeductibles'
import { getImages } from './lib/getImages'
import { getTechSpecs } from './lib/getTechSpecs'

const scrapeMotorcycles = ($page: CheerioAPI): MotorcyclesData[] => {
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
  const model = $page('.titulo p').first().text()
  const year = $page('.modelo').first().text()
  const price = $page('.precio-moto').first().text().replace(/\D/g, '')
  const ivaIncluded =
    $page('.precio .iva')
      .text()
      .match(/\+ IVA/i) !== null
  const techSpecs = getTechSpecs($page)
  const deductibleData = getDeductibleData($page)
  const images = getImages($page)

  return {
    model,
    year: Number(year),
    price: {
      price: Number(price),
      currency: 'USD',
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
    const $motorcyclePage = await cheerioFromUrl(motorcycleUrl)

    const motorcycleInfo = scrapeMotorcycleInfo($motorcyclePage)
    motorcycleInfo.model ||= motorcycleUrl.split('/').findLast(part => part.match(/[a-z]+/)) || ''

    return {
      type: motorcycleGroup,
      ...motorcycleInfo
    }
  })

  const motorcyclesInfo = await Promise.all(motorcyclesInfoPromises)
  return motorcyclesInfo
}

const getPaginationUrls = ($: CheerioAPI) => {
  return $('.pager__item a')
    .toArray()
    .map(a => a.attribs.href)
}

export const getAllMotorcycles = async () => {
  const { brand, urls } = scrapingData

  const motorcyclesPromises = urls.map<Promise<Motorcycle[]>>(async url => {
    const $ = await cheerioFromUrl(url)

    const paginationUrls = getPaginationUrls($)
    const motorcyclesPromises = paginationUrls.map(async paginationUrl => {
      const $page = await cheerioFromUrl(paginationUrl)
      return scrapeMotorcycles($page)
    })

    const motorcyclesData = await Promise.all(motorcyclesPromises)
    const flattenedMotorcyclesData = motorcyclesData.flat()

    const motorcycles = await mapMotorcyclesData(flattenedMotorcyclesData)
    return motorcycles.map(motorcycle => ({ ...motorcycle, brand }))
  })

  const motorcycles = await Promise.all(motorcyclesPromises)
  return motorcycles.flat()
}
