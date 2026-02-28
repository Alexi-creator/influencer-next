"use client"

import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { useState } from "react"

import { FiltersPanel, type FiltersTypes } from "@/components/FiltersPanel"
import { Loading } from "@/components/layout/Loading"
import { PublicationItem } from "@/components/PublicationItem"
import { SortsPanel } from "@/components/SortsPanel"
import { Autocomplete } from "@/components/ui/Autocomplete"
import { Button } from "@/components/ui/Button"
import { Tabs } from "@/components/ui/Tabs"
import { API_URLS } from "@/constants/api"
import { CategoryIcon } from "@/icons/CategoryIcon"
import { CheckboxIcon } from "@/icons/CheckboxIcon"
import { CrossIcon } from "@/icons/CrossIcon"
import { SearchIcon } from "@/icons/SearchIcon"
import { SortsIcon } from "@/icons/SortsIcon"
import { addPublicationGoodsQueryKey } from "@/settings/addPublicationGoods"
import {
  ITEM_SOURCE,
  type ItemSource,
  type PublicationGoodsItemTypes,
  type PublicationGoodsResponseTypes,
  publicationGoodsResponseSchema,
} from "@/types/addPublicationGoods.schema"
import { BREAKPOINT_NAME, type BreakpointName } from "@/types/breakpointTypes"
import { buildQueryString } from "@/utils/buildQueryString"
import { calculateSelectedFiltersCount } from "@/utils/calculateSelectedFiltersCount"
import { request } from "@/utils/request"

interface AddPublicationChooseGoodsProps {
  selectedGoods: PublicationGoodsItemTypes[]
  onSelectedGoodsChange: (goods: PublicationGoodsItemTypes[]) => void
}

const TAB_ID = {
  sp: "sp",
  all: "all",
  bought: "bought",
  user: "user",
} as const

type TabId = (typeof TAB_ID)[keyof typeof TAB_ID]

interface SortTypes {
  value: string
  text: string
  sortType: "asc" | "desc" | ""
}

const categoryFiltersSettings: FiltersTypes[] = [
  {
    label: "Категории",
    name: "category",
    filterType: "checkbox",
    options: [
      { label: "Одежда", value: "clothes" },
      { label: "Обувь", value: "shoes" },
      { label: "Аксессуары", value: "accessories" },
      { label: "Спорт", value: "sport" },
    ],
  },
]

const filtersBreakpoints: Record<BreakpointName, number> = {
  [BREAKPOINT_NAME.MOBILE]: 1,
  [BREAKPOINT_NAME.TABLET]: 2,
  [BREAKPOINT_NAME.DESKTOP]: 3,
  [BREAKPOINT_NAME.FULLHD]: 4,
}

const sourceClassMap: Record<NonNullable<ItemSource>, string> = {
  [ITEM_SOURCE.sp]: "publication-item--dark",
  [ITEM_SOURCE.bought]: "publication-item--green",
  [ITEM_SOURCE.user]: "publication-item--dark",
  [ITEM_SOURCE.external]: "publication-item--grey",
}

const getItemClass = (source: ItemSource | undefined) =>
  source ? sourceClassMap[source] : "publication-item--dark"

const getItemDescr = (source: ItemSource | undefined, brand?: string) => {
  if (source === ITEM_SOURCE.bought) {
    return (
      <span className="add-publication__content-results-list-item-bought">
        Этот товар вы купили <CheckboxIcon />
      </span>
    )
  }
  if (source === ITEM_SOURCE.external) {
    return (
      <span className="add-publication__content-results-list-item-subtitle">
        Товар с другого сайта
      </span>
    )
  }
  return (
    <>
      <span className="add-publication__content-results-list-item-subtitle">Магазин</span> {brand}
    </>
  )
}

