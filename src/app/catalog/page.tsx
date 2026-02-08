import type { Metadata } from "next"

import type { CatalogTypes } from "@/components/Catalog/page"
import { Catalog } from "@/components/Catalog/page"
import { resourceUrl, serverRevalidateTime } from "@/settings/catalog"

export const metadata: Metadata = {
  title: "Catalog",
  description: "Influencer marketplace catalog",
}

export default async function CatalogPage() {
  const data = await fetch(`http://localhost:3000${resourceUrl}`, {
    next: { revalidate: serverRevalidateTime },
  })
  const catalogData: CatalogTypes[] = await data.json()

  return (
    <section className="section section--catalog">
      <div className="section__inner">
        <Catalog catalogData={catalogData} />
      </div>
    </section>
  )
}
