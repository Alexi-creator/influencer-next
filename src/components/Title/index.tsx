import React from "react"
import clsx from "clsx"

import "./styles.scss"

interface TitleProps {
  title: string
  isSubscription?: boolean
  amount?: number
  sub?: string
  isCartStoreAndSP?: boolean
  storeAmount?: number
  SPAmount?: number
  cartSum?: number | string
  cartsSumClass?: string
  isCartStore?: boolean
  isCartSP?: boolean
}

export const Title = ({
  title,
  isSubscription,
  amount,
  sub,
  isCartStoreAndSP,
  storeAmount,
  SPAmount,
  cartSum,
  cartsSumClass,
  isCartStore,
  isCartSP,
}: TitleProps) => {
  return (
    <div className="title">
      <h1 className="title-txt">{title}</h1>

      {isSubscription && amount !== undefined && sub && (
        <p className="title-under">
          {amount} {sub}
        </p>
      )}

      {!isSubscription && isCartStoreAndSP && (
        <p className="title-under">
          <span>из </span>
          <span className="title-under-bold">{storeAmount} магазина</span>{" "}
          <span>и </span>
          <span className="title-under-bold">{SPAmount} СП</span>{" "}
          <span>на сумму </span>
          <span className={clsx("title-under-bold", cartsSumClass)}>{cartSum}</span>
          <span className="title-under-bold"> ₽</span>
        </p>
      )}

      {!isSubscription && !isCartStoreAndSP && isCartStore && (
        <p className="title-under">
          <span>из </span>
          <span className="title-under-bold">{storeAmount} магазина</span>{" "}
          <span>на сумму </span>
          <span className={clsx("title-under-bold", cartsSumClass)}>{cartSum}</span>
          <span className="title-under-bold"> ₽</span>
        </p>
      )}

      {!isSubscription && !isCartStoreAndSP && !isCartStore && isCartSP && (
        <p className="title-under">
          <span>из </span>
          <span className="title-under-bold">{SPAmount} СП</span>{" "}
          <span>на сумму </span>
          <span className={clsx("title-under-bold", cartsSumClass)}>{cartSum}</span>
          <span className="title-under-bold"> ₽</span>
        </p>
      )}
    </div>
  )
}
