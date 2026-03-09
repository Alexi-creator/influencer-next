export const dynamic = "force-dynamic"

import type { Metadata } from "next"

import type { ProductMenuTypes } from "@/app/api/shop/[id]/goods/route"
import type { ShopsTypes } from "@/app/api/shops/route"
import { API_URLS } from "@/constants/api"

import { SubscriptionsView } from "./SubscriptionsView"

import "./styles.scss"

export const metadata: Metadata = {
  title: "User - subscriptions",
  description: "Influencer marketplace user",
}

export default async function SubscriptionsPage() {
  const [shopsRes, tffRes] = await Promise.all([
    fetch(API_URLS.user.subscriptions, { next: { revalidate: 120 } }),
    fetch(`${API_URLS.user.subscriptions}?type=tff`, { next: { revalidate: 120 } }),
  ])

  const shopsData: { data: ShopsTypes[]; count: number } = await shopsRes.json()
  const tffData: { menu: ProductMenuTypes[] } = await tffRes.json()

  return <SubscriptionsView initialData={shopsData} tffMenuData={tffData.menu ?? []} />
}
