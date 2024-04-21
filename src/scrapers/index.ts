import * as cheerio from 'cheerio'
import { Motorcycle } from '../../types'
import { scrapingMethods } from './data'
import { ScrapeMotorcyclesFunction, ScrapedMotorcycle } from './types'

const cheerioFromUrl = async (url: string) => {
  const html = await fetch(url).then(res => res.text())
  return cheerio.load(html)
}

const scrapeMotorcycles: ScrapeMotorcyclesFunction = async ($, getMotorcycles, getMotorcycleInfo) => {
  const motorcyclesData = getMotorcycles($)

  const motorcyclesInfoPromises = motorcyclesData.map<Promise<ScrapedMotorcycle>>(async motorcycleData => {
    const { motorcycleUrl, motorcycleGroup } = motorcycleData
    const $motorcyclePage = await cheerioFromUrl(motorcycleUrl)

    const motorcycleInfo = getMotorcycleInfo($motorcyclePage)
    motorcycleInfo.model ||= motorcycleUrl.split('/').findLast(part => part.match(/[a-z]+/)) || ''

    return {
      type: motorcycleGroup,
      ...motorcycleInfo
    }
  })

  const motorcyclesInfo = await Promise.all(motorcyclesInfoPromises)
  return motorcyclesInfo
}

export const scrapeAllMotorcycles = async () => {
  const allMotorcyclesPromises = scrapingMethods.map(
    async ({ urls, brand, getMotorcycles, getMotorcycleInfo }) => {
      const motorcyclesPromises = urls.map<Promise<Motorcycle[]>>(async url => {
        const $ = await cheerioFromUrl(url)
        const motorcycles = await scrapeMotorcycles($, getMotorcycles, getMotorcycleInfo)
        return motorcycles.map(motorcycle => ({ ...motorcycle, brand }))
      })

      const motorcycles = await Promise.all(motorcyclesPromises)
      return motorcycles.flat()
    }
  )

  const allMotorcycles = await Promise.all(allMotorcyclesPromises)
  return allMotorcycles.flat()
}
