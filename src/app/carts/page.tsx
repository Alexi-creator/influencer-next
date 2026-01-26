import type { Metadata } from "next"

import { Carts } from "@/components/Carts"

import { buildQueryString } from "@/utils/buildQueryString"
import { revalidateTime } from "@/settings/carts"

import { DataTypes } from "@/app/api/carts/route"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Carts",
  description: "Influencer marketplace carts",
}

export default async function CartsPage({
  // params,
  searchParams,
}: {
  params: { id: string }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  const data = await fetch(`http://localhost:3000/api/carts${queryString}`, {
    next: { revalidate: revalidateTime },
  })

  const cartsData: DataTypes = await data.json()

  return (
    <section className="section section--carts">
      <div className="section__inner">
        <Carts initialData={cartsData.data.data} revalidateTime={revalidateTime * 1000} />
      </div>
    </section>
  )
}
