"use client"

import { EntityToolbar } from "@/components/EntityToolbar"
import { useUser } from "@/providers/UserProvider"

export const UserBrandToolbar = ({ className }: { className?: string }) => {
  const { name, image } = useUser()

  return <EntityToolbar className={className} name={name} imgHref={image} />
}
