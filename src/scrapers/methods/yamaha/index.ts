import { CheerioAPI } from 'cheerio'
import { Motorcycle, MotorcycleInfo } from '../../../../types'
import { MotorcyclesData, ScrapedMotorcycle } from '../../types'
import { cheerioFromUrl } from '../../utils/cheerioFromUrl'
import { scrapingData } from './constants'
import { getDeductibleData } from './lib/getDeductibles'
import { getImages } from './lib/getImages'
import { getTechSpecs } from './lib/getTechSpecs'

const scrapeMotorcyclesList = ($page: CheerioAPI): MotorcyclesData[] => {
  const $motorcyclesSections = [...$page('.all-info section .row:not(:nth-child(1), :nth-child(2))')]

  const motorcyclesData = $motorcyclesSections.flatMap(motorcyclesSection => {
    const motorcyclesGroup = $page(motorcyclesSection).find('h2').first().text()
    const $motorcycles = [...$page(motorcyclesSection).find('a')]

    const motorcycles = $motorcycles.map(motorcycle => {
      const $motorcycle = $page(motorcycle)
      const motorcycleName = $motorcycle.find('.text-motorcycle h2').first().text()
      const motorcycleUrl = $motorcycle.attr('href')!
      const motorcycleGroup = motorcyclesGroup

      return { motorcycleName, motorcycleUrl, motorcycleGroup }
    })

    return motorcycles
  })

  return motorcyclesData
}

const scrapeMotorcycleInfo = ($page: CheerioAPI): MotorcycleInfo => {
  const model = $page('.modelo h1').text()
  const year = $page('.modelo .current').text()
  const price = $page('.introduccion .box-introduction strong, .productView .precio h2')
    .text()
    .replace(/\D/g, '')
  const ivaIncluded =
    $page('.introduccion .box-introduction span, .productView .precio span')
      .text()
      .match(/IVA incluido/i) !== null
  const techSpecs = getTechSpecs($page, model)
  const deductibleData = getDeductibleData($page)
  const images = getImages($page)

  return {
    model,
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

export const getAllMotorcycles = async () => {
  const { brand, urls } = scrapingData

  const motorcyclesPromises = urls.map<Promise<Motorcycle[]>>(async url => {
    const $ = await cheerioFromUrl(url)

    const motorcyclesData = scrapeMotorcyclesList($)
    const motorcycles = await mapMotorcyclesData(motorcyclesData)
    return motorcycles.map(motorcycle => ({ ...motorcycle, brand }))
  })

  const motorcycles = await Promise.all(motorcyclesPromises)
  return motorcycles.flat()
}
