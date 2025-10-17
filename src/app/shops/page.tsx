import type { Metadata } from "next"

import { DataView } from "@/components/DataView"
import { Title } from "@/components/Title"

import { buildQueryString } from "@/utils/buildQueryString"

import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/shops"

import { DataTypes, ShopTypes } from "@/app/api/shops/route"

import "./styles.scss"
import { Shop } from "@/components/Shop"

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
  const shopsData: DataTypes = await data.json()

  return (
    <>
      <section className="section section--shops">
        <div className="section__inner">
          <Title
            title="Магазины"
            isSubscription
            amount={shopsData.data.count}
            sub="продавцов"
          />
        </div>
      </section>

      <section className="section section--shops section--shops-list">
        <div className="section__inner">
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
        </div>
      </section>
    </>
  )
}
