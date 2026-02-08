"use client"

import { useQuery } from "@tanstack/react-query"
import { Cart } from "@/components/Cart"
import { Loading } from "@/components/layout/Loading"
import { Title } from "@/components/Title"
import { API_URLS } from "@/constants/api"
import { useUpdateCart } from "@/hooks/carts/useUpdateCart"
import { cartsQueryKey, clientRevalidateTime } from "@/settings/carts"
import type { CartsDataTypes, CartTypes } from "@/types/carts"
import { request } from "@/utils/request"

import "./styles.scss"

export const Carts = () => {
  const { data, isFetching, isLoading } = useQuery<CartTypes[], Error>({
    queryKey: [cartsQueryKey],
    queryFn: async (): Promise<CartTypes[]> => {
      const res = await request<CartsDataTypes>(API_URLS.carts)

      return res.data.data
    },
    refetchInterval: clientRevalidateTime, // Автообновление каждые clientRevalidateTime милисекунд
    refetchIntervalInBackground: false, // Не обновлять если вкладка неактивна
    refetchOnWindowFocus: false, // Не запрашивать при фокусе
  })

  const {
    removeGoods: _removeGoods,
    toggleSelectGoods: _toggleSelectGoods,
    updateGoodsAmount: _updateGoodsAmount,
    handleRemoveCart,
    handleCheckedAllGoods,
    handleRemoveGoods, // TODO если удалить все товары, корзину удалять или что то делать?
    handleToggleCheckedGoods,
    handleChangeCountGoods,
    isPending,
  } = useUpdateCart()

  if (isLoading || !data) return <Loading isFixed />

  let storeCount = 0
  let spCount = 0
  let totalAmount = 0

  data.forEach((cart) => {
    if (cart.isSp) spCount += 1
    else storeCount += 1

    // Считаем сумму выбранных доступных товаров
    cart.goods.forEach((item) => {
      if (item.isSelected && !item.isDisabled) {
        totalAmount += Number(item.newSum) * item.amount
      }
    })
  })

  return (
    <>
      {(isPending || isFetching) && <Loading isFixed />}

      <Title
        title="Корзины"
        subscription={`из ${storeCount} магазина и ${spCount} СП на сумму ${totalAmount} ₽`}
      />

      <div className="cart-list">
        {data.map((cart, index) => (
          <Cart
            key={cart.id}
            index={index}
            onRemoveCart={handleRemoveCart}
            onCheckedAllGoods={handleCheckedAllGoods}
            onRemoveGoods={handleRemoveGoods}
            onToggleCheckedGoods={handleToggleCheckedGoods}
            onChangeCountGoods={handleChangeCountGoods}
            {...cart}
          />
        ))}
      </div>
    </>
  )
}
