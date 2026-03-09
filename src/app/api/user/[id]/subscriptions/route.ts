/* eslint-disable max-len */
import { type NextRequest, NextResponse } from "next/server"

import type { ProductCardTypes, ProductMenuTypes } from "@/app/api/shop/[id]/goods/route"
import type { ShopsTypes } from "@/app/api/shops/route"
import type { SpCardTypes } from "@/types/sp.schema"
import type { UserCardTypes } from "@/types/users.schema"

// ─── Shops ───────────────────────────────────────────────────────────────────

const shopsMock: { data: ShopsTypes[]; count: number } = {
  data: [
    {
      id: 1,
      logoImgHref: "/images/shop-avatar.png",
      name: "Интернет магазин женской одежды и аксессуаров Lass",
      itemImages: [
        "/images/product-card.jpg",
        "/images/product-first.png",
        "/images/product-third.png",
        "/images/product-fourth.png",
        "/images/product-fifth.png",
      ],
      benefits: ["до-10%", "134 СП", "79 TFF"],
      categories: [
        { text: "Платья и сарафаны", href: "#" },
        { text: "Блузы и рубашки", href: "#" },
        { text: "Юбки", href: "" },
        { text: "+ еще 12", href: "" },
      ],
      isSubscribed: true,
    },
    {
      id: 2,
      logoImgHref: "/images/shop-avatar.png",
      name: "Интернет магазин женской одежды и аксессуаров Lass2",
      itemImages: [
        "/images/product-card.jpg",
        "/images/product-first.png",
        "/images/product-third.png",
        "/images/product-fourth.png",
        "/images/product-fifth.png",
      ],
      benefits: ["до-10%", "134 СП", "79 TFF"],
      categories: [
        { text: "Платья и сарафаны", href: "#" },
        { text: "Блузы и рубашки", href: "#" },
        { text: "Юбки", href: "" },
        { text: "+ еще 12", href: "" },
      ],
      isSubscribed: false,
    },
    {
      id: 3,
      logoImgHref: "/images/shop-avatar.png",
      name: "Интернет магазин женской одежды и аксессуаров Lass3",
      itemImages: [
        "/images/product-card.jpg",
        "/images/product-first.png",
        "/images/product-third.png",
        "/images/product-fourth.png",
        "/images/product-fifth.png",
      ],
      benefits: ["до-10%", "134 СП", "79 TFF"],
      categories: [
        { text: "Платья и сарафаны", href: "#" },
        { text: "Блузы и рубашки", href: "#" },
        { text: "Юбки", href: "" },
        { text: "+ еще 12", href: "" },
      ],
      isSubscribed: true,
    },
  ],
  count: 3,
}

// ─── SP (Joint Purchases) ─────────────────────────────────────────────────────

const slides = [
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
]

const statuses = ["processing", "ready", "disabled"] as const

const spMock: { data: SpCardTypes[]; count: number } = {
  data: Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    status: statuses[i % 3],
    shopBrandImgHref: "/images/shop-avatar.png",
    title: `Скупаем платья Gucci со скидкой ${i + 1}`,
    shareLink: "",
    categories: "Платья и сарафаны, Юбки, Летние платья и еще 23",
    progress: statuses[i % 3] === "processing" ? "30%" : "100%",
    slides,
  })),
  count: 3,
}

// ─── TFF (Product Cards) ──────────────────────────────────────────────────────

const tffMenu: ProductMenuTypes[] = [
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
      {
        title: "Блузы и рубашки",
        value: "blouses",
      },
      {
        title: "Юбки",
        value: "skirts",
      },
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

const tffMock: { data: ProductCardTypes[]; count: number; menu: ProductMenuTypes[] } = {
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
      hasLike: false,
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
      title: "Туфли ZOE с острым носом и эластичныим",
      discount: "",
      sale: "",
      hasLike: false,
      sizes: [36, 40],
      applicationStatus: "",
      href: "",
      dataInfo: { brand: "Yves Saint Lauren 3", title: "Туфли ZOE с острым носом и эластичныим" },
      brand: "Yves Saint Lauren 3",
      firstImageSrc: "/images/product-card.jpg",
      secondImageSrc: "/images/product-card2.jpg",
      status: "",
    },
    {
      id: 4,
      className: "",
      title: "Пуховик из кожи с узором monogram mi",
      discount: "",
      sale: "",
      hasLike: true,
      sizes: [36, 38, 40],
      applicationStatus: "",
      href: "",
      dataInfo: { brand: "Yves Saint Lauren 4", title: "Пуховик из кожи с узором monogram mi" },
      brand: "Yves Saint Lauren 4",
      firstImageSrc: "/images/product-card.jpg",
      secondImageSrc: "/images/product-card2.jpg",
      status: "",
    },
  ],
  count: 4,
  menu: tffMenu,
}

// ─── Bloggers (User Cards) ────────────────────────────────────────────────────

const bloggersMock: { data: UserCardTypes[]; count: number } = {
  data: [
    {
      id: 1,
      imgSrc: "/images/shop-preview.jpg",
      name: "Елена Брадиславская",
      desc: "Ревизор обуви и одежды. Более 10 лет в сфере блогинга.",
      scoresInst: 9801,
      scoresUsers: 140892,
      isSubscribed: true,
    },
    {
      id: 2,
      imgSrc: "/images/logo-rocher.png",
      name: "YVES ROCHER",
      desc: "Увлеченные и ответственные Создатели Растительной Косметики с 1959 года.",
      scoresInst: 1089,
      scoresUsers: 172,
    },
    {
      id: 3,
      imgSrc: "/images/logo-cat.png",
      name: "Кот",
      desc: "Нахожу и испытываю наилучшие продукты для Вашей шерстки. Подписывайтесь.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: true,
    },
    {
      id: 4,
      imgSrc: "/images/shop-preview.jpg",
      name: "Мария Иванова",
      desc: "Lifestyle блогер. Делюсь лучшими находками в моде и красоте.",
      scoresInst: 5200,
      scoresUsers: 83400,
    },
  ],
  count: 4,
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") ?? "shops"

  switch (type) {
    case "sp":
      return NextResponse.json(spMock)
    case "tff":
      return NextResponse.json(tffMock)
    case "bloggers":
      return NextResponse.json(bloggersMock)
    default:
      return NextResponse.json(shopsMock)
  }
}
