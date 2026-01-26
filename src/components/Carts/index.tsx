"use client"

import { useState } from "react"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"

import { CartTypes, DataTypes } from "@/app/api/carts/route"

import { request } from "@/utils/request"

import { API_URLS } from "@/constants/api"
import { HttpMethods } from "@/constants/httpMethods"
import { httpStatus } from "@/constants/httpStatus"

import { Cart } from "@/components/Cart"
import { Title } from "@/components/Title"

import "./styles.scss"

export const Carts = ({
  initialData,
  revalidateTime,
}: {
  initialData: CartTypes[],
  revalidateTime: number,
}) => {
  // Изначально при загрузке берем инит дату с серверного запроса
  // далее вручную меняем данные при определенных тригерах
  // автоматический перезапрос только если вернулись с других вкладок и при этом прошло 120 сек.
  const { data, isFetching } = useQuery<CartTypes[]>({
    queryKey: ["carts"],
    queryFn: async (): Promise<CartTypes[]> => {
      const res = await request<DataTypes>(API_URLS.carts)
      return res.data.data
    },
    initialData,
    staleTime: revalidateTime,
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

  // console.log("data", data);

  // При изменении тригеров в карточке конкретного товара, должен уйти запрос на бэк, и если ответ ок то мутация серверных данных квери:
  // - удалить
  // - выбрать / снять
  // - уменьшить или увеличить кол-во

  const updateServerData = async (body: any): Promise<void> => {
    // const res = await request(API_URLS.carts, {
    //   method: HttpMethods.PATCH,
    //   body: body,
    // })

    // if ( === httpStatus.OK) {
    if (200 === httpStatus.OK) {
      
    }
  }

  const queryClient = useQueryClient()

  const updateCartMutation = useMutation({
    mutationFn: async (payload: any) => {
      console.log("payload", payload);
      
      return request(API_URLS.carts, {
        method: HttpMethods.PATCH,
        body: JSON.stringify(payload),
      })
    },

    onSuccess: (response) => {
      console.log("response", response);
      
      // ВАРИАНТ 1 — сервер вернул обновлённые корзины
      // queryClient.setQueryData<CartTypes[]>(["carts"], response.data.data)

      // ВАРИАНТ 2 — если сервер ничего не вернул
      // queryClient.invalidateQueries({ queryKey: ["carts"] })
    },
  })

  return (
    <> 
      <Title
        title="Корзины"
        subscription={`из ${titleState.storeCount} магазина и ${titleState.spCount} СП на сумму ${titleState.totalAmount} ₽`}
      />

      <button onClick={() => updateCartMutation.mutate({ test: "test" })}>button</button>

      <div className="cart-list">
        {data.map((cart, index) => (
          <Cart key={cart.id} index={index} {...cart} />
        ))}
      </div>
    </>
  )
}
