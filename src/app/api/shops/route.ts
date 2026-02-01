/* eslint-disable max-len */

import { NextResponse } from "next/server"

interface CategoryTypes {
  text: string
  href: string
}

export interface ShopsTypes {
  id: number
  logoImgHref: string
  name: string
  itemImages: string[]
  benefits: string[]
  categories: CategoryTypes[]
  isSubscribed: boolean
}

export interface ShopTypes {
  id: number
  previewImgHref: string
  goodsImgHref: string[]
  title: string
  benefits: string[]
  about: string
  categories: CategoryTypes[]
  shops: ShopsTypes[]
}

export interface DataTypes {
  data: {
    data: ShopTypes[]
    count: number
  }
}

const shopStubs: DataTypes = {
  data: {
    data: [
      {
        id: 1,
        previewImgHref: "/images/shop-preview.jpg",
        goodsImgHref: [
          "/images/product-card.jpg",
          "/images/product-first.png",
          "/images/product-third.png",
          "/images/product-fourth.png",
          "/images/product-fifth.png",
        ],
        title: "Интернет магазин женской одежды и аксессуаров Lass",
        benefits: ["до-10%", "134 СП", "79 TFF"],
        about:
          "Lass — сеть магазинов женской одежды и аксессуаров. Ассортимент включает в себя блузы, юбки, брюки, платья, джемперы, рубашки, жакеты, нарядную одежду, пуховики, куртки, пальто и аксессуары от известных брендов.",
        categories: [
          { text: "Платья и сарафаны", href: "#" },
          { text: "Блузы и рубашки", href: "#" },
          { text: "Юбки", href: "" },
          { text: "+ еще 12", href: "" },
        ],
        shops: [
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
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 2,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 3,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 4,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
      },
      {
        id: 2,
        previewImgHref: "/images/shop-preview.jpg",
        goodsImgHref: [
          "/images/product-card.jpg",
          "/images/product-first.png",
          "/images/product-third.png",
          "/images/product-fourth.png",
          "/images/product-fifth.png",
        ],
        title: "Интернет магазин женской одежды и аксессуаров Lass2",
        benefits: ["до-10%", "134 СП", "79 TFF"],
        about:
          "Lass2 — сеть магазинов женской одежды и аксессуаров. Ассортимент включает в себя блузы, юбки, брюки, платья, джемперы, рубашки, жакеты, нарядную одежду, пуховики, куртки, пальто и аксессуары от известных брендов.",
        categories: [
          { text: "Платья и сарафаны", href: "#" },
          { text: "Блузы и рубашки", href: "#" },
          { text: "Юбки", href: "" },
          { text: "+ еще 12", href: "" },
        ],
        shops: [
          {
            id: 5,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass2",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 6,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass2",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 7,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass2",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 8,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass2",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
      },
      {
        id: 3,
        previewImgHref: "/images/shop-preview.jpg",
        goodsImgHref: [
          "/images/product-card.jpg",
          "/images/product-first.png",
          "/images/product-third.png",
          "/images/product-fourth.png",
          "/images/product-fifth.png",
        ],
        title: "Интернет магазин женской одежды и аксессуаров Lass3",
        benefits: ["до-10%", "134 СП", "79 TFF"],
        about:
          "Lass3 — сеть магазинов женской одежды и аксессуаров. Ассортимент включает в себя блузы, юбки, брюки, платья, джемперы, рубашки, жакеты, нарядную одежду, пуховики, куртки, пальто и аксессуары от известных брендов.",
        categories: [
          { text: "Платья и сарафаны", href: "#" },
          { text: "Блузы и рубашки", href: "#" },
          { text: "Юбки", href: "" },
          { text: "+ еще 12", href: "" },
        ],
        shops: [
          {
            id: 9,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass3",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 10,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass3",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 11,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass3",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 12,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass3",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
      },
      {
        id: 4,
        previewImgHref: "/images/shop-preview.jpg",
        goodsImgHref: [
          "/images/product-card.jpg",
          "/images/product-first.png",
          "/images/product-third.png",
          "/images/product-fourth.png",
          "/images/product-fifth.png",
        ],
        title: "Интернет магазин женской одежды и аксессуаров Lass4",
        benefits: ["до-10%", "134 СП", "79 TFF"],
        about:
          "Lass4 — сеть магазинов женской одежды и аксессуаров. Ассортимент включает в себя блузы, юбки, брюки, платья, джемперы, рубашки, жакеты, нарядную одежду, пуховики, куртки, пальто и аксессуары от известных брендов.",
        categories: [
          { text: "Платья и сарафаны", href: "#" },
          { text: "Блузы и рубашки", href: "#" },
          { text: "Юбки", href: "" },
          { text: "+ еще 12", href: "" },
        ],
        shops: [
          {
            id: 13,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass4",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 14,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass4",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 15,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass4",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
            id: 16,
            logoImgHref: "/images/shop-avatar.png",
            name: "Интернет магазин женской одежды и аксессуаров Lass4",
            itemImages: [
              "/images/product-card.jpg",
              "/images/product-first.png",
              "/images/product-third.png",
              "/images/product-fourth.png",
              "/images/product-fifth.png",
              "/images/product-card.jpg",
              "/images/product-first.png",
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
      },
    ],
    count: 116,
  },
}

export async function GET() {
  return NextResponse.json(shopStubs)
}
