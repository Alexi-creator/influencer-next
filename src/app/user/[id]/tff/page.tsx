export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import type { GoodsTypes, ProductCardTypes } from "@/app/api/shop/[id]/goods/route"
import { UserBrandToolbar } from "@/components/UserBrandToolbar"
import { CardsWithMenu } from "@/components/CardsWithMenu"
import { DataView } from "@/components/DataView"
import { ProductCard } from "@/components/ProductCard"
import { API_URLS } from "@/constants/api"
import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/user/tff"
import { buildQueryString } from "@/utils/buildQueryString"

import "./styles.scss"

export const metadata: Metadata = {
  title: "User - tff",
  description: "Influencer marketplace user",
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

  const data = await fetch(`${API_URLS.user.tff}${queryString}`, {
    next: { revalidate: 120 },
  })
  const tffData: GoodsTypes = await data.json()

  return (
    <DataView<ProductCardTypes>
      resourceUrl={resourceUrl}
      initialData={tffData.data.goods}
      filtersSettings={filtersSettings}
      filtersBreakpoints={filtersBreakpoints}
      toolbarConfig={{
        leftSlot: {
          type: "tabs",
          tabs: [
            { name: "goods", link: "/user/1/goods", label: "Товары", count: 500 },
            { name: "sp", link: "/user/1/sp", label: "Совместные покупки", count: 79 },
            { name: "tff", link: "/user/1/tff", label: "Test For Free", count: 13 },
            { name: "contacts", link: "/user/1/contacts", label: "Контакты" },
          ],
          initialActiveTab: "tff",
          initialSlide: 2,
          hasSwiper: true,
        },
        actions: ["sort", "filter", "visibleMode"],
        className: "toolbar--with-tabs",
      }}
      queryKey="goods"
      LeftToolbarComponentAtTop={<UserBrandToolbar />}
      ItemComponent={ProductCard}
      LayoutComponent={CardsWithMenu}
      layoutComponentProps={{ menuData: tffData.data.menu }}
      className="data-view--none-margin"
    />
  )
}
