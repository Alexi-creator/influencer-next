"use client"

import clsx from "clsx"
import type { ReactNode } from "react"

import type { ProductMenuTypes } from "@/app/api/shop/goods/route"

import { ProductMenu } from "@/components/ProductMenu"

import { useBreakpoint } from "@/hooks/useBreakpoint"

import { BreakpointName } from "@/types/breakpointTypes"

import "./styles.scss"

interface CardsWithMenuProps<T> {
  menuData?: ProductMenuTypes[] // можешь заменить на конкретный тип
  data?: T[]
  visibleMode?: boolean
  renderItems: (items?: T[] | undefined) => ReactNode[] | undefined
}

export const CardsWithMenu = <T,>({ menuData = [], data, visibleMode, renderItems }: CardsWithMenuProps<T>) => {
  const { currentBreakpoint } = useBreakpoint()
  const changeMode = currentBreakpoint === BreakpointName.MOBILE || currentBreakpoint === BreakpointName.TABLET

  return (
    <div
      className={clsx("cards-with-menu", {
        "cards-with-menu--horizontally": visibleMode && changeMode,
      })}
    >
      <div className="cards-with-menu__menu">
        <ProductMenu items={menuData} />
      </div>

      <div className="cards-with-menu__items">{renderItems(data)}</div>
    </div>
  )
}