const FilterActions = ({
  tabId,
  onSearchChange,
  sort,
  isOpenSortsPanel,
  onSortClick,
  isOpenFiltersPanel,
  onCategoryClick,
  selectedFiltersCount,
}: {
  tabId: TabId
  onSearchChange: (val: string) => void
  sort: SortTypes
  isOpenSortsPanel: boolean
  onSortClick: () => void
  isOpenFiltersPanel: boolean
  onCategoryClick: () => void
  selectedFiltersCount: number
}) => (
  <div className="add-publication__content-filters filter-actions">
    <div className="add-publication__content-filters-input">
      <Autocomplete
        id={`search-${tabId}`}
        name={`search-${tabId}`}
        placeholder="Название товара"
        prefixNode={<SearchIcon />}
        inputClassName="autocomplete__input input--color-grey"
        onInputChange={onSearchChange}
        onSelect={(val) => val === "" && onSearchChange("")}
      />
    </div>

    <Button
      className={clsx(
        "add-publication__content-filters-sort filter-actions__sorts btn--outlined btn--color-grey",
        { "btn--active": sort.value, active: isOpenSortsPanel },
      )}
      onClick={onSortClick}
    >
      <span className="filter-actions__text">{sort.value ? sort.text : "Сортировка"}</span>
      <SortsIcon className="filter-actions__icon filter-actions__icon--common" />
      <CrossIcon className="filter-actions__icon filter-actions__icon--cross" />
    </Button>

    <Button
      className={clsx(
        "add-publication__content-filters-categories filter-actions__categories btn--outlined btn--color-grey",
        { "btn--active": selectedFiltersCount, active: isOpenFiltersPanel },
      )}
      onClick={onCategoryClick}
    >
      <span className="filter-actions__text">Категории</span>
      <span className="filter-actions__icon">
        <CategoryIcon className="filter-actions__icon filter-actions__icon--common" />
        <CrossIcon className="filter-actions__icon filter-actions__icon--cross" />
      </span>
      <span className="add-publication__actions-filters-count filter-actions__filters-count">
        {selectedFiltersCount || ""}
      </span>
    </Button>
  </div>
)

