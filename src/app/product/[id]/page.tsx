export const dynamic = "force-dynamic"
export const dynamicParams = true

import type { Metadata } from "next"
import { JointPurchasesCard, type JointPurchasesCardTypes } from "@/components/JointPurchasesCard"
import { PostCard } from "@/components/PostCard"
import { Product } from "@/components/Product"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Section } from "@/components/ui/Section"
import { WithProduct } from "@/components/WithProduct"
import { API_URLS } from "@/constants/api"
import { revalidateProductNameTag, serverRevalidateTime } from "@/settings/product"
import { productResponseSchema } from "@/types/product.schema"
import { postCardResponseSchema } from "@/types/postCard.schema"
import { spResponseSchema } from "@/types/sp.schema"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Product",
  description: "Influencer product",
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URLS.products}`)
    const json = await res.json()
    const products: { id: number }[] = json.data?.data ?? json.data ?? json

    return products.map((p) => ({ id: String(p.id) }))
  } catch {
    return []
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const [productResponse, spResponse, publicationsResponse] = await Promise.all([
    fetch(`${API_URLS.product.replace(":id", id)}`, {
      next: {
        tags: [revalidateProductNameTag],
        revalidate: serverRevalidateTime,
      },
    }),
    fetch(`${API_URLS.productSp.replace(":id", id)}`, {
      next: { revalidate: serverRevalidateTime },
    }),
    fetch(`${API_URLS.productPublications.replace(":id", id)}`, {
      next: { revalidate: serverRevalidateTime },
    }),
  ])

  const [productData, spData, publicationsData] = await Promise.all([
    productResponse.json().then((json) => productResponseSchema.parse(json).data.data),
    spResponse.json().then((json) => spResponseSchema.parse(json)),
    publicationsResponse.json().then((json) => postCardResponseSchema.parse(json)),
  ])

  return (
    <>
      <Section className="section--breadcrumbs">
        <Breadcrumbs className="breadcrumbs--primary" items={productData.breadcrumbs} />
      </Section>

      <Section className="section--product">
        <Product {...productData} />
      </Section>

      <Section className="section--with-product">
        <WithProduct<JointPurchasesCardTypes>
          title="Совместные Покупки с этим товаром"
          btnHeaderText="Создать СП"
          btnLoadText="Подгрузить все сп"
          resourceUrl={API_URLS.shop.sp}
          queryKey="product-sp"
          initialData={spData.data}
          initialCount={spData.count}
          contentClassName="joint-purchases-list"
          ItemComponent={JointPurchasesCard}
        />
      </Section>

      <Section className="section--with-product">
        <WithProduct
          title="Публикации с этим товаром"
          btnHeaderText="Создать публикацию"
          btnLoadText="Подгрузить все публикации"
          resourceUrl={API_URLS.productPublications}
          queryKey="product-publications"
          initialData={publicationsData.data}
          initialCount={publicationsData.count}
          contentClassName="post-card-list"
          ItemComponent={PostCard}
        />
      </Section>
    </>
  )
}
