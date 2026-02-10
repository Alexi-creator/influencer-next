import type { Metadata } from "next"
import type { UserCardTypes } from "@/app/api/users/route"
import { Users } from "@/components/pageComponents/Users"
import { Section } from "@/components/ui/Section"
import { buildQueryString } from "@/utils/buildQueryString"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Users",
  description: "Influencer marketplace users",
}

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  const data = await fetch(`http://localhost:3000/api/users${queryString}`)
  const usersData: UserCardTypes = await data.json()

  return (
    <Section className="section--users">
      <Users initialData={usersData} />
    </Section>
  )
}
