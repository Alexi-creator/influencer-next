"use client"

import { useState } from "react"
import { Cart } from "@/components/Cart"
import { Title } from "@/components/Title"
import { useCartsQuery } from "@/hooks/carts/useCartsQuery"
import { useUpdateCart } from "@/hooks/carts/useUpdateCart"
import type { CartTypes } from "@/types/carts"

import "./styles.scss"

export const Carts = ({ initialData }: { initialData: CartTypes[] }) => {
  const { data, isFetching: _isFetching } = useCartsQuery(initialData)
  const { removeGoods: _removeGoods, toggleSelectGoods: _toggleSelectGoods, updateGoodsAmount: _updateGoodsAmount, isPending: _isPending } = useUpdateCart()

  const [titleState, _setTitleState] = useState(() => {
    let storeCount: number = 0
    let spCount: number = 0
    const totalAmount: number = 0

    data.forEach((cart) => {
      if (cart.isSp) spCount += 1
      else storeCount += 1
    })

    return {
      storeCount,
      spCount,
      totalAmount,
    }
  })

  const handleRemoveCart = (id: number) => {
    console.log("id cart", id)
  }
  // const handleCheckedAllGoods = () => {}
  // const handleRemoveGoods = () => {}
  // const handleToggleCheckedGoods = () => {}
  // const handleChangeCountGoods = () => {}

  return (
    <>
      <Title title="Корзины" subscription={`из ${titleState.storeCount} магазина и ${titleState.spCount} СП на сумму ${titleState.totalAmount} ₽`} />

      {/* Пример использования функций-триггеров */}
      {/* <button onClick={() => removeGoods(1, 1)}>Удалить товар</button> */}
      {/* <button onClick={() => toggleSelectGoods(1, 1)}>Выбрать товар</button> */}
      {/* <button onClick={() => updateGoodsAmount(1, 1, 5)}>Изменить количество</button> */}

      <div className="cart-list">
        {data.map((cart, index) => (
          <Cart key={cart.id} index={index} onRemoveCart={handleRemoveCart} {...cart} />
        ))}
      </div>
    </>
  )
}
