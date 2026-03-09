/* eslint-disable max-len */
import { type NextRequest, NextResponse } from "next/server"

import type { ProductCardTypes, ProductMenuTypes } from "@/app/api/shop/[id]/goods/route"
import type { PostCardTypes } from "@/types/postCard.schema"

// ─── Goods (ProductCards + menu) ─────────────────────────────────────────────

const goodsMenu: ProductMenuTypes[] = [
  {
    title: "Одежда",
    value: "cloth",
    count: 1200,
    children: [
      {
        title: "Платья и сарафаны",
        value: "dresses",
        children: [
          { title: "Летние платья", value: "summer-dresses" },
          { title: "Вечерние платья", value: "evening-dresses" },
        ],
      },
      { title: "Блузы и рубашки", value: "blouses" },
      { title: "Юбки", value: "skirts" },
    ],
  },
  {
    title: "Обувь",
    value: "shoes",
    children: [
      { title: "Туфли", value: "heels" },
      { title: "Кроссовки", value: "sneakers" },
      { title: "Сапоги", value: "boots" },
    ],
  },
  {
    title: "Аксессуары",
    value: "accessories",
    children: [
      { title: "Сумки", value: "bags" },
      { title: "Украшения", value: "jewelry" },
    ],
  },
]

const goodsMock: { data: ProductCardTypes[]; count: number; menu: ProductMenuTypes[] } = {
  data: [
    {
      id: 1,
      className: "",
      title: "Комбинезон из шелковой вискозы с",
      discount: "--discount",
      sale: "от 91 250 ₽",
      hasLike: true,
      sizes: [36, 38],
      applicationStatus: "",
      href: "",
      dataInfo: { brand: "Yves Saint Lauren", title: "Комбинезон из шелковой вискозы с" },
      brand: "Yves Saint Lauren",
      firstImageSrc: "/images/product-card.jpg",
      secondImageSrc: "/images/product-card2.jpg",
      status: "",
    },
    {
      id: 2,
      className: "",
      title: "Плетеная сумка-сэтчел",
      discount: "",
      sale: "",
      hasLike: true,
      sizes: [38, 40],
      applicationStatus: "",
      href: "",
      dataInfo: { brand: "Yves Saint Lauren 2", title: "Плетеная сумка-сэтчел" },
      brand: "Yves Saint Lauren 2",
      firstImageSrc: "/images/product-card.jpg",
      secondImageSrc: "/images/product-card2.jpg",
      status: "",
    },
    {
      id: 3,
      className: "",
      title: "Туфли ZOE с острым носом",
      discount: "",
      sale: "",
      hasLike: true,
      sizes: [36, 40],
      applicationStatus: "",
      href: "",
      dataInfo: { brand: "Yves Saint Lauren 3", title: "Туфли ZOE с острым носом" },
      brand: "Yves Saint Lauren 3",
      firstImageSrc: "/images/product-card.jpg",
      secondImageSrc: "/images/product-card2.jpg",
      status: "",
    },
  ],
  count: 3,
  menu: goodsMenu,
}

// ─── Publications (PostCards) ─────────────────────────────────────────────────

const publicationsMock: { data: PostCardTypes[]; count: number } = {
  data: [
    {
      id: 1,
      imgSrc: "/images/post-card-img-black.png",
      desc: "Лучший летний образ этого сезона — лёгкий комбинезон из шёлковой вискозы",
      userName: "Yves Saint Lauren",
      userLogoSrc: "/images/avatar-influencer.jpg",
      rating: 4,
      scoresDiscus: 12,
      scoresLikes: 340,
      liked: true,
    },
    {
      id: 2,
      imgSrc: "/images/post-card-img-white.png",
      desc: "Плетёная сумка-сэтчел — идеальный аксессуар для городских прогулок",
      userName: "Yves Saint Lauren",
      userLogoSrc: "/images/avatar-influencer.jpg",
      rating: 5,
      scoresDiscus: 8,
      scoresLikes: 210,
      liked: true,
    },
    {
      id: 3,
      imgSrc: "/images/post-louis-vuitton.png",
      desc: "Новая коллекция осень-зима: элегантность в каждой детали",
      userName: "Yves Saint Lauren",
      userLogoSrc: "/images/avatar-influencer.jpg",
      rating: 3,
      scoresDiscus: 5,
      scoresLikes: 98,
      liked: true,
    },
  ],
  count: 3,
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") ?? "goods"

  if (type === "publications") {
    return NextResponse.json(publicationsMock)
  }

  return NextResponse.json(goodsMock)
}
