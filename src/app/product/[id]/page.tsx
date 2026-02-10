export const dynamicParams = true

import type { Metadata } from "next"
import { Product } from "@/components/Product"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Section } from "@/components/ui/Section"
import { API_URLS } from "@/constants/api"
import { revalidateProductNameTag, serverRevalidateTime } from "@/settings/product"
import type { ProductTypes } from "@/types/product"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Product",
  description: "Influencer product",
}

export async function generateStaticParams() {
  const res = await fetch(`http://localhost:3000${API_URLS.products}`)
  const json = await res.json()
  const products: { id: number }[] = json.data?.data ?? json.data ?? json

  return products.map((p) => ({ id: String(p.id) }))
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const productResponse = await fetch(
    `http://localhost:3000/${API_URLS.product.replace(":id", id)}`,
    {
      next: {
        tags: [revalidateProductNameTag],
        revalidate: serverRevalidateTime,
      },
    },
  )

  const productJson = await productResponse.json()
  const productData: ProductTypes = productJson.data?.data ?? productJson.data ?? productJson

  return (
    <>
      <Section className="section--breadcrumbs">
        <Breadcrumbs
          className="breadcrumbs--primary"
          items={productData.breadcrumbs}
        />
      </Section>

      <Section className="section--product">
        <Product {...productData} />
      </Section>

      <Section className="section--with-product">
        {/* <Product {...productData} /> */}
      </Section>

      <Section className="section--with-product">
        {/* <Product {...productData} /> */}
      </Section>
    </>
  )
}
