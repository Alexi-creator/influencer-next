
import { NextResponse } from "next/server"

export interface ProductMenuTypes {
  title: string;
  value: string;
  count?: number;
  children?: ProductMenuTypes[];
};

export interface ProductCardTypes {
  id: string | number
  className: string
  title: string
  discount: string
  sale: string
  hasLike: boolean
  sizes: number[]
  applicationStatus: string
  href: string
  dataInfo: { brand: string, title: string }
  brand: string
  firstImageSrc: string
  secondImageSrc: string
  date?: string
  status?: string
}

export interface GoodsTypes {
  data: {
    menu: ProductMenuTypes[],
    goods: {
      data: ProductCardTypes[]
      count: number
    },
  }
}

const goodsStubs: GoodsTypes = {
  data: {
    menu: [
      {
        title: "Одежда level 1",
        value: "cloth-level-1",
        count: 1200,
        children: [
          {
            title: "Одежда level 2-1",
            value: "cloth-level-2-1",
            children: [
              { title: "Одежда level 3-1", value: "cloth-level-3-1" },
              { title: "Одежда level 3-2", value: "cloth-level-3-2" },
              { title: "Одежда level 3-3", value: "cloth-level-3-3" },
            ],
          },
          {
            title: "Одежда level 2-2",
            value: "cloth-level-2-2",
            children: [
              { title: "Одежда level 3", value: "cloth-level-3-2-1" },
              { title: "Одежда level 3", value: "cloth-level-3-2-2" },
              { title: "Одежда level 3", value: "cloth-level-3-2-3" },
            ],
          },
        ],
      },
      {
        title: "Обувь level 1",
        value: "shoes-level-1",
        children: [
          {
            title: "Обувь level 2-1",
            value: "shoes-level-2-1",
            children: [
              { title: "Обувь level 3", value: "shoes-level-3-1" },
              { title: "Обувь level 3", value: "shoes-level-3-2" },
              { title: "Обувь level 3", value: "shoes-level-3-3" },
            ],
          },
          {
            title: "Обувь level 2-2",
            value: "shoes-level-2-2",
            children: [
              { title: "Обувь level 3", value: "shoes-level-3-2-1" },
              { title: "Обувь level 3", value: "shoes-level-3-2-2" },
              { title: "Обувь level 3", value: "shoes-level-3-2-3" },
            ],
          },
        ],
      },
      {
        title: "Бытовая техника level 1",
        value: "Appliances-level-1",
        children: [
          {
            title: "Бытовая техника level 2-1",
            value: "Appliances-level-2-1",
            children: [
              { title: "Бытовая техника level 3", value: "Appliances-level-3-1" },
              { title: "Бытовая техника level 3", value: "Appliances-level-3-2" },
              { title: "Бытовая техника level 3", value: "Appliances-level-3-3" },
            ],
          },
          {
            title: "Бытовая техника level 2-2",
            value: "Appliances-level-2-2",
            children: [
              { title: "Бытовая техника level 3", value: "Appliances-level-3-2-1" },
              { title: "Бытовая техника level 3", value: "Appliances-level-3-2-2" },
              { title: "Бытовая техника level 3", value: "Appliances-level-3-2-3" },
            ],
          },
        ],
      },
    ],
    goods: {
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
          dataInfo: { "brand": "Yves Saint Lauren", "title": "Комбинезон из шелковой вискозы с" },
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
          dataInfo: { "brand": "Yves Saint Lauren 2", "title": "Плетеная сумка-сэтчел" },
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
          dataInfo: { "brand": "Yves Saint Lauren 3", "title": "Туфли ZOE с острым носом и эластичныим" },
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
          dataInfo: { "brand": "Yves Saint Lauren 4", "title": "Пуховик из кожи с узором monogram mi" },
          brand: "Yves Saint Lauren 4",
          firstImageSrc: "/images/product-card.jpg",
          secondImageSrc: "/images/product-card2.jpg",
          status: "",
        },
        {
          id: 5,
          className: "",
          title: "Пуховик из кожи с узором monogram mi 2",
          discount: "",
          sale: "",
          hasLike: false,
          sizes: [38, 40],
          applicationStatus: "",
          href: "",
          dataInfo: { "brand": "Yves Saint Lauren 5", "title": "Пуховик из кожи с узором monogram mi 2" },
          brand: "Yves Saint Lauren 5",
          firstImageSrc: "/images/product-card.jpg",
          secondImageSrc: "/images/product-card2.jpg",
          status: "",
        },
        {
          id: 6,
          className: "",
          title: "Пуховик из кожи с узором monogram mi 3",
          discount: "",
          sale: "",
          hasLike: true,
          sizes: [38, 40],
          applicationStatus: "",
          href: "",
          dataInfo: { "brand": "Yves Saint Lauren 6", "title": "Пуховик из кожи с узором monogram mi 3" },
          brand: "Yves Saint Lauren 6",
          firstImageSrc: "/images/product-card.jpg",
          secondImageSrc: "/images/product-card2.jpg",
          status: "",
        }
      ],
      count: 24
    },
  },
}

export async function GET() {
  return NextResponse.json(goodsStubs)
}
