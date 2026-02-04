// Типы для элементов публикации
export interface PublicationItemTypes {
  id: number
  imgHref: string
}

// Типы для элементов галереи
export interface GalleryItemTypes {
  id: number
  imgHref: string
  moreCount?: number
}

// Типы для публикации
export interface PublicationTypes {
  id: number
  authorName: string
  authorAvatar: string
  createdAt: string
  title: string
  views: number
  description: string
  totalPrice: string
  likes: number
  hashtags: string[]
  authorActivity: string
  publicationItems: PublicationItemTypes[]
  galleryItems: GalleryItemTypes[]
  swiperImages: string[]
}

// Типы для ответа API
export interface PublicationDataTypes {
  data: {
    data: PublicationTypes
  }
}
