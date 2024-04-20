import * as cheerio from 'cheerio'
import { Motorcycle } from '../../types'
import { scrapingMethods } from './data'

const cheerioFromUrl = async (url: string) => {
  const html = await fetch(url).then(res => res.text())
  return cheerio.load(html)
}

export const getAllMotorcycles = async () => {
  const allMotorcyclesPromises = scrapingMethods.map(
    async ({ urls, brand, getMotorcycles, getMotorcycleInfo }) => {
      const motorcyclesPromises = urls.map<Promise<Motorcycle[]>>(async url => {
        const $ = await cheerioFromUrl(url)

        const motorcyclesData = getMotorcycles($)
        const motorcyclesInfoPromises = motorcyclesData.map<Promise<Motorcycle>>(async motorcycleData => {
          const { motorcycleUrl, motorcycleGroup } = motorcycleData
          const $motorcyclePage = await cheerioFromUrl(motorcycleUrl)

          const motorcycleInfo = getMotorcycleInfo($motorcyclePage)
          if (!motorcycleInfo.model) {
            motorcycleInfo.model = motorcycleUrl.split('/').findLast(part => part.match(/[a-z]+/)) || ''
          }

          return {
            brand,
            type: motorcycleGroup,
            ...motorcycleInfo
          }
        })

        const motorcyclesInfo = await Promise.all(motorcyclesInfoPromises)
        return motorcyclesInfo
      })

      const motorcycles = await Promise.all(motorcyclesPromises)
      return motorcycles.flat()
    }
  )

  const allMotorcycles = await Promise.all(allMotorcyclesPromises)
  return allMotorcycles.flat()
}
