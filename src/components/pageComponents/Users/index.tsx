"use client"

import { useState } from "react"

import { useQuery } from "@tanstack/react-query"

import { Autocomplete } from "@/components/ui/Autocomplete"
import { ChipsPanel } from "@/components/ChipsPanel"
import { FiltersPanel, filtersTypes } from "@/components/FiltersPanel"
import { Loading } from "@/components/layout/Loading"
import { SortsPanel } from "@/components/SortsPanel"
import { Title } from "@/components/Title"
import { Toolbar } from "@/components/Toolbar"
import { UserCard } from "@/components/UserCard"

import { FiltersIcon } from "@/icons/FiltersIcon"
import { SearchIcon } from "@/icons/SearchIcon"
import { SortsIcon } from "@/icons/SortsIcon"
import { TopIcon } from "@/icons/TopIcon"
import { DownIcon } from "@/icons/DownIcon"

import { UserCardTypes } from "@/app/api/users/route"

import { useBreakpoint } from "@/hooks/useBreakpoint"

import { BreakpointName } from "@/types/breakpointTypes"

import { buildQueryString } from "@/utils/buildQueryString"
import { calculateSelectedFiltersCount } from "@/utils/calculateSelectedFiltersCount"
import { request } from "@/utils/request"

import "./styles.scss"

interface UsersProps extends React.HTMLAttributes<HTMLDivElement> {
  initialUsersData: UserCardTypes
}

interface SortTypes {
  value: string
  text: string
  sortType: "asc" | "desc" | ""
}

export const Users = ({
  initialUsersData,
}: UsersProps) => {
  // TODO должно передавать из настроечного файла
  const filtersSettings: filtersTypes[] = [
    {
      label: "Фильтр",
      name: "filter_users",
      filterType: "checkbox",
      options: [
        { label: "все", value: "all" },
        { label: "FronTTrend SeTTer", value: "fts" },
        { label: "мои подписки", value: "subscribes" },
        { label: "мои подписчики", value: "followers" },
      ],
    },
  ]

  const { currentBreakpoint } = useBreakpoint()
  const isMobile = currentBreakpoint === BreakpointName.TABLET ||
    currentBreakpoint === BreakpointName.MOBILE

  const [filters, setFilters] = useState<Record<string, string | string[]>>({})
  const [isOpenFiltersPanel, setIsOpenFiltersPanel] = useState<boolean>(false)

  const [sort, setSort] = useState<SortTypes>({ value: "", text: "Сортировка", sortType: "" })
  const [isOpenSortsPanel, setIsOpenSortsPanel] = useState<boolean>(false)

  const [temporaryFilters, setTemporaryFilters] = useState<Record<string, string | string[]>>({})

  const queryParams = {
    ...filters,
    ...(sort.value ? { sort: sort.value } : {}),
  }
  const queryString = buildQueryString(queryParams)

  const { data, isFetching } = useQuery<UserCardTypes>({
    queryKey: ["users", sort.value, sort.sortType, JSON.stringify(filters)],
    queryFn: () => request<UserCardTypes>(`/api/users${queryString}`, {}),
    initialData: (sort.value === "" && Object.keys(filters).length === 0) ? initialUsersData : undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const handleSortChange = ({ value, text, sortType }: SortTypes) => {
    setSort({ value, text, sortType })
    setIsOpenSortsPanel(false)

    // TODO сделать систему изменения url для фильтров и реагировать на popstate
    // router.push(queryString)
  }

  const handleFiltersChange = (newFilters: Record<string, string | string[]>) => {
    setFilters(newFilters)
  }

  const handleRemoveChip = (filterName: string) => {
    setFilters(prev => Object.fromEntries(Object.entries(prev).filter(([name]) => name !== filterName)))
    setTemporaryFilters(prev => Object.fromEntries(Object.entries(prev).filter(([name]) => name !== filterName)))
  }

  const getSortIcon = () => {
    switch (sort?.sortType) {
    case "asc":
      return <TopIcon />
    case "desc":
      return <DownIcon />
    default:
      return <SortsIcon />
    }
  }

  const selectedFiltersCount = calculateSelectedFiltersCount(filters)

  const shouldBlockWindowScroll = isMobile && (isOpenSortsPanel || isOpenFiltersPanel)

  if (typeof window !== "undefined") {
    if (shouldBlockWindowScroll) {
      document.body.classList.add("overflow")
    } else {
      document.body.classList.remove("overflow")
    }
  }

  const chipsItems = Object.entries(filters).map(([key, value]) => {
    const settingFilter = filtersSettings.find(filter => filter.name === key)
    const options = (settingFilter?.options || []).filter(opt => value.includes(opt.value))

    return {
      name: key,
      label: settingFilter?.label || key,
      options: options.map(option => option.label),
    }
  })

  return (
    <>
      <Title
        title="Блогеры"
        isSubscription
        amount={data?.count}
        sub="пользователей"
      />

      <div className="user-card-list">
        <Toolbar
          leftSlot={
            <Autocomplete
              id="users-autocomplete"
              name="users-autocomplete"
              placeholder="Введите имя блогера"
              className="user-card-list__autocomplete"
              prefixNode={<SearchIcon />}
              inputClassName="input--color-grey"
              initialOptions={[
                { value: "Bloger1", label: "Bloger1" },
                { value: "Bloger2", label: "Bloger2" },
                { value: "Bloger3", label: "Bloger3" },
                { value: "Bloger4", label: "Bloger4" },
                { value: "Bloger5", label: "Bloger5" },
                { value: "Bloger6", label: "Bloger6" },
                { value: "Bloger7", label: "Bloger7" },
                { value: "Bloger8", label: "Bloger8" },
                { value: "Bloger9", label: "Bloger9" },
              ]}
            />
          }
          configActions={[
            {
              title: sort.text,
              type: "sort",
              isOpen: isOpenSortsPanel,
              hasSelected: !!sort.value,
              icon: getSortIcon(),
              handleClick: () => setIsOpenSortsPanel(prev => !prev),
            },
            {
              title: "Фильтры",
              type: "filter",
              isOpen: isOpenFiltersPanel,
              hasSelected: !!selectedFiltersCount,
              selectedFiltersCount,
              icon: <FiltersIcon />,
              handleClick: () => setIsOpenFiltersPanel(prev => !prev),
            }
          ]}
        />

        <ChipsPanel
          isOpen={!!selectedFiltersCount}
          items={chipsItems}
          onRemoveChip={handleRemoveChip}
        />

        <SortsPanel
          isOpen={isOpenSortsPanel}
          onClose={() => setIsOpenSortsPanel(false)}
          onSortChange={handleSortChange}
        />

        <FiltersPanel
          isOpen={isOpenFiltersPanel}
          filters={filtersSettings}
          temporaryFilters={temporaryFilters}
          setTemporaryFilters={setTemporaryFilters}
          onClose={() => setIsOpenFiltersPanel(false)}
          onFiltersChange={handleFiltersChange}
        />

        <div className="user-card-list__cards-wrapper">
          {isFetching ?
            <Loading isFixed /> :
            data?.data.map((user) => (
              <UserCard key={user.id} user={user} />
            ))
          }
        </div>
      </div>
    </>
  )
}
