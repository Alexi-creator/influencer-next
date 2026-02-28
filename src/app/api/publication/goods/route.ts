/**
 * API Route для выбора товаров при создании публикации (ТОЛЬКО ДЛЯ РАЗРАБОТКИ)
 *
 * ⚠️ Это моковый API для тестирования без бэкенда.
 */

import { type NextRequest, NextResponse } from "next/server"

import type { PublicationGoodsResponseTypes } from "@/types/addPublicationGoods.schema"

type Tab = "sp" | "all" | "bought" | "user"

const mockData: Record<Tab, PublicationGoodsResponseTypes> = {
  sp: {
    data: [],
    count: 0,
  },
  all: {
    data: [
      {
        id: "item-all-1",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
        brand: "UNIQ",
      },
      {
        id: "item-all-2",
        source: "bought",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
      },
      {
        id: "item-all-3",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
        brand: "UNIQ",
      },
      {
        id: "item-all-4",
        source: "external",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
      },
    ],
    count: 4,
  },
  bought: {
    data: [
      {
        id: "item-bought-1",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
        brand: "UNIQ",
      },
      {
        id: "item-bought-2",
        source: "bought",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
      },
      {
        id: "item-bought-3",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
        brand: "UNIQ",
      },
      {
        id: "item-bought-4",
        source: "external",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
      },
      {
        id: "item-bought-5",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
        brand: "UNIQ",
      },
      {
        id: "item-bought-6",
        source: "external",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
      },
    ],
    count: 6,
  },
  user: {
    data: [
      {
        id: "item-user-1",
        source: "bought",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
      },
      {
        id: "item-user-2",
        source: "bought",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
      },
      {
        id: "item-user-3",
        source: "bought",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
      },
      {
        id: "item-user-4",
        source: "bought",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
      },
      {
        id: "item-user-5",
        source: "bought",
        img: "/images/item-publication.jpg",
        title: "Костюм классический UNIQ",
        price: "10 000",
        currency: "₽",
      },
    ],
    count: 5,
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tab = (searchParams.get("tab") ?? "all") as Tab
  const search = searchParams.get("search") ?? ""

  const tabData = mockData[tab] ?? mockData.all

  let filtered = tabData.data

  if (search) {
    const regex = new RegExp(search, "i")
    filtered = filtered.filter(
      (item) => regex.test(item.title) || (item.brand !== undefined && regex.test(item.brand)),
    )
  }

  return NextResponse.json({ data: filtered, count: filtered.length })
}
