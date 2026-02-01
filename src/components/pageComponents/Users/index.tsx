"use client"

import { useState } from "react"

import { DataView } from "@/components/DataView"
import { Title } from "@/components/Title"
import { UserCard } from "@/components/UserCard"
import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/users"
import type { UserCardTypes } from "@/types/userCardTypes"

import "./styles.scss"

interface UsersProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData: {
    data: UserCardTypes[]
    count: number
  }
}

export const Users = ({ initialData }: UsersProps) => {
  const [userCount, setUserCount] = useState<number>(initialData?.count)

  return (
    <>
      <Title title="Блогеры" subscription={`${userCount} пользователей`} />

      <DataView<UserCardTypes>
        resourceUrl={resourceUrl}
        initialData={initialData}
        filtersSettings={filtersSettings}
        filtersBreakpoints={filtersBreakpoints}
        toolbarConfig={{
          leftSlot: {
            type: "autocomplete",
            id: "users-autocomplete",
            name: "users-autocomplete",
            placeholder: "Введите имя блогера",
            className: "user-card-list__autocomplete",
            initialOptions: [
              { value: "Bloger1", label: "Bloger1" },
              { value: "Bloger2", label: "Bloger2" },
              { value: "Bloger3", label: "Bloger3" },
              { value: "Bloger4", label: "Bloger4" },
              { value: "Bloger5", label: "Bloger5" },
              { value: "Bloger6", label: "Bloger6" },
              { value: "Bloger7", label: "Bloger7" },
              { value: "Bloger8", label: "Bloger8" },
              { value: "Bloger9", label: "Bloger9" },
            ],
          },
          actions: ["sort", "filter"],
        }}
        queryKey="users"
        className="user-card-list"
        contentClassName="user-card-list__cards-wrapper"
        sortPanelClassName="user-card-list__sort-panel"
        ItemComponent={UserCard}
        changeDataCount={setUserCount}
      />
    </>
  )
}
