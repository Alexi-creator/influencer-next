export interface ProductBreadcrumb {
  text: string
  href: string
}

export interface ProductTypes {
  id: number
  images: string[]
  point: string
  deliveryPrice: string
  productDescription: string
  productName: string
  productShortDescription: string
  likesScore: number
  postScore: number
  priceCrossed: string
  priceNew: string
  discountScore: number
  sellerName: string
  imgSeller: string
  isDiscount?: boolean
  discountExtra?: number
  discountExtraSum?: string
  spDiscountLinksFound?: string
  breadcrumbs: ProductBreadcrumb[]
  extraClass?: string
}
