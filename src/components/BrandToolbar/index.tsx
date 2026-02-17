"use client"

import { EntityToolbar } from "@/components/EntityToolbar"
import { useShop } from "@/providers/ShopProvider"

export const BrandToolbar = ({ className }: { className?: string }) => {
  const { title, image } = useShop()

  return <EntityToolbar className={className} name={title} imgHref={image} />
}
