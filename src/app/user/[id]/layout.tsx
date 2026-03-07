import type { UserTypes } from "@/app/api/user/[id]/route"

import { UserPreview } from "@/components/UserPreview"
import { Section } from "@/components/ui/Section"
import { API_URLS } from "@/constants/api"
import { UserProvider } from "@/providers/UserProvider"
import { buildQueryString } from "@/utils/buildQueryString"

import "./styles.scss"

export default async function UserLayout({
  children,
  // params,
  searchParams,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // const { id } = await params
  const queryParams = await searchParams

  const queryString = buildQueryString(queryParams)

  // TODO добавить id в запрос для конкретного пользователя
  const data = await fetch(`${API_URLS.userInfo}${queryString}`)
  const userData: UserTypes = await data.json()

  return (
    <UserProvider value={userData.data.preview}>
      <Section className="section--user-info">
        <UserPreview data={userData.data.preview} />
      </Section>

      <Section className="section--user-board">{children}</Section>
    </UserProvider>
  )
}
