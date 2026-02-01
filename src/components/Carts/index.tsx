"use client"

import { useState } from "react"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"

import type {
  CartTypes,
  DataTypes,
  UpdateCartPayload,
} from "@/types/carts"

import { revalidateCarts } from "@/app/actions/carts/revalidate"

import { request } from "@/utils/request"

import { cartsQueryKey } from "@/settings/carts"

import { API_URLS } from "@/constants/api"
import { HttpMethods } from "@/constants/httpMethods"
import { httpStatus } from "@/constants/httpStatus"

import { Cart } from "@/components/Cart"
import { Title } from "@/components/Title"

import "./styles.scss"

export const Carts = ({
  initialData,
}: {
  initialData: CartTypes[],
}) => {
  // TODO:
  // - предумсмотреть отмену мутаций при быстром нажатии кнопок
  const queryClient = useQueryClient()

  // При первой загрузке страницы данные приходят с сервера,
  // в случае изменения (удаление корзины, выбор/удаление товара, кол-ва) оптимистично обновляем стейт
  // и паралельно делаем запрос обновление на бэк, в случае успеха оставляем обновления и ревалидируем серверный кэш (в случае перезагрузки страницы данные будут актуальные даже не смотря на время кэша сервера)
  // в случае неуспешного запроса оставляем предыдущее состояние
  const { data, isFetching } = useQuery<CartTypes[]>({
    queryKey: [cartsQueryKey],
    queryFn: async (): Promise<CartTypes[]> => {
      const res = await request<DataTypes>(API_URLS.carts)
      return res.data.data
    },
    initialData,
    staleTime: Infinity, // Данные никогда не устаревают, обновляются только через мутации
    refetchOnMount: false, // Не запрашивать при монтировании
    refetchOnWindowFocus: false, // Не запрашивать при фокусе окна
  })

  const [titleState, setTitleState] = useState(() => {
    let storeCount:  number = 0
    let spCount:  number = 0
    let totalAmount:  number = 0

    data.forEach(cart => {
      if (cart.isSp) spCount += 1
      else storeCount += 1
    })

    return {
      storeCount,
      spCount,
      totalAmount,
    }
  })

  // Мутация для обновления корзины
  const updateCartMutation = useMutation({
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
              goods: cart.goods.map((item) =>
                item.id === goodsId
                  ? { ...item, isSelected: !item.isSelected }
                  : item
              ),
            }

          case "update-amount":
            return {
              ...cart,
              goods: cart.goods.map((item) =>
                item.id === goodsId && amount !== undefined
                  ? { ...item, amount }
                  : item
              ),
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

  // Функции-триггеры для вызова из дочерних компонентов
  const removeGoods = (cartId: number, goodsId: number) => {
    const payload: UpdateCartPayload = {
      type: "goods",
      payload: {
        cartId,
        goodsId,
        action: "remove",
      },
    }
    updateCartMutation.mutate(payload)
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
    updateCartMutation.mutate(payload)
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
    updateCartMutation.mutate(payload)
  }

  return (
    <>
      <Title
        title="Корзины"
        subscription={`из ${titleState.storeCount} магазина и ${titleState.spCount} СП на сумму ${titleState.totalAmount} ₽`}
      />

      {/* Пример использования функций-триггеров */}
      {/* <button onClick={() => removeGoods(1, 1)}>Удалить товар</button> */}
      {/* <button onClick={() => toggleSelectGoods(1, 1)}>Выбрать товар</button> */}
      {/* <button onClick={() => updateGoodsAmount(1, 1, 5)}>Изменить количество</button> */}

      <div className="cart-list">
        {data.map((cart, index) => (
          <Cart key={cart.id} index={index} {...cart} />
        ))}
      </div>
    </>
  )
}
