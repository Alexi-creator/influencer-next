import type { SpStatus } from "./spStatusTypes"

// Типы для товаров в корзине
export interface GoodsTypes {
  id: number
  imgHref: string
  brand: string
  description: string
  isDisabled: boolean
  isSp: boolean
  isSelected: boolean
  amount: number
  size: string
  discountPercent: number
  oldSum: string
  newSum: string
  pricingByQuantity?: Record<string, string>
}

// Типы для корзины
export interface CartTypes {
  id: number
  isSp: boolean
  title: string

  soldSum: string
  allSum: string
  spStatus: SpStatus
  progress: string
  date: string
  time: string

  storeName: string
  storeLogoHref?: string

  canCreateSp?: boolean
  canUpdateStore?: boolean

  goods: GoodsTypes[]
}

// Типы для ответа API
export interface DataTypes {
  data: {
    data: CartTypes[]
  }
}

// Типы для мутаций
export interface UpdateGoodsPayload {
  cartId: number
  goodsId: number
  action: "remove" | "toggle-select" | "update-amount"
  amount?: number
}

export interface UpdateCartPayload {
  type: "goods"
  payload: UpdateGoodsPayload
}
