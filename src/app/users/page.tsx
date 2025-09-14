import type { Metadata } from "next"

import { Users } from "@/components/pageComponents/Users"

import { buildQueryString } from "@/utils/buildQueryString"

import { UserCardTypes } from "@/app/api/users/route"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Users",
  description: "Influencer marketplace users",
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  const data = await fetch(`http://localhost:3000/api/users${queryString}`)
  const usersData: UserCardTypes = await data.json()

  return (
    <section className="section section--users">
      <div className="section__inner">
        <Users initialUsersData={usersData} />
      </div>
    </section>
  )
}
