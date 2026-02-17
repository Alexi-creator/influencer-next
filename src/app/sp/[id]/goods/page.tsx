export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import type { GoodsTypes } from "@/app/api/sp/[id]/goods/route"
import { JpDetails } from "@/components/JpDetails"
import { Divider } from "@/components/ui/Divider"
import { Section } from "@/components/ui/Section"
import { API_URLS } from "@/constants/api"
import type { JpDetailsResponseTypes } from "@/types/jpDetails.schema"
import { buildQueryString } from "@/utils/buildQueryString"
import { SpGoods } from "./SpGoods"
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

  const [spData, data] = await Promise.all([
    fetch(`${API_URLS.spInfo.replace(":id", id)}${queryString}`, {
      next: { revalidate: 0 },
    }),
    fetch(API_URLS.sp.goods.replace(":id", id), {
      next: { revalidate: 0 },
    }),
  ])

  const jpData: JpDetailsResponseTypes = await spData.json()
  const goodsData: GoodsTypes = await data.json()

  return (
    <>
      <Section className="section--inner-jp">
        <JpDetails data={jpData.data.jpDetails} />
      </Section>

      <Section className="section--inner-jp-goods">
        <Divider />

        <SpGoods
          initialData={goodsData.data.goods}
          menuData={goodsData.data.menu}
          entityToolbar={{
            name: jpData.data.jpDetails.title,
            imgHref: jpData.data.jpDetails.shop.image,
          }}
        />
      </Section>
    </>
  )
}
