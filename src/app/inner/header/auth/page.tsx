"use client"

import { useContext, useEffect } from "react"
import { Divider } from "@/components/ui/Divider"
import { AuthContext } from "@/providers/AuthProvider"
import { authStatuses } from "@/types/authTypes"

export default function AuthPage() {
  const context = useContext(AuthContext)
  const { setAuthStatus } = context

  useEffect(() => {
    setAuthStatus(authStatuses.AUTHORIZED)
  }, [setAuthStatus])

  return (
    <section className="section">
      <div className="section__inner">
        <h1>Пример хедера авторизованного пользователя</h1>
        <Divider />
      </div>
    </section>
  )
}
