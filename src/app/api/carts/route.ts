/**
 * API Route для корзин (ТОЛЬКО ДЛЯ РАЗРАБОТКИ)
 *
 * ⚠️ Это моковый API для тестирования без бэкенда.
 *
 * Для переключения на реальный API:
 * - Убрать/закомментировать этот файл
 */

import { type NextRequest, NextResponse } from "next/server"

import type { CartTypes } from "@/types/carts.schema"
import { SP_STATUS } from "@/types/spStatusTypes"

// Сессионные данные для PUT запросов (сохраняются между мутациями)
// Используем globalThis для сохранения между HMR в dev режиме
declare global {
  var __mockCartsSession: CartTypes[] | undefined
}

// Начальные данные (стаб)
const getInitialCartsData = (): CartTypes[] => [
  {
    id: 1,
    isSp: true,
    title: "Покупаем пока есть скидка, девочки",
    soldSum: "79281",
    allSum: "241093",
    spStatus: SP_STATUS.ACTIVE,
    progress: "35%",
    date: "27.01.2020",
    time: "12:00",
    storeName: "Интернет магазин одежды и аксессуаров Lass",
    storeLogoHref: "/images/shop-avatar.png",
    canCreateSp: false,
    canUpdateStore: false,
    isAllSelected: false,

    goods: [
      {
        id: 1,
        imgHref: "/images/sp-slide2.jpg",
        brand: "Balenciaga",
        description: "Тянущееся платье с длинными рукавами",
        isDisabled: false,
        isSp: true,
        isSelected: true,
        amount: 2,
        size: "34 EU / XS",
        discountPercent: 23,
        oldSum: "102500",
        newSum: "93779",
        pricingByQuantity: {
          "1": "459 000 ₽ / -10%",
          "2-3": "408 000 ₽ / -20%",
          "4": "357 000 ₽ / -40%",
        },
      },
      {
        id: 2,
        imgHref: "/images/sp-slide2.jpg",
        brand: "Balenciaga2",
        description: "Тянущееся платье с длинными рукавами2",
        isDisabled: false,
        isSp: true,
        isSelected: false,
        amount: 2,
        size: "34 EU / XS",
        discountPercent: 23,
        oldSum: "102500",
        newSum: "93779",
        pricingByQuantity: {
          "1": "459 000 ₽ / -10%",
          "2-3": "408 000 ₽ / -20%",
          "4": "357 000 ₽ / -40%",
        },
      },
      {
        id: 3,
        imgHref: "/images/sp-slide2.jpg",
        brand: "Balenciaga3",
        description: "Тянущееся платье с длинными рукавами3",
        isDisabled: false,
        isSp: true,
        isSelected: false,
        amount: 2,
        size: "34 EU / XS",
        discountPercent: 23,
        oldSum: "102500",
        newSum: "93779",
        pricingByQuantity: {
          "1": "459 000 ₽ / -10%",
          "2-3": "408 000 ₽ / -20%",
          "4": "357 000 ₽ / -40%",
        },
      },
      {
        id: 4,
        imgHref: "/images/sp-slide2.jpg",
        brand: "Balenciaga4",
        description: "Тянущееся платье с длинными рукавами4",
        isDisabled: true,
        isSp: true,
        isSelected: false,
        amount: 2,
        size: "34 EU / XS",
        discountPercent: 23,
        oldSum: "102500",
        newSum: "93779",
        pricingByQuantity: {
          "1": "459 000 ₽ / -10%",
          "2-3": "408 000 ₽ / -20%",
          "4": "357 000 ₽ / -40%",
        },
      },
    ],
  },
  {
    id: 2,
    isSp: true,
    title: "Покупаем пока есть скидка, девочки",
    soldSum: "79281",
    allSum: "241093",
    spStatus: SP_STATUS.NOT_HAPPENED,
    progress: "35%",
    date: "27.01.2020",
    time: "14:00",
    storeName: "Интернет магазин одежды и аксессуаров Lass",
    storeLogoHref: "/images/shop-avatar.png",
    canCreateSp: false,
    canUpdateStore: false,
    isAllSelected: false,

    goods: [
      {
        id: 1,
        imgHref: "/images/sp-slide2.jpg",
        brand: "Balenciaga",
        description: "Тянущееся платье с длинными рукавами",
        isDisabled: false,
        isSp: true,
        isSelected: true,
        amount: 2,
        size: "34 EU / XS",
        discountPercent: 23,
        oldSum: "102500",
        newSum: "93779",
        pricingByQuantity: {
          "1": "459 000 ₽ / -10%",
          "2-3": "408 000 ₽ / -20%",
          "4": "357 000 ₽ / -40%",
        },
      },
    ],
  },
]

export async function GET() {
  // Сбрасываем сессионные данные при загрузке страницы (GET)
  // чтобы после рефреша начинать с чистого состояния
  globalThis.__mockCartsSession = undefined

  return NextResponse.json(
    {
      data: {
        data: getInitialCartsData(),
      },
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  )
}

export async function PUT(request: NextRequest) {
  try {
    const body: CartTypes[] = await request.json()

    // Мок просто сохраняет подготовленные клиентом данные
    globalThis.__mockCartsSession = body

    return NextResponse.json({ data: { data: globalThis.__mockCartsSession } })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
