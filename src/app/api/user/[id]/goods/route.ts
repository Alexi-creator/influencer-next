import { NextResponse } from "next/server"

import type { GoodsTypes } from "@/app/api/shop/[id]/goods/route"

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
          title: "Комбинезон из шелковой вискозы",
          discount: "--discount",
          sale: "от 91 250 ₽",
          hasLike: true,
          sizes: [36, 38],
          applicationStatus: "",
          href: "",
          dataInfo: { brand: "Yves Saint Lauren", title: "Комбинезон из шелковой вискозы" },
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
          title: "Комбинезон из шелковой вискозы",
          discount: "--discount",
          sale: "от 91 250 ₽",
          hasLike: true,
          sizes: [36, 38],
          applicationStatus: "",
          href: "",
          dataInfo: { brand: "Yves Saint Lauren", title: "Комбинезон из шелковой вискозы" },
          brand: "Yves Saint Lauren",
          firstImageSrc: "/images/product-card.jpg",
          secondImageSrc: "/images/product-card2.jpg",
          status: "",
        },
        {
          id: 4,
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
      ],
      count: 4,
    },
  },
}

export async function GET() {
  return NextResponse.json(goodsStubs)
}
