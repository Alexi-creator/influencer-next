import type { Metadata } from "next"
import type {
  GoodsTypes,
  ProductCardTypes,
  ProductMenuTypes,
} from "@/app/api/shop/[id]/goods/route"
import { BrandToolbar } from "@/components/BrandToolbar"
import { CardsWithMenu } from "@/components/CardsWithMenu"
import { DataView } from "@/components/DataView"
import { JpDetails } from "@/components/JpDetails"
import { ProductCard } from "@/components/ProductCard"
import { Section } from "@/components/ui/Section"
import { API_URLS } from "@/constants/api"
import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/shop/goods"
import type { JpDetailsResponseTypes } from "@/types/jpDetails.schema"
import { buildQueryString } from "@/utils/buildQueryString"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Sp",
  description: "Influencer marketplace sp",
}

export default async function SpPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params

  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  const [data, spData] = await Promise.all([
    fetch(`${API_URLS.spInfo.replace(":id", id)}${queryString}`, {
      next: { revalidate: 120 },
    }),
    fetch(API_URLS.spInfo.replace(":id", id), {
      next: { revalidate: 120 },
    }),
  ])

  const goodsData: GoodsTypes = await data.json()
  const jpData: JpDetailsResponseTypes = await spData.json()

  return (
    <>
      <Section className="section--inner-jp">
        <JpDetails data={jpData.data.jpDetails} />
      </Section>

      <Section>
        <DataView<ProductCardTypes, { menuData: ProductMenuTypes[] }>
          resourceUrl={resourceUrl}
          initialData={goodsData.data.goods}
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
                { name: "contacts", link: "/shop/1/contacts", label: "Контакты" },
              ],
              initialActiveTab: "goods",
              hasSwiper: true,
            },
            actions: ["sort", "filter", "visibleMode"],
            className: "toolbar--with-tabs",
          }}
          queryKey="goods"
          LeftToolbarComponentAtTop={<BrandToolbar />}
          ItemComponent={ProductCard}
          LayoutComponent={CardsWithMenu}
          layoutComponentProps={{ menuData: goodsData.data.menu }}
          className="data-view--none-margin"
        />
      </Section>
    </>
  )
}
