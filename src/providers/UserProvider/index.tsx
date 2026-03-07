"use client"

import { createContext, useContext } from "react"

import type { UserTypes } from "@/app/api/user/[id]/route"

type UserContextType = UserTypes["data"]["preview"] | null

const UserContext = createContext<UserContextType>(null)

/**
 * Хук для доступа к данным пользователя
 */
export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUser must be used within a <UserProvider>")
  }

  return context
}

/**
 * Провайдер для данных пользователя
 * Используется в layout, чтобы пробросить данные вниз по дереву
 */
export const UserProvider = ({
  value,
  children,
}: {
  value: UserTypes["data"]["preview"]
  children: React.ReactNode
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
