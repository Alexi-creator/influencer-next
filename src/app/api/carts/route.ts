
import { NextResponse } from "next/server"

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
  oldSum: string,
  newSum: string,
  pricingByQuantity?: Record<string, string>
}

export interface CartTypes {
  id: number
  isSp: boolean
  title: string

  soldSum: string
  allSum: string
  spStatus: "active" | "happened" | "not-happened"
  progress: string
  date: string
  time: string

  storeName: string
  storeLogoHref?: string

  canCreateSp?: boolean,
  canUpdateStore?: boolean,

  goods: GoodsTypes[]
}

export interface DataTypes {
  data: {
    data: CartTypes[]
  },
}

const cartsStubs: DataTypes = {
  data: {
    data: [
      {
        id: 1,
        isSp: true,
        title: "Покупаем пока есть скидка, девочки",
        soldSum: "79281",
        allSum: "241093",
        spStatus: "active",
        progress: "35%",
        date: "27.01.2020",
        time: "12:00",
        storeName: "Интернет магазин одежды и аксессуаров Lass",
        storeLogoHref: "/images/shop-avatar.png",
        canCreateSp: false,
        canUpdateStore: false,

        goods: [
          {
            id: 1,
            imgHref: "/images/sp-slide2.jpg",
            brand: "Balenciaga",
            description: "Тянущееся платье с длинными рукавами",
            isDisabled: false,
            isSp: true,
            isSelected: true,
            amount: 2,
            size: "34 EU / XS",
            discountPercent: 23,
            oldSum: "102500",
            newSum: "93779",
            pricingByQuantity: {
              "1": "459 000 ₽ / -10%",
              "2-3": "408 000 ₽ / -20%",
              "4": "357 000 ₽ / -40%",
            },
          },
          {
            id: 2,
            imgHref: "/images/sp-slide2.jpg",
            brand: "Balenciaga2",
            description: "Тянущееся платье с длинными рукавами2",
            isDisabled: false,
            isSp: true,
            isSelected: false,
            amount: 2,
            size: "34 EU / XS",
            discountPercent: 23,
            oldSum: "102500",
            newSum: "93779",
            pricingByQuantity: {
              "1": "459 000 ₽ / -10%",
              "2-3": "408 000 ₽ / -20%",
              "4": "357 000 ₽ / -40%",
            },
          },
          {
            id: 3,
            imgHref: "/images/sp-slide2.jpg",
            brand: "Balenciaga3",
            description: "Тянущееся платье с длинными рукавами3",
            isDisabled: false,
            isSp: true,
            isSelected: false,
            amount: 2,
            size: "34 EU / XS",
            discountPercent: 23,
            oldSum: "102500",
            newSum: "93779",
            pricingByQuantity: {
              "1": "459 000 ₽ / -10%",
              "2-3": "408 000 ₽ / -20%",
              "4": "357 000 ₽ / -40%",
            },
          },
          {
            id: 4,
            imgHref: "/images/sp-slide2.jpg",
            brand: "Balenciaga4",
            description: "Тянущееся платье с длинными рукавами4",
            isDisabled: true,
            isSp: true,
            isSelected: false,
            amount: 2,
            size: "34 EU / XS",
            discountPercent: 23,
            oldSum: "102500",
            newSum: "93779",
            pricingByQuantity: {
              "1": "459 000 ₽ / -10%",
              "2-3": "408 000 ₽ / -20%",
              "4": "357 000 ₽ / -40%",
            },
          },
        ],
      },
    ],
  },
}

export async function GET() {
  return NextResponse.json(cartsStubs)
}
