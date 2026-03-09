"use client"

import { DataView } from "@/components/DataView"
import { UserBrandToolbar } from "@/components/UserBrandToolbar"
import { UserCard } from "@/components/UserCard"
import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/user/subscribers"
import type { UserCardTypes } from "@/types/users.schema"

interface SubscribersViewProps {
  initialData: { data: UserCardTypes[]; count: number }
}

export const SubscribersView = ({ initialData }: SubscribersViewProps) => {
  return (
    <DataView<UserCardTypes>
      resourceUrl={resourceUrl}
      initialData={initialData}
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
          initialActiveTab: "subscribers",
          hasSwiper: true,
          initialSlide: 1,
        },
        rightSlot: {
          type: "autocomplete",
          id: "subscribers-search",
          name: "subscribers-search",
          placeholder: "Поиск подписчиков",
          initialOptions: [],
        },
        actions: ["sort", "filter"],
        className: "toolbar--with-tabs",
      }}
      queryKey="user-subscribers"
      contentClassName="user-cards-wrapper"
      LeftToolbarComponentAtTop={<UserBrandToolbar />}
      ItemComponent={UserCard}
      className="data-view--none-margin"
    />
  )
}
