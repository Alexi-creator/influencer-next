export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import { API_URLS } from "@/constants/api"
import type { UserCardTypes } from "@/types/users.schema"
import { buildQueryString } from "@/utils/buildQueryString"
import { SubscribersView } from "./SubscribersView"

import "./styles.scss"

export const metadata: Metadata = {
  title: "User - subscribers",
  description: "Influencer marketplace user",
}

export default async function SubscribersPage({
  // params,
  searchParams,
}: {
  // params: { id: string }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  const data = await fetch(`${API_URLS.user.subscribers}${queryString}`, {
    next: { revalidate: 120 },
  })
  const subscribersData: { data: UserCardTypes[]; count: number } = await data.json()

  return <SubscribersView initialData={subscribersData} />
}
