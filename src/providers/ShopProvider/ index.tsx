"use client"

import { createContext, useContext } from "react"
import type { ShopTypes } from "@/app/api/shop/route"

type ShopContextType = ShopTypes["data"]["preview"] | null

const ShopContext = createContext<ShopContextType>(null)

/**
 * Хук для доступа к данным магазина
 */
export const useShop = () => {
  const context = useContext(ShopContext)

  if (!context) {
    throw new Error("useShop must be used within a <ShopProvider>")
  }

  return context
}

/**
 * Провайдер для данных магазина
 * Используется в layout, чтобы пробросить данные вниз по дереву
 */
export const ShopProvider = ({
  value,
  children,
}: {
  value: ShopTypes["data"]["preview"]
  children: React.ReactNode
}) => {
  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}
