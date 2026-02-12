"use client"

import { useContext, useEffect } from "react"
import { Divider } from "@/components/ui/Divider"
import { Section } from "@/components/ui/Section"
import { AuthContext } from "@/providers/AuthProvider"
import { AUTH_STATUS } from "@/types/authTypes"

export default function AuthPage() {
  const context = useContext(AuthContext)
  const { setAuthStatus } = context

  useEffect(() => {
    setAuthStatus(AUTH_STATUS.AUTHORIZED)
  }, [setAuthStatus])

  return (
    <Section>
      <h1>Пример хедера авторизованного пользователя</h1>
      <Divider />
    </Section>
  )
}
