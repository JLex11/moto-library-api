import { CheerioAPI } from 'cheerio'
import { MotorcycleInfo } from '../../../../types'
import { MotorcyclesData } from '../../types'
import { getDeductibleData, getImages, getTechSpecs } from './utils'

export const scrapeMotorcycles = ($page: CheerioAPI): MotorcyclesData[] => {
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

export const scrapeMotorcycleInfo = ($page: CheerioAPI): MotorcycleInfo => {
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
      currency: 'USD',
      ivaIncluded
    },
    techSpecs,
    deductibleData,
    images
  }
}
