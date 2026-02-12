"use client"

import { useContext, useEffect } from "react"
import { Divider } from "@/components/ui/Divider"
import { Section } from "@/components/ui/Section"
import { AuthContext } from "@/providers/AuthProvider"
import { AUTH_STATUS } from "@/types/authTypes"

export default function NoAuthPage() {
  const context = useContext(AuthContext)
  const { setAuthStatus } = context

  useEffect(() => {
    setAuthStatus(AUTH_STATUS.NOTAUTHORIZED)
  }, [setAuthStatus])

  return (
    <Section>
      <h1>Пример хедера НЕавторизованного пользователя</h1>
      <Divider />
    </Section>
  )
}
