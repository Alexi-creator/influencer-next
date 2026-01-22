"use client"

// import { Cart } from "@/components/Cart"

import "./styles.scss"
import { Title } from "../Title"

export interface CartsProps extends React.HTMLAttributes<HTMLDivElement> {
 data: any[]
}

export const Carts = ({
  data,
  // count,
}: CartsProps) => {
  // тут возможно нужно добавить загрузку данных (паганицию) если корзин будет много

  return (
    <> 
      <Title
        title="Корзины"
        isSubscription
        // amount={cartsData.data.count}
      />

      {/* <div className="cart-list">
        {data.map((cart) => (
          <Cart {...cart} />
        ))}
      </div> */}
    </>
  )
}
