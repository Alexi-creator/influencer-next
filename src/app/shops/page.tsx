import type { Metadata } from "next"
import { shopsResponseSchema, type ShopTypes } from "@/types/shops.schema"
import { DataView } from "@/components/DataView"
import { Shop } from "@/components/Shop"
import { Title } from "@/components/Title"
import { Section } from "@/components/ui/Section"

import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/shops"
import { buildQueryString } from "@/utils/buildQueryString"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Shops",
  description: "Influencer marketplace shops",
}

export default async function ShopsPage({
  // params,
  searchParams,
}: {
  // params: { id: string }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  const data = await fetch(`http://localhost:3000/api/shops${queryString}`, {
    next: { revalidate: 120 },
  })
  const shopsData = shopsResponseSchema.parse(await data.json())

  return (
    <>
      <Section className="section--shops">
        <Title title="Магазины" subscription={`${shopsData.data.count} продавцов`} />
      </Section>

      <Section className="section--shops section--shops-list">
        <DataView<ShopTypes>
          resourceUrl={resourceUrl}
          initialData={shopsData.data}
          filtersSettings={filtersSettings}
          filtersBreakpoints={filtersBreakpoints}
          toolbarConfig={{
            leftSlot: {
              type: "autocomplete",
              id: "shops",
              name: "shops",
              placeholder: "Введите название магазина",
              className: "",
              initialOptions: [
                { value: "shop1", label: "Магазин1" },
                { value: "shop2", label: "Магазин2" },
                { value: "shop3", label: "Магазин3" },
                { value: "shop4", label: "Магазин4" },
                { value: "shop5", label: "Магазин5" },
                { value: "shop6", label: "Магазин6" },
                { value: "shop7", label: "Магазин7" },
                { value: "shop8", label: "Магазин8" },
                { value: "shop9", label: "Магазин9" },
              ],
            },
            actions: ["sort", "category"],
          }}
          queryKey="shops"
          className="data-view--none-margin"
          contentClassName="shops-block"
          sortPanelClassName=""
          ItemComponent={Shop}
        />
      </Section>
    </>
  )
}
