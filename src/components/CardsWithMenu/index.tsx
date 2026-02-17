"use client"

import clsx from "clsx"
import type { ReactNode } from "react"

import type { ProductMenuTypes } from "@/app/api/shop/[id]/goods/route"

import { ProductMenu } from "@/components/ProductMenu"

import { useBreakpoint } from "@/hooks/useBreakpoint"

import { BREAKPOINT_NAME } from "@/types/breakpointTypes"

import "./styles.scss"

interface CardsWithMenuProps<T> {
  menuData?: ProductMenuTypes[]
  data?: T[]
  visibleMode?: boolean
  onCardClick?: (item: T, index: number) => void
  renderItems: (items?: T[] | undefined) => ReactNode[] | undefined
}

export const CardsWithMenu = <T,>({
  menuData = [],
  data,
  visibleMode,
  onCardClick,
  renderItems,
}: CardsWithMenuProps<T>) => {
  const { currentBreakpoint } = useBreakpoint()
  const changeMode =
    currentBreakpoint === BREAKPOINT_NAME.MOBILE || currentBreakpoint === BREAKPOINT_NAME.TABLET

  return (
    <div
      className={clsx("cards-with-menu", {
        "cards-with-menu--horizontally": visibleMode && changeMode,
      })}
    >
      <div className="cards-with-menu__menu">
        <ProductMenu items={menuData} />
      </div>

      <div className="cards-with-menu__items">
        {onCardClick && data
          ? renderItems(data)?.map((card, index) => (
              <button
                key={index}
                type="button"
                className="cards-with-menu__card-btn"
                onClick={() => onCardClick(data[index], index)}
              >
                {card}
              </button>
            ))
          : renderItems(data)}
      </div>
    </div>
  )
}
