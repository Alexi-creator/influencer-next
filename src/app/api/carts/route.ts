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

/**
 * PUT модифицирует сессионные данные и возвращает их.
 * Данные сохраняются между PUT запросами в рамках сессии dev-сервера.
 * GET всегда возвращает начальные данные (для сброса при перезагрузке страницы).
 */
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateCartPayload = await request.json()

    // Инициализируем сессионные данные если их нет
    if (!globalThis.__mockCartsSession) {
      globalThis.__mockCartsSession = getInitialCartsData()
    }

    let cartsData = globalThis.__mockCartsSession

    if (body.type === "goods") {
      const { cartId, goodsId, action, amount } = body.payload

      const cartIndex = cartsData.findIndex((cart) => cart.id === cartId)

      if (cartIndex === -1) {
        return NextResponse.json({ error: "Cart not found" }, { status: 404 })
      }

      // Иммутабельное обновление
      cartsData = cartsData.map((cart) => {
        if (cart.id !== cartId) return cart

        switch (action) {
          case "remove":
            return {
              ...cart,
              goods: cart.goods.filter((item) => item.id !== goodsId),
            }

          case "toggle-select": {
            const updatedGoods = cart.goods.map((item) =>
              item.id === goodsId ? { ...item, isSelected: !item.isSelected } : item,
            )

            const toggledItem = updatedGoods.find((item) => item.id === goodsId)
            const newSelectedState = toggledItem?.isSelected ?? false

            let newIsAllSelected = cart.isAllSelected
            if (newSelectedState) {
              const allNonDisabledSelected = updatedGoods
                .filter((item) => !item.isDisabled)
                .every((item) => item.isSelected)
              if (allNonDisabledSelected) {
                newIsAllSelected = true
              }
            } else if (cart.isAllSelected) {
              newIsAllSelected = false
            }

            return {
              ...cart,
              isAllSelected: newIsAllSelected,
              goods: updatedGoods,
            }
          }

          case "update-amount":
            return {
              ...cart,
              goods: cart.goods.map((item) =>
                item.id === goodsId && amount !== undefined && amount > 0
                  ? { ...item, amount }
                  : item,
              ),
            }

          default:
            return cart
        }
      })

      globalThis.__mockCartsSession = cartsData
      return NextResponse.json({ data: { data: cartsData } })
    }

    if (body.type === "cart-remove") {
      const { cartId } = body.payload
      cartsData = cartsData.filter((cart) => cart.id !== cartId)

      globalThis.__mockCartsSession = cartsData
      return NextResponse.json({ data: { data: cartsData } })
    }

    if (body.type === "cart-select-all") {
      const { cartId, isAllSelected } = body.payload
      const newSelectedState = !isAllSelected

      cartsData = cartsData.map((cart) => {
        if (cart.id !== cartId) return cart

        return {
          ...cart,
          isAllSelected: newSelectedState,
          goods: cart.goods.map((item) =>
            item.isDisabled ? item : { ...item, isSelected: newSelectedState },
          ),
        }
      })

      globalThis.__mockCartsSession = cartsData
      return NextResponse.json({ data: { data: cartsData } })
    }

    return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
