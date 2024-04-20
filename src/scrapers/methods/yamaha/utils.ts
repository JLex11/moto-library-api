import { CheerioAPI } from 'cheerio'
import { DeductibleData, MotorcycleImages, TechSpecs } from '../../../../types'
import { defineTechSpecs } from '../utils'

export const getTechSpecs = ($page: CheerioAPI, model: string): TechSpecs => {
  const techSpecs: TechSpecs = defineTechSpecs()
  const $techSpecRows = [...$page('.specification-info table tbody tr, .especTecnicas tbody tr')]

  $techSpecRows.forEach(elementRow => {
    const $specRow = $page(elementRow)
    const $title = $specRow.find('td').first()
    const title = $title.text().trim().toLowerCase()
    const value = $specRow.find('td').last().text().toLowerCase().trim()

    if (title.match(/disposición de los cilindros:*/i)) {
      const [cylinderNumber, cylinderLayout] = value.split(' cilindro ')
      techSpecs.engine.cylinders.number = parseInt(cylinderNumber, 10)
      techSpecs.engine.cylinders.layout = cylinderLayout
    }
    if (title.match(/cilindraje:*/i)) techSpecs.engine.displacement = Number(value.replace(/\D/g, ''))
    if (title.match(/relación de compresión:*/i)) techSpecs.engine.compressionRatio = value
    if (title.match(/tipo de motor:*/i)) techSpecs.engine.cooling = value.split(',').pop()?.trim() || 'aire'
    if (title.match(/sistema de alimentación:*/i)) techSpecs.engine.fuelSystem = value
    if (title.match(/capacidad batería:*/i)) techSpecs.engine.battery = value
    if (title.match(/potencia máxima:*/i)) {
      const [hp, rpm] = value.split(' a ')
      techSpecs.engine.power.hp = hp ? Number(hp.replace(/\D/g, '')) : 0
      techSpecs.engine.power.rpm = rpm ? Number(rpm.replace(/\D/g, '')) : 0
    }
    if (title.match(/torque máximo:*/i)) {
      const [nm, rpm] = value.split(/a|\/|@/)
      techSpecs.engine.torque.nm = nm ? Number(nm.replace(/\D/g, '')) : 0
      techSpecs.engine.torque.rpm = rpm ? Number(rpm.replace(/\D/g, '')) : 0
    }
    if (title.match(/tipo de chasis:*/i)) techSpecs.chassis = value
    if (title.match(/regulación:*/i)) techSpecs.engine.gasEmission = value
    if (title.match(/freno delantero:*/i)) techSpecs.brakes.front.type = value
    if (title.match(/freno trasero:*/i)) techSpecs.brakes.rear.type = value
    if (title.match(/tipo de suspensión delantera:*/i)) techSpecs.suspension.front = value
    if (title.match(/tipo de suspensión trasera:*/i)) techSpecs.suspension.rear = value
    if (title.match(/rueda delantera:*/i)) techSpecs.wheels.front = { type: 'llanta', size: value }
    if (title.match(/rueda trasera:*/i)) techSpecs.wheels.rear = { type: 'llanta', size: value }
    if (title.match(/largo total:*/i)) techSpecs.dimensions.length = value
    if (title.match(/ancho total:*/i)) techSpecs.dimensions.width = value
    if (title.match(/altura total:*/i)) techSpecs.dimensions.height = value
    if (title.match(/altura al asiento:*/i)) techSpecs.dimensions.seatHeight = value
    if (title.match(/distancia entre ejes:*/i)) techSpecs.dimensions.wheelbase = value
    if (title.match(/peso .*/i)) techSpecs.dimensions.weight = value
    if (title.match(/tipo de transmisión:*/i)) {
      const [transmissionType, gears] = value.split(' de ')
      techSpecs.transmission.type = transmissionType
      techSpecs.transmission.gears = gears ? Number(gears.replace(/\D/g, '')) : 1
    }
    if (title.match(/capacidad de combustible:*/i)) techSpecs.fuel.tank = value.split('/').shift()!
    if (title.match(/luz principal/i)) techSpecs.equipment.lights = value
    if (title.match(/Euro:*/i)) techSpecs.engine.gasEmission = value.replace(/\D/g, '')
    if (title.match(/ABS:*/i)) techSpecs.brakes.antiLockBrakingSystem = value === 'si'
    if (title.match(/control de tracción:*/i)) techSpecs.equipment.tractionControl = value === 'si'
    if (title.match(/FI:*/i))
      techSpecs.engine.fuelSystem = value === 'si' ? 'inyección' : techSpecs.engine.fuelSystem
  })

  return techSpecs
}

export const getDeductibleData = ($page: CheerioAPI): DeductibleData => ({})

export const getImages = ($page: CheerioAPI): MotorcycleImages => {
  const bannerImage =
    $page('.banner-product-bike img').attr('src') ||
    $page('.banner.banner .swiperBanner .swiper-slide')
      .css('background-image')
      ?.replace(/url\(|\)/g, '')

  const colorImages = [...$page('.color-img .colors-change .checks .check, .productView img')].map(
    colorImgCheck => {
      const $colorImgCheck = $page(colorImgCheck)
      const imageSrc = $colorImgCheck.attr('data-color') || $colorImgCheck.attr('src')!
      const color = $colorImgCheck.find('.box').first().css('background-color') || ''

      return { color, image: imageSrc }
    }
  )

  const videos = [...$page('.video-player .video source')].map(videoSrc => {
    const $videoSrc = $page(videoSrc)
    const src = $videoSrc.attr('src')!
    const type = $videoSrc.attr('type')

    return { src, type }
  })

  const gallery = [...$page('.gallery a, .galeria .swipergaleria .mySwiperGal .swiper-slide')].map(
    galleryItem => {
      const $galleryItem = $page(galleryItem)
      const imageSrc = $galleryItem.find('img').attr('src')!
      const imageTitle = $galleryItem.find('a').attr('data-caption') || $galleryItem.find('img').attr('alt')

      return { image: imageSrc, title: imageTitle }
    }
  )

  return {
    banner: bannerImage,
    colorImages: colorImages,
    gallery: gallery,
    videos: videos
  }
}
