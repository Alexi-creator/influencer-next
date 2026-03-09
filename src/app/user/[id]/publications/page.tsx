export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import { DataView } from "@/components/DataView"
import { PostCard, type PostCardTypes } from "@/components/PostCard"
import { UserBrandToolbar } from "@/components/UserBrandToolbar"
import { API_URLS } from "@/constants/api"
import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/user/publications"
import { buildQueryString } from "@/utils/buildQueryString"

import "./styles.scss"

export const metadata: Metadata = {
  title: "User - publications",
  description: "Influencer marketplace user",
}

export default async function PublicationsPage({
  // params,
  searchParams,
}: {
  // params: { id: string }
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  const queryString = buildQueryString(queryParams)

  const data = await fetch(`${API_URLS.user.publications}${queryString}`, {
    next: { revalidate: 120 },
  })
  const publicationsData: { data: { data: PostCardTypes[]; count: number } } = await data.json()

  return (
    <DataView<PostCardTypes>
      resourceUrl={resourceUrl}
      initialData={publicationsData.data}
      filtersSettings={filtersSettings}
      filtersBreakpoints={filtersBreakpoints}
      toolbarConfig={{
        leftSlot: {
          type: "tabs",
          tabs: [
            { name: "publications", link: "/user/1/publications", label: "Публикации", count: 500 },
            { name: "subscribers", link: "/user/1/subscribers", label: "Подписчики", count: 79 },
            { name: "subscriptions", link: "/user/1/subscriptions", label: "Подписки", count: 13 },
            { name: "likes", link: "/user/1/likes", label: "Нравится", count: 24 },
          ],
          initialActiveTab: "publications",
          hasSwiper: true,
        },
        rightSlot: {
          type: "autocomplete",
          id: "publications-search",
          name: "publications-search",
          placeholder: "Поиск публикаций",
          initialOptions: [],
        },
        actions: ["sort", "filter"],
        className: "toolbar--with-tabs",
      }}
      queryKey="user-publications"
      LeftToolbarComponentAtTop={<UserBrandToolbar />}
      ItemComponent={PostCard}
      contentClassName="post-card-list"
      className="data-view--none-margin"
    />
  )
}
