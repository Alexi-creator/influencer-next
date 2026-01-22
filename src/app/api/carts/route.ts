
import { NextResponse } from "next/server"

export interface goodsTypes {
  id: number
  imgHref: string
  brand: string
  description: string
  disabled: boolean
  sp: boolean
}

export interface CartTypes {
  id: number
  isSP: boolean
  title: string
  soldSum: string
  allSum: string
  spStatus: "active" | "happened" | "not-happened"
  progress: string
  date: string
  time: string

  // type: "Товары",
  // isActiveChooseAll: true,
  // isInActiveChooseAll: false,
  // isBottomControl: false,
  // position: "",
  // amount: "",
  oldSum: "182500",
  newSum: "93779",
  // totalOldSum: "205 000",
  // totalNewSum: "187 558",
  canCreateSP: false,
  canUpdateStore: true,

  goods: goodsTypes[]
}

export interface DataTypes {
  data: {
    data: CartTypes[]
    count: number
  },
}

const cartsStubs: DataTypes = {
  data: {
    data: [
      {
        id: 1,
        isSP: true,
        title: "Покупаем пока есть скидка, девочки",
        soldSum: "79281",
        allSum: "241093",
        spStatus: "active",
        progress: "35%",
        date: "27.01.2020",
        time: "12:00",
        oldSum: "182500",
        newSum: "93779",
        canCreateSP: false,
        canUpdateStore: true,

        goods: [
          {
            id: 1,
            imgHref: "/images/sp-slide2.jpg",
            brand: "Balenciaga",
            description: "Тянущееся платье с длинными рукавами",
            disabled: false,
            sp: true,
          },
        ],
      },
    ],
    count: 116
  },
}

export async function GET() {
  return NextResponse.json(cartsStubs)
}
