import type { Metadata } from "next"

import { Catalog } from "@/components/Catalog/page"
import { Section } from "@/components/ui/Section"
import { resourceUrl, serverRevalidateTime } from "@/settings/catalog"
import { catalogResponseSchema } from "@/types/catalog.schema"

export const metadata: Metadata = {
  title: "Catalog",
  description: "Influencer marketplace catalog",
}

export default async function CatalogPage() {
  const data = await fetch(resourceUrl, {
    next: { revalidate: serverRevalidateTime },
  })
  const catalogData = catalogResponseSchema.parse(await data.json())

  return (
    <Section className="section--catalog">
      <Catalog catalogData={catalogData} />
    </Section>
  )
}
