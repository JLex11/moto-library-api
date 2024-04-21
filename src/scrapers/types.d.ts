import { CheerioAPI } from 'cheerio'
import { Motorcycle, MotorcycleInfo } from '../../types'

export interface ScrapingMethod {
  brand: string
  urls: string[]
  getMotorcycles: ($page: CheerioAPI) => MotorcyclesData[]
  getMotorcycleInfo: ($page: CheerioAPI) => MotorcycleInfo
}

export interface MotorcyclesData {
  motorcycleName: string
  motorcycleUrl: string
  motorcycleGroup?: string
}

type ScrapedMotorcycle = Omit<Motorcycle, 'brand'>

type ScrapeMotorcyclesFunction = (
  $: CheerioAPI,
  getMotorcycles: ScrapingMethod['getMotorcycles'],
  getMotorcycleInfo: ScrapingMethod['getMotorcycleInfo']
) => Promise<ScrapedMotorcycle[]>
