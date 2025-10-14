import type { Metadata } from "next"

import { buildQueryString } from "@/utils/buildQueryString"

import { GoodsTypes, ProductCardTypes } from "@/app/api/shop/goods/route"

import { BrandToolbar } from "@/components/BrandToolbar"
import { CardsWithMenu } from "@/components/CardsWithMenu"
import { DataView } from "@/components/DataView"
import { ProductCard } from "@/components/ProductCard"

import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/tff"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Shop - tff",
  description: "Influencer marketplace shop",
}

export default async function TffPage({
  // params,
  searchParams,
}: {
  // params: { id: string }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  const data = await fetch(`http://localhost:3000/api/shop/tff${queryString}`, {
    next: { revalidate: 120 },
  })
  const tffData: GoodsTypes = await data.json()

  return (
    <DataView<ProductCardTypes>
      resourceUrl={resourceUrl}
      initialData={tffData.data.goods}
      filtersSettings={filtersSettings}
      filtersBreakpoints={filtersBreakpoints} // TODO объединить в filtersSettings?
      toolbarConfig={{
        leftSlot: {
          type: "tabs",
          // TODO вынести отдельно и прокидывать сюда, и добавлять менять значения count в зависимости от ответа
          tabs: [
            { name: "goods", link: "/shop/1/goods", label: "Товары", count: 500 },
            { name: "sp", link: "/shop/1/sp", label: "Совместные покупки", count: 79 },
            { name: "tff", link: "/shop/1/tff", label: "Test For Free", count: 13 },
            { name: "contacts", link: "/shop/1/contacts", label: "Контакты", },
          ],
          initialActiveTab: "tff",
          initialSlide: 2,
          hasSwiper: true,
        },
        actions: ["sort", "filter", "visibleMode"],
        className: "toolbar--with-tabs",
      }}
      queryKey="goods"
      LeftToolbarComponentAtTop={<BrandToolbar />}
      ItemComponent={ProductCard}
      LayoutComponent={CardsWithMenu}
      layoutComponentProps={{ menuData: tffData.data.menu }}
      className="data-view--none-margin"
    />
  )
}
