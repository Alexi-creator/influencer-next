import type { Metadata } from "next"
import { API_URLS } from "@/constants/api"
import { usersResponseSchema } from "@/types/users.schema"
import { Users } from "@/components/pageComponents/Users"
import { Section } from "@/components/ui/Section"
import { buildQueryString } from "@/utils/buildQueryString"

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

  const data = await fetch(`${API_URLS.users}${queryString}`)
  const usersData = usersResponseSchema.parse(await data.json())

  return (
    <Section className="section--users">
      <Users initialData={usersData} />
    </Section>
  )
}
