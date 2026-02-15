import { type NextRequest, NextResponse } from "next/server"
import type { SpSlideTypes } from "@/types/sp.schema"

const slides: SpSlideTypes[] = [
  {
    img1: "/images/sp-slide1.jpg",
    img2: "/images/sp-slide2.jpg",
    title: 'Короткое платье из денима с "Gucci Boutique"',
    priceOld: "12 500 ₽",
    priceNew: "10 500 ₽",
  },
  {
    img1: "/images/sp-slide2.jpg",
    img2: "/images/sp-slide3.jpg",
    title: 'Короткое платье из денима с "Gucci Boutique2"',
    priceOld: "12 500 ₽",
    priceNew: "10 500 ₽",
  },
  {
    img1: "/images/sp-slide3.jpg",
    img2: "/images/sp-slide4.jpg",
    title: 'Короткое платье из денима с "Gucci Boutique3"',
    priceOld: "12 500 ₽",
    priceNew: "10 500 ₽",
  },
  {
    img1: "/images/sp-slide4.jpg",
    img2: "/images/sp-slide1.jpg",
    title: 'Короткое платье из денима с "Gucci Boutique4"',
    priceOld: "12 500 ₽",
    priceNew: "10 500 ₽",
  },
]

const statuses = ["processing", "ready", "disabled"] as const

const allSpItems = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  status: statuses[i % 3],
  shopBrandImgHref: "/images/shop-avatar.png",
  title: `Скупаем платья Gucci со скидкой ${i + 1}`,
  shareLink: "",
  categories: "Платья и сарафаны, Юбки, Летние платья и еще 23",
  progress: statuses[i % 3] === "processing" ? "30%" : "100%",
  slides,
}))

const PAGE_SIZE = 3

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page = Number(searchParams.get("page") ?? 1)

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const pageData = allSpItems.slice(start, end)

  return NextResponse.json({
    data: pageData,
    count: allSpItems.length,
  })
}
