import type { Metadata } from "next"

import { Catalog } from "@/components/Catalog/page"

export const metadata: Metadata = {
  title: "Catalog",
  description: "Influencer marketplace catalog",
}

export default async function CatalogPage() {
  const data = await fetch("http://localhost:3000/api/catalog")
  const catalogData = await data.json()

  return (
    <section className="section section--catalog">
      <div className="section__inner">
        <Catalog catalogData={catalogData} />
      </div>
    </section>
  )
}
