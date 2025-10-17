"use client"

import { useRef, useState } from "react"

import clsx from "clsx"
import { useQuery } from "@tanstack/react-query"

import { Autocomplete } from "@/components/ui/Autocomplete"
import { ChipsPanel } from "@/components/ChipsPanel"
import { FiltersPanel, FiltersTypes } from "@/components/FiltersPanel"
import { Loading } from "@/components/layout/Loading"
import { SortsPanel } from "@/components/SortsPanel"
import { Tabs, TabsProps } from "@/components/ui/Tabs"
import { Toolbar } from "@/components/Toolbar"

import { DensityGridIcon } from "@/icons/DensityGridIcon"
import { DensityTileIcon } from "@/icons/DensityTileIcon"
import { DownIcon } from "@/icons/DownIcon"
import { FiltersIcon } from "@/icons/FiltersIcon"
import { SearchIcon } from "@/icons/SearchIcon"
import { SortsIcon } from "@/icons/SortsIcon"
import { TopIcon } from "@/icons/TopIcon"

import { useBreakpoint } from "@/hooks/useBreakpoint"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

import { BreakpointName } from "@/types/breakpointTypes"

import { buildQueryString } from "@/utils/buildQueryString"
import { calculateSelectedFiltersCount } from "@/utils/calculateSelectedFiltersCount"
import { request } from "@/utils/request"

import "./styles.scss"
import { CategoryIcon } from "@/icons/CategoryIcon"

interface initialDataTypes<T> {
  data: T[]
  count: number
}

interface AutocompleteSlot {
  type: "autocomplete"
  id: string
  name: string
  placeholder: string
  className?: string
  initialOptions: { value: string, label: string }[]
}

interface TabsSlot extends TabsProps {
  type: "tabs"
}

type LeftSlot = AutocompleteSlot | TabsSlot

type ActionTypes = "sort" | "filter" | "category" | "visibleMode"

interface ToolbarConfigTypes {
  leftSlot: LeftSlot
  actions: ActionTypes[]
  className?: string
}

interface DataViewProps<T, L> extends React.HTMLAttributes<HTMLDivElement> {
  resourceUrl: string
  initialData: initialDataTypes<T>
  filtersSettings: FiltersTypes[]
  queryKey: string
  contentClassName?: string
  LeftToolbarComponentAtTop?: React.ReactNode
  ItemComponent: React.ComponentType<T>
  LayoutComponent?: React.ComponentType<{
    data?: T[]
    renderItems: (items?: T[]) => React.ReactNode[] | undefined
  } & L>
  layoutComponentProps?: L
  sortPanelClassName?: string
  toolbarConfig: ToolbarConfigTypes
  filtersBreakpoints: Record<BreakpointName, number>
  changeDataCount?: (count: number) => void
  querySelect?: (data: initialDataTypes<T>) => initialDataTypes<T>
}

interface SortTypes {
  value: string
  text: string
  sortType: "asc" | "desc" | ""
}

