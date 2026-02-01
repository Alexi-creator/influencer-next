import type { ShopTypes } from "@/app/api/shop/route"

import { ShopPreview } from "@/components/ShopPreview"
import { Divider } from "@/components/ui/Divider"

import { ShopProvider } from "@/providers/ShopProvider/ index"

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
  const data = await fetch(`http://localhost:3000/api/shop${queryString}`)
  const shopData: ShopTypes = await data.json()

  return (
    <ShopProvider value={shopData.data.preview}>
      <section className="section section--shop-preview">
        <div className="section__inner">
          <ShopPreview data={shopData.data.preview} />
          <Divider />
        </div>
      </section>

      <section className="section section--shop-window">
        <div className="section__inner">{children}</div>
      </section>
    </ShopProvider>
  )
}
