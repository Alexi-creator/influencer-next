/* eslint-disable max-len */
import { NextResponse } from "next/server"

export interface ShopPreviewTypes {
  name: string
  title: string
  about: string
  subscribes: number
  categories: {
    text: string
    href?: string
  }[]
  image: string
}

export interface ShopTypes {
  data: {
    preview: ShopPreviewTypes,
    shop: {
      data: { name: string }[]
      count: number
    },
  }
}

const shopStubs: ShopTypes = {
  data: {
    preview: {
      name: "Lass",
      title: "Интернет магазин женской одежды и аксессуаров Lass",
      about: "Lass — сеть магазинов женской одежды и аксессуаров. Ассортимент включает в себя блузы, юбки, брюки, платья, джемперы, рубашки, жакеты, нарядную одежду, пуховики, куртки, пальто и аксессуары от известных брендов.",
      subscribes: 112,
      categories: [
        { text: "Платья и сарафаны", href: "/shop?category=dresses" },
        { text: "Блузы и рубашки", href: "/shop?category=blouses" },
        { text: "Юбки", href: "/shop?category=skirts" },
      ],
      image: "/images/shop-preview.jpg",
    },
    shop: {
      data: [],
      count: 24
    },
  },
}

export async function GET() {
  return NextResponse.json(shopStubs)
}
