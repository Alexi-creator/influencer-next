import type { ShopTypes } from "@/app/api/shop/route"

import { ShopPreview } from "@/components/ShopPreview"
import { Divider } from "@/components/ui/Divider"
import { Section } from "@/components/ui/Section"

import { ShopProvider } from "@/providers/ShopProvider/ index"

import { API_URL } from "@/constants/api"
import { buildQueryString } from "@/utils/buildQueryString"

export default async function ShopLayout({
  children,
  // params,
  searchParams,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // const { id } = await params
  const queryParams = await searchParams

  const queryString = buildQueryString(queryParams)

  // TODO добавить id в запрос для конкретного магазина
  const data = await fetch(`${API_URL}/api/shop${queryString}`)
  const shopData: ShopTypes = await data.json()

  return (
    <ShopProvider value={shopData.data.preview}>
      <Section className="section--shop-preview">
        <ShopPreview data={shopData.data.preview} />
        <Divider />
      </Section>

      <Section className="section--shop-window">{children}</Section>
    </ShopProvider>
  )
}