interface ActionItem {
  title: string
  type: ActionTypes
  isOpen?: boolean
  hasSelected?: boolean
  selectedFiltersCount?: number
  icon: React.ReactElement
  breakpointVisible?: BreakpointName[]
  handleClick: () => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const DataView = <T extends { id: number | string }, L = {}>({
  resourceUrl,
  initialData,
  filtersSettings,
  queryKey,
  className,
  contentClassName,
  sortPanelClassName,
  ItemComponent,
  toolbarConfig,
  LeftToolbarComponentAtTop,
  LayoutComponent,
  layoutComponentProps,
  filtersBreakpoints,
  changeDataCount,
  querySelect,
}: DataViewProps<T, L>) => {
  const { currentBreakpoint } = useBreakpoint()
  const isMobile = currentBreakpoint === BreakpointName.TABLET ||
    currentBreakpoint === BreakpointName.MOBILE

  const [search, setSearch] = useState<Record<string, string>>({})

  const [filters, setFilters] = useState<Record<string, string | string[] | [number, number]>>({})
  const [isOpenFiltersPanel, setIsOpenFiltersPanel] = useState<boolean>(false)

  const [sort, setSort] = useState<SortTypes>({ value: "", text: "Сортировка", sortType: "" })
  const [isOpenSortsPanel, setIsOpenSortsPanel] = useState<boolean>(false)

  const [visibleMode, setVisibleMode] = useState<boolean>(false)

  const [temporaryFilters, setTemporaryFilters] = useState<Record<string, string | string[] | [number, number]>>({})

  const queryParams = {
    ...search,
    ...filters,
    ...(sort.value ? { sort: sort.value } : {}),
  }

  const { data, isFetching } = useQuery<initialDataTypes<T>>({
    queryKey: [queryKey, sort.value, sort.sortType, JSON.stringify(filters), JSON.stringify(search)],
    queryFn: async () => {
      const res = await request<initialDataTypes<T>>(`${resourceUrl}${buildQueryString(queryParams)}`, {})
      if (res) changeDataCount?.(res.count)

      return res
    },
    initialData: (sort.value === "" && Object.keys(filters).length === 0 && Object.keys(search).length === 0) ? initialData : undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    select: querySelect || ((data) => data),
  })

  const sentinelRef = useRef<HTMLDivElement>(null)
  const isToolbarIntersection = useIntersectionObserver({
    ref: sentinelRef,
    options: {
      rootMargin: "-104px 0px 0px 0px",
    },
    initialValue: true,
  })
  const isToolbarAtTop = !isToolbarIntersection

  const handleSortChange = ({ value, text, sortType }: SortTypes) => {
    setSort({ value, text, sortType })
    setIsOpenSortsPanel(false)

    // TODO сделать систему изменения url для фильтров и реагировать на popstate
    // router.push(queryString)
  }

  const handleFiltersChange = (newFilters: Record<string, string | string[] | [number, number]>) => {
    setFilters(newFilters)
  }

  const handleRemoveChip = (filterName: string) => {
    setFilters(prev => Object.fromEntries(Object.entries(prev).filter(([name]) => name !== filterName)))
    setTemporaryFilters(prev => Object.fromEntries(Object.entries(prev).filter(([name]) => name !== filterName)))
  }

  const handleSelectSearch = (value: string) => {
    setSearch({ "users-autocomplete": value })
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

  const chipsItems = Object.entries(filters).map(([filterName, filterValue]) => {
    const settingFilter = filtersSettings.find(filter => filter.name === filterName)

    if (settingFilter?.filterType === "checkbox") {
      const checkboxOptions = settingFilter.options as { label: string, value: string }[]
      const options = checkboxOptions.filter(opt => (filterValue as string[]).includes(opt.value))

      return {
        name: filterName,
        label: settingFilter.label || filterName,
        options: options.map(option => option.label),
      }
    }

    if (settingFilter?.filterType === "rangeSlider") {
      return {
        name: filterName,
        label: settingFilter?.label || filterName,
        options: `от ${filterValue[0]} до ${filterValue[1]}`,
      }
    }

    return undefined
  }).filter(Boolean) as { name: string; label: string; options: string | string[] }[]

  const actions: ActionItem[] = [
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
    },
    {
      title: "Категории",
      type: "category",
      isOpen: isOpenFiltersPanel,
      hasSelected: !!selectedFiltersCount,
      selectedFiltersCount,
      icon: <CategoryIcon />,
      handleClick: () => setIsOpenFiltersPanel(prev => !prev),
    },
    {
      title: "",
      type: "visibleMode",
      hasSelected: visibleMode,
      icon: visibleMode ? <DensityGridIcon /> : <DensityTileIcon />,
      breakpointVisible: [BreakpointName.MOBILE, BreakpointName.TABLET],
      handleClick: () => setVisibleMode(prev => !prev),
    },
  ]

  const getToolbarLeftSlot = (leftSlotConfig: ToolbarConfigTypes["leftSlot"]) => {
    switch (leftSlotConfig.type) {
    case "autocomplete":
      return (
        <Autocomplete
          {...leftSlotConfig}
          prefixNode={<SearchIcon />}
          inputClassName="input--color-grey"
          onSelect={handleSelectSearch}
        />
      )

    case "tabs":
      if (isToolbarAtTop && LeftToolbarComponentAtTop) {
        return (
          LeftToolbarComponentAtTop
        )
      } else {
        return (
          <Tabs
            {...leftSlotConfig}
          />
        )
      }
    }
  }

  const getToolbarActions = (actionsConfig: ToolbarConfigTypes["actions"]): ActionItem[] => {
    return actions.filter(action => actionsConfig.includes(action.type))
  }

  const renderItems = (items?: T[]): React.ReactNode[] | undefined => items?.map((item, index) => (
    <ItemComponent key={item.id || index} {...item} />
  ))

  const content = LayoutComponent ?
    <LayoutComponent
      data={data?.data}
      renderItems={renderItems}
      visibleMode={visibleMode}
      {...(layoutComponentProps as L)}
    /> : renderItems(data?.data)

  return (
    <div className={clsx("data-view", className)}>
      <div ref={sentinelRef} style={{ height: 1 }} />
      <Toolbar
        className={clsx(toolbarConfig.className, {
          "toolbar--at-top": isToolbarAtTop,
        })}
        isToolbarAtTop={isToolbarAtTop}
        sentinelRef={sentinelRef}
        leftSlot={getToolbarLeftSlot(toolbarConfig.leftSlot)}
        configActions={getToolbarActions(toolbarConfig.actions)}
      />

      <ChipsPanel
        isOpen={!!selectedFiltersCount}
        items={chipsItems}
        onRemoveChip={handleRemoveChip}
      />

      <SortsPanel
        isOpen={isOpenSortsPanel}
        selectedSort={sort}
        onClose={() => setIsOpenSortsPanel(false)}
        onSortChange={handleSortChange}
        className={sortPanelClassName}
      />

      <FiltersPanel
        isOpen={isOpenFiltersPanel}
        filters={filtersSettings}
        temporaryFilters={temporaryFilters}
        breakpointsSettings={filtersBreakpoints}
        setTemporaryFilters={setTemporaryFilters}
        onClose={() => setIsOpenFiltersPanel(false)}
        onFiltersChange={handleFiltersChange}
      />

      <div className={clsx("data-view__content", contentClassName)}>
        {isFetching ? <Loading /> : content}
      </div>
    </div>
  )
}
