import { scrapeMotorcycleInfo, scrapeMotorcycles } from './methods/yamaha'

export const scrapingMethods = [
  {
    brand: 'yamaha',
    urls: ['https://www.incolmotos-yamaha.com.co/vehiculos/'],
    getMotorcycles: scrapeMotorcycles,
    getMotorcycleInfo: scrapeMotorcycleInfo
  }
]
