import type { Metadata } from "next"

import { BrandToolbar } from "@/components/BrandToolbar"
import { DataView } from "@/components/DataView"
import { JointPurchasesCard, JointPurchasesCardTypes } from "@/components/JointPurchasesCard"
import { JointPurchasesList } from "@/components/JointPurchasesList"

import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/sp"

import { buildQueryString } from "@/utils/buildQueryString"

import { SpTypes } from "@/app/api/shop/sp/route"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Shop - sp",
  description: "Influencer marketplace shop",
}

export default async function GoodsPage({
  // params,
  searchParams,
}: {
  // params: { id: string }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  const data = await fetch(`http://localhost:3000/api/shop/sp${queryString}`, {
    next: { revalidate: 120 },
  })
  const spData: SpTypes = await data.json()

  return (
    <DataView<JointPurchasesCardTypes>
      resourceUrl={resourceUrl}
      initialData={spData}
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
          initialActiveTab: "sp",
          title: "Выберите раздел магазина",
          titleClassName: "data-view__tab-title",
          hasSwiper: true,
          initialSlide: 1,
        },
        actions: ["sort", "filter"],
        className: "toolbar--with-tabs",
      }}
      queryKey="sp"
      LeftToolbarComponentAtTop={<BrandToolbar />}
      ItemComponent={JointPurchasesCard}
      LayoutComponent={JointPurchasesList}
      className="data-view--none-margin"
    />
  )
}
