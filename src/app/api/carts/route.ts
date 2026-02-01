/**
 * API Route для корзин (ТОЛЬКО ДЛЯ РАЗРАБОТКИ)
 *
 * ⚠️ Это моковый API для тестирования без бэкенда.
 *
 * Для переключения на реальный API:
 * - Убрать/закомментировать этот файл
 */

import { type NextRequest, NextResponse } from "next/server"

import type { CartTypes, UpdateCartPayload } from "@/types/carts"
import { SP_STATUS } from "@/types/spStatusTypes"

// Моковое хранилище в памяти (в реальном приложении это будет БД)
const cartsData: CartTypes[] = [
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
    time: "12:00",
    storeName: "Интернет магазин одежды и аксессуаров Lass",
    storeLogoHref: "/images/shop-avatar.png",
    canCreateSp: false,
    canUpdateStore: false,

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
]

export async function GET() {
  return NextResponse.json({
    data: {
      data: cartsData,
    },
  })
}

export async function PUT(request: NextRequest) {
  try {
    const body: UpdateCartPayload = await request.json()

    if (body.type === "goods") {
      const { cartId, goodsId, action, amount } = body.payload

      const cartIndex = cartsData.findIndex((cart) => cart.id === cartId)

      if (cartIndex === -1) {
        return NextResponse.json({ error: "Cart not found" }, { status: 404 })
      }

      const cart = cartsData[cartIndex]

      switch (action) {
        case "remove":
          cart.goods = cart.goods.filter((item) => item.id !== goodsId)
          break

        case "toggle-select": {
          const goodsIndex = cart.goods.findIndex((item) => item.id === goodsId)

          if (goodsIndex !== -1) {
            cart.goods[goodsIndex].isSelected = !cart.goods[goodsIndex].isSelected
          }

          break
        }

        case "update-amount": {
          const goodsToUpdate = cart.goods.find((item) => item.id === goodsId)

          if (goodsToUpdate && amount !== undefined && amount > 0) {
            goodsToUpdate.amount = amount
          }

          break
        }

        default:
          return NextResponse.json({ error: "Invalid action" }, { status: 400 })
      }

      return NextResponse.json({
        data: {
          data: cartsData,
        },
      })
    }

    return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
