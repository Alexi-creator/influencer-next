"use client"

import { Cart } from "@/components/Cart"
import { Loading } from "@/components/layout/Loading"
import { Title } from "@/components/Title"
import { useCartsQuery } from "@/hooks/carts/useCartsQuery"
import { useUpdateCart } from "@/hooks/carts/useUpdateCart"
import type { CartTypes } from "@/types/carts"

import "./styles.scss"

export const Carts = ({ initialData }: { initialData: CartTypes[] }) => {
  const { data, isFetching: _isFetching } = useCartsQuery(initialData)
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
      {isPending && <Loading isFixed />}

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
