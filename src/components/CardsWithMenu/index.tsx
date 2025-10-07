"use client"

import { ReactNode } from "react"

import { ProductMenuTypes } from "@/app/api/shop/goods/route"

import { ProductMenu } from "../ProductMenu"

import "./styles.scss"

interface CardsWithMenuProps<T> {
  menuData?: ProductMenuTypes[] // можешь заменить на конкретный тип
  data?: T[]
  renderItems: (items?: T[] | undefined) => ReactNode[] | undefined
}

export const CardsWithMenu = <T,>({ menuData = [], data, renderItems }: CardsWithMenuProps<T>) => {
  return (
    <div className="cards-with-menu">
      <div className="cards-with-menu__menu">
        <ProductMenu items={menuData} />
      </div>

      <div className="cards-with-menu__items">
        {renderItems(data)}
      </div>
    </div>
  )
}
