import { CheerioAPI } from 'cheerio'
import { MotorcycleImages } from '../../../../../types'
import { DOMAIN } from '../constants'

export const getImages = ($page: CheerioAPI): MotorcycleImages => {
  const colorImages = [...$page('.carousel-indicators.carousel-indicators-numbers li')].map(colorImgCheck => {
    const $colorImgCheck = $page(colorImgCheck)
    const dataSlideTo = $colorImgCheck.attr('data-slide-to')!

    const imagePath = $page(`.carousel-inner .item:nth-child(${Number(dataSlideTo) + 1}) img`).attr('src')!
    const imageSrc = `${DOMAIN}${imagePath}`
    const color = $colorImgCheck.css('background-color') || ''

    return { color, image: imageSrc }
  })

  const gallery = [...$page('.galeria-moto .img-galeria')].map(galleryItem => {
    const $galleryItem = $page(galleryItem)
    const imagePath = $galleryItem.css('background-image')!.replace(/url\(("|')(.*)("|')\)/, '$2')
    const imageSrc = `${DOMAIN}${imagePath}`
    const imageTitle = $galleryItem.find('a').text()

    return { image: imageSrc, title: imageTitle }
  })

  return {
    colorImages: colorImages,
    gallery: gallery
  }
}
