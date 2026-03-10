import type { Metadata } from "next"

import type { ProductCardTypes, ProductMenuTypes } from "@/app/api/shop/[id]/goods/route"
import { API_URLS } from "@/constants/api"

import { LikesView } from "./LikesView"

import "./styles.scss"

export const metadata: Metadata = {
  title: "User - likes",
  description: "Influencer marketplace user",
}

export default async function LikesPage() {
  const [goodsRes, goodsMenuRes] = await Promise.all([
    fetch(API_URLS.user.likes, { next: { revalidate: 120 } }),
    fetch(`${API_URLS.user.likes}?type=goods`, { next: { revalidate: 120 } }),
  ])

  const goodsData: { data: ProductCardTypes[]; count: number } = await goodsRes.json()
  const goodsMenuData: { menu: ProductMenuTypes[] } = await goodsMenuRes.json()

  return <LikesView initialData={goodsData} goodsMenuData={goodsMenuData.menu ?? []} />
}
