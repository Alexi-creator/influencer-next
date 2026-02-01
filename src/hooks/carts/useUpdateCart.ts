import { useMutation, useQueryClient } from "@tanstack/react-query"
import { revalidateCarts } from "@/app/actions/carts/revalidate"
import { API_URLS } from "@/constants/api"
import { HttpMethods } from "@/constants/httpMethods"

import { cartsQueryKey } from "@/settings/carts"
import type { CartTypes, DataTypes, UpdateCartPayload } from "@/types/carts"
import { request } from "@/utils/request"

export const useUpdateCart = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (payload: UpdateCartPayload) => {
      const res = await request<DataTypes>(API_URLS.carts, {
        method: HttpMethods.PUT,
        body: JSON.stringify(payload),
      })

      return res.data.data
    },

    // Оптимистичное обновление: обновляем UI до получения ответа от сервера
    onMutate: async (payload: UpdateCartPayload) => {
      // Отменяем текущие запросы
      await queryClient.cancelQueries({ queryKey: [cartsQueryKey] })

      // Сохраняем предыдущее состояние для отката в случае ошибки
      const previousCarts = queryClient.getQueryData<CartTypes[]>([cartsQueryKey])

      // Оптимистично обновляем данные
      if (previousCarts && payload.type === "goods") {
        const { cartId, goodsId, action, amount } = payload.payload

        const updatedCarts = previousCarts.map((cart) => {
          if (cart.id !== cartId) return cart

          switch (action) {
            case "remove":
              return {
                ...cart,
                goods: cart.goods.filter((item) => item.id !== goodsId),
              }

            case "toggle-select":
              return {
                ...cart,
                goods: cart.goods.map((item) => (item.id === goodsId ? { ...item, isSelected: !item.isSelected } : item)),
              }

            case "update-amount":
              return {
                ...cart,
                goods: cart.goods.map((item) => (item.id === goodsId && amount !== undefined ? { ...item, amount } : item)),
              }

            default:
              return cart
          }
        })

        queryClient.setQueryData<CartTypes[]>([cartsQueryKey], updatedCarts)
      }

      return { previousCarts }
    },

    // При успехе - обновляем данные из ответа сервера и сбрасываем серверный кэш
    onSuccess: (updatedCarts) => {
      queryClient.setQueryData<CartTypes[]>([cartsQueryKey], updatedCarts)
      // Сбрасываем серверный кэш Next.js
      revalidateCarts()
    },

    // При ошибке - откатываем оптимистичное обновление
    onError: (_error, _payload, context) => {
      if (context?.previousCarts) {
        queryClient.setQueryData<CartTypes[]>([cartsQueryKey], context.previousCarts)
      }
    },
  })

  // Функции-триггеры
  const removeGoods = (cartId: number, goodsId: number) => {
    const payload: UpdateCartPayload = {
      type: "goods",
      payload: {
        cartId,
        goodsId,
        action: "remove",
      },
    }
    mutation.mutate(payload)
  }

  const toggleSelectGoods = (cartId: number, goodsId: number) => {
    const payload: UpdateCartPayload = {
      type: "goods",
      payload: {
        cartId,
        goodsId,
        action: "toggle-select",
      },
    }
    mutation.mutate(payload)
  }

  const updateGoodsAmount = (cartId: number, goodsId: number, amount: number) => {
    const payload: UpdateCartPayload = {
      type: "goods",
      payload: {
        cartId,
        goodsId,
        action: "update-amount",
        amount,
      },
    }
    mutation.mutate(payload)
  }

  return {
    removeGoods,
    toggleSelectGoods,
    updateGoodsAmount,
    isPending: mutation.isPending,
  }
}
