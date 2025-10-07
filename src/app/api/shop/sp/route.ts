
import { NextResponse } from "next/server"

interface slideTypes {
  img1: string
  img2: string
  title: string
  priceOld: string
  priceNew: string
}

export interface SpTypes {
  data: {
    id: number
    shopBrandImgHref: string
    title: string
    shareLink: string
    progress: string
    status: "processing" | "ready" | "disabled"
    categories: string
    slides: slideTypes[]
  }[]
  count: number
}

const spStubs: SpTypes = {
  data: [
    {
      id: 1,
      status: "processing",
      shopBrandImgHref: "/images/shop-avatar.png",
      title: "Скупаем платья Gucci со скидкой",
      shareLink: "",
      categories: "Платья и сарафаны, Юбки, Летние платья и еще 23",
      progress: "30%",
      slides: [
        {
          img1: "/images/sp-slide1.jpg",
          img2: "/images/sp-slide2.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        },
        {
          img1: "/images/sp-slide2.jpg",
          img2: "/images/sp-slide3.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique2\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        },
        {
          img1: "/images/sp-slide3.jpg",
          img2: "/images/sp-slide4.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique3\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        },
        {
          img1: "/images/sp-slide4.jpg",
          img2: "/images/sp-slide1.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique4\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        }
      ],
    },
    {
      id: 2,
      status: "ready",
      shopBrandImgHref: "/images/shop-avatar.png",
      title: "Скупаем платья Gucci со скидкой2",
      shareLink: "",
      categories: "Платья и сарафаны, Юбки, Летние платья и еще 23",
      progress: "100%",
      slides: [
        {
          img1: "/images/sp-slide1.jpg",
          img2: "/images/sp-slide2.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        },
        {
          img1: "/images/sp-slide2.jpg",
          img2: "/images/sp-slide3.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique2\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        },
        {
          img1: "/images/sp-slide3.jpg",
          img2: "/images/sp-slide4.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique3\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        },
        {
          img1: "/images/sp-slide4.jpg",
          img2: "/images/sp-slide1.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique4\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        }
      ],
    },
    {
      id: 3,
      status: "disabled",
      shopBrandImgHref: "/images/shop-avatar.png",
      title: "Скупаем платья Gucci со скидкой3",
      shareLink: "",
      categories: "Платья и сарафаны, Юбки, Летние платья и еще 23",
      progress: "100%",
      slides: [
        {
          img1: "/images/sp-slide1.jpg",
          img2: "/images/sp-slide2.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        },
        {
          img1: "/images/sp-slide2.jpg",
          img2: "/images/sp-slide3.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique2\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        },
        {
          img1: "/images/sp-slide3.jpg",
          img2: "/images/sp-slide4.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique3\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        },
        {
          img1: "/images/sp-slide4.jpg",
          img2: "/images/sp-slide1.jpg",
          title: "Короткое платье из денима с \"Gucci Boutique4\"",
          priceOld: "12 500 ₽",
          priceNew: "10 500 ₽"
        }
      ],
    },
  ],
  count: 3
}

export async function GET() {
  return NextResponse.json(spStubs)
}