const TabContent = ({
  tabId,
  selectedGoods,
  onToggleItem,
}: {
  tabId: TabId
  selectedGoods: PublicationGoodsItemTypes[]
  onToggleItem: (item: PublicationGoodsItemTypes) => void
}) => {
  const [search, setSearch] = useState("")

  const [sort, setSort] = useState<SortTypes>({ value: "", text: "Сортировка", sortType: "" })
  const [isOpenSortsPanel, setIsOpenSortsPanel] = useState(false)

  const [filters, setFilters] = useState<Record<string, string | string[] | [number, number]>>({})
  const [temporaryFilters, setTemporaryFilters] = useState<
    Record<string, string | string[] | [number, number]>
  >({})
  const [isOpenFiltersPanel, setIsOpenFiltersPanel] = useState(false)

  const selectedFiltersCount = calculateSelectedFiltersCount(filters)

  const { data, isFetching } = useQuery<PublicationGoodsResponseTypes>({
    queryKey: [addPublicationGoodsQueryKey, tabId, search, sort.value, JSON.stringify(filters)],
    queryFn: async () => {
      const params = buildQueryString({
        tab: tabId,
        ...(search ? { search } : {}),
        ...(sort.value ? { sort: sort.value } : {}),
        ...(filters as Record<string, string | string[]>),
      })
      return request<PublicationGoodsResponseTypes>(`${API_URLS.publicationGoods}${params}`, {
        schema: publicationGoodsResponseSchema,
      })
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const items: PublicationGoodsItemTypes[] = data?.data ?? []
  const isEmpty = !isFetching && items.length === 0

  return (
    <>
      <h4 className="add-publication__contents-title">Выберите товары</h4>

      <div className="add-publication__content">
        <FilterActions
          tabId={tabId}
          onSearchChange={setSearch}
          sort={sort}
          isOpenSortsPanel={isOpenSortsPanel}
          onSortClick={() => setIsOpenSortsPanel((prev) => !prev)}
          isOpenFiltersPanel={isOpenFiltersPanel}
          onCategoryClick={() => setIsOpenFiltersPanel((prev) => !prev)}
          selectedFiltersCount={selectedFiltersCount}
        />

        <SortsPanel
          isOpen={isOpenSortsPanel}
          selectedSort={sort}
          onClose={() => setIsOpenSortsPanel(false)}
          onSortChange={({ value, text, sortType }) => {
            setSort({ value, text, sortType })
            setIsOpenSortsPanel(false)
          }}
        />

        <FiltersPanel
          isOpen={isOpenFiltersPanel}
          filters={categoryFiltersSettings}
          temporaryFilters={temporaryFilters}
          breakpointsSettings={filtersBreakpoints}
          setTemporaryFilters={setTemporaryFilters}
          onClose={() => setIsOpenFiltersPanel(false)}
          onFiltersChange={setFilters}
        />

        <div className="add-publication__content-results">
          <div className="add-publication__content-results-title">Результаты поиска</div>

          {isFetching && <Loading />}

          {isEmpty && (
            <p className="add-publication__content-empty-text">
              Сейчас здесь ничего нет. Но, как только вы начнете вводить название товара в поле
              выше, — появятся товары, соответствующие запросу :)
            </p>
          )}

          {!isFetching && items.length > 0 && (
            <ul className="add-publication__content-results-list">
              {items.map((item) => {
                const isSelected = selectedGoods.some((g) => g.id === item.id)
                return (
                  <li
                    key={item.id}
                    className={clsx("add-publication__content-results-list-item", {
                      active: isSelected,
                    })}
                    onClick={() => onToggleItem(item)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onToggleItem(item)}
                  >
                    <PublicationItem
                      className={clsx(getItemClass(item.source), {
                        "publication-item--selected": isSelected,
                      })}
                      img={item.img}
                      title={item.title}
                      price={item.price}
                      currency={item.currency}
                      descr={getItemDescr(item.source, item.brand)}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

/** AddPublicationChooseGoods - первый шаг (добавление товаров) */
export const AddPublicationChooseGoods = ({
  selectedGoods,
  onSelectedGoodsChange,
}: AddPublicationChooseGoodsProps) => {
  const handleToggleItem = (item: PublicationGoodsItemTypes) => {
    if (selectedGoods.some((g) => g.id === item.id)) {
      onSelectedGoodsChange(selectedGoods.filter((g) => g.id !== item.id))
    } else {
      onSelectedGoodsChange([...selectedGoods, item])
    }
  }

  const tabs = [
    {
      name: TAB_ID.sp,
      label: "Товары из СП",
      content: (
        <TabContent
          tabId={TAB_ID.sp}
          selectedGoods={selectedGoods}
          onToggleItem={handleToggleItem}
        />
      ),
    },
    {
      name: TAB_ID.all,
      label: "Все товары",
      content: (
        <TabContent
          tabId={TAB_ID.all}
          selectedGoods={selectedGoods}
          onToggleItem={handleToggleItem}
        />
      ),
    },
    {
      name: TAB_ID.bought,
      label: "Купленные вами",
      content: (
        <TabContent
          tabId={TAB_ID.bought}
          selectedGoods={selectedGoods}
          onToggleItem={handleToggleItem}
        />
      ),
    },
    {
      name: TAB_ID.user,
      label: "Пользовательские",
      content: (
        <TabContent
          tabId={TAB_ID.user}
          selectedGoods={selectedGoods}
          onToggleItem={handleToggleItem}
        />
      ),
    },
  ]

  return (
    <Tabs
      className="add-publication__tabs tabs--split"
      contentsClassName="add-publication__contents"
      tabs={tabs}
      initialActiveTab={TAB_ID.all}
      hasSwiper
    />
  )
}
