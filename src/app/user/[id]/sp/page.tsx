export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import { UserBrandToolbar } from "@/components/UserBrandToolbar"
import { DataView } from "@/components/DataView"
import { JointPurchasesCard, type JointPurchasesCardTypes } from "@/components/JointPurchasesCard"
import { JointPurchasesList } from "@/components/JointPurchasesList"
import { API_URLS } from "@/constants/api"
import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/user/sp"
import { spResponseSchema } from "@/types/sp.schema"
import { buildQueryString } from "@/utils/buildQueryString"

import "./styles.scss"

export const metadata: Metadata = {
  title: "User - sp",
  description: "Influencer marketplace user",
}

export default async function SpPage({
  // params,
  searchParams,
}: {
  // params: { id: string }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  const data = await fetch(`${API_URLS.user.sp}${queryString}`, {
    next: { revalidate: 120 },
  })
  const spData = spResponseSchema.parse(await data.json())

  return (
    <DataView<JointPurchasesCardTypes>
      resourceUrl={resourceUrl}
      initialData={spData}
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
          initialActiveTab: "sp",
          title: "Выберите раздел пользователя",
          titleClassName: "data-view__tab-title",
          hasSwiper: true,
          initialSlide: 1,
        },
        actions: ["sort", "filter"],
        className: "toolbar--with-tabs",
      }}
      queryKey="sp"
      LeftToolbarComponentAtTop={<UserBrandToolbar />}
      ItemComponent={JointPurchasesCard}
      LayoutComponent={JointPurchasesList}
      className="data-view--none-margin"
    />
  )
}
