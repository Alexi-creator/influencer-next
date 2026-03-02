import { NextResponse } from "next/server"

import type { GoodsTypes } from "@/app/api/shop/[id]/goods/route"

const tffStubs: GoodsTypes = {
  data: {
    menu: [],
    goods: {
      data: [
        {
          id: 1,
          className: "",
          title: "Туфли ZOE с острым носом",
          discount: "",
          sale: "",
          hasLike: false,
          sizes: [36, 40],
          applicationStatus: "",
          href: "",
          dataInfo: { brand: "Yves Saint Lauren", title: "Туфли ZOE с острым носом" },
          brand: "Yves Saint Lauren",
          firstImageSrc: "/images/product-card.jpg",
          secondImageSrc: "/images/product-card2.jpg",
          status: "",
        },
      ],
      count: 1,
    },
  },
}

export async function GET() {
  return NextResponse.json(tffStubs)
}
