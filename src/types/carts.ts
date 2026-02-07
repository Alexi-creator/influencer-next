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

  isAllSelected: boolean
  goods: GoodsTypes[]
}

// Типы для ответа API
export interface CartsDataTypes {
  data: {
    data: CartTypes[]
  }
}

// Типы для мутаций товаров
export interface UpdateGoodsPayload {
  cartId: number
  goodsId: number
  action: "remove" | "toggle-select" | "update-amount"
  amount?: number
}

// Типы для удаления корзины
export interface RemoveCartPayload {
  cartId: number
}

// Типы для выбора всех товаров в корзине
export interface SelectAllGoodsPayload {
  cartId: number
  isAllSelected: boolean // текущее состояние до переключения
}

// Объединённый тип для всех мутаций
export type UpdateCartPayload =
  | { type: "goods"; payload: UpdateGoodsPayload }
  | { type: "cart-remove"; payload: RemoveCartPayload }
  | { type: "cart-select-all"; payload: SelectAllGoodsPayload }
