import type { Metadata } from "next"

import { Carts } from "@/components/Carts"

import { buildQueryString } from "@/utils/buildQueryString"
import { revalidateNameTag, revalidateTime } from "@/settings/carts"

import { DataTypes } from "@/app/api/carts/route"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Carts",
  description: "Influencer carts",
}

/**
 * CartsPage - Входная точка для страницы корзин
 *
 * Флоу кэширования:
 * Первый GET главной страницы → данные кешируются на сервере
 * далее Next Пользователь что-то сделал в клиенте (create / update / delete через внешний API) Кеш сбрасывается за счет revalidateCarts
 * При reload страницы → данные берутся свежие, даже если TTL ещё не истёк
 */
export default async function CartsPage({
  // params,
  searchParams,
}: {
  params: { id: string }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  //  Возможно queryString и не нужен будет, убрать.
  const data = await fetch(`http://localhost:3000/api/carts${queryString}`, {
    next: {
      tags: [revalidateNameTag],
      revalidate: revalidateTime,
    },
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
