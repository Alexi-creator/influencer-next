"use client"

import { useContext, useEffect } from "react"
import { Divider } from "@/components/ui/Divider"
import { Section } from "@/components/ui/Section"
import { AuthContext } from "@/providers/AuthProvider"
import { authStatuses } from "@/types/authTypes"

export default function NoAuthPage() {
  const context = useContext(AuthContext)
  const { setAuthStatus } = context

  useEffect(() => {
    setAuthStatus(authStatuses.NOTAUTHORIZED)
  }, [setAuthStatus])

  return (
    <Section>
      <h1>Пример хедера НЕавторизованного пользователя</h1>
      <Divider />
    </Section>
  )
}
