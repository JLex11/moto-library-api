import { CheerioAPI } from 'cheerio'
import { MotorcycleImages } from '../../../../../types'

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
