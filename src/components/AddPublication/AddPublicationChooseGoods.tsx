"use client"

import { useQuery } from "@tanstack/react-query"
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
  publicationGoodsResponseSchema,
  type ItemSource,
  type PublicationGoodsItemTypes,
  type PublicationGoodsResponseTypes,
} from "@/types/addPublicationGoods.schema"
import { BREAKPOINT_NAME, type BreakpointName } from "@/types/breakpointTypes"
import { buildQueryString } from "@/utils/buildQueryString"
import { calculateSelectedFiltersCount } from "@/utils/calculateSelectedFiltersCount"
import { request } from "@/utils/request"

interface AddPublicationChooseGoodsProps {
  selectedGoods: string[]
  onSelectedGoodsChange: (goods: string[]) => void
}

type TabId = "sp" | "all" | "bought" | "user"

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
  sp: "publication-item--dark",
  bought: "publication-item--green",
  user: "publication-item--dark",
  external: "publication-item--grey",
}

const getItemClass = (source: ItemSource | undefined) =>
  source ? sourceClassMap[source] : "publication-item--dark"

const getItemDescr = (source: ItemSource | undefined, brand?: string) => {
  if (source === "bought") {
    return (
      <span className="add-publication__content-results-list-item-bought">
        Этот товар вы купили <CheckboxIcon />
      </span>
    )
  }
  if (source === "external") {
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
      className={`add-publication__content-filters-sort filter-actions__sorts btn--outlined btn--color-grey${sort.value ? " btn--active" : ""}${isOpenSortsPanel ? " active" : ""}`}
      onClick={onSortClick}
    >
      <span className="filter-actions__text">{sort.value ? sort.text : "Сортировка"}</span>
      <SortsIcon className="filter-actions__icon filter-actions__icon--common" />
      <CrossIcon className="filter-actions__icon filter-actions__icon--cross" />
    </Button>

    <Button
      className={`add-publication__content-filters-categories filter-actions__categories btn--outlined btn--color-grey${selectedFiltersCount ? " btn--active" : ""}${isOpenFiltersPanel ? " active" : ""}`}
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
  selectedGoods: string[]
  onToggleItem: (id: string) => void
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
    queryKey: [
      addPublicationGoodsQueryKey,
      tabId,
      search,
      sort.value,
      JSON.stringify(filters),
    ],
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
              {items.map((item) => (
                <li key={item.id} className="add-publication__content-results-list-item">
                  <PublicationItem
                    className={[
                      getItemClass(item.source),
                      selectedGoods.includes(item.id) ? "publication-item--selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    img={item.img}
                    title={item.title}
                    price={item.price}
                    currency={item.currency}
                    descr={getItemDescr(item.source, item.brand)}
                  />

                  <button
                    type="button"
                    className="add-publication__content-results-list-item-clear btn"
                    onClick={() => onToggleItem(item.id)}
                  >
                    <CrossIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export const AddPublicationChooseGoods = ({
  selectedGoods,
  onSelectedGoodsChange,
}: AddPublicationChooseGoodsProps) => {
  const handleToggleItem = (id: string) => {
    if (selectedGoods.includes(id)) {
      onSelectedGoodsChange(selectedGoods.filter((g) => g !== id))
    } else {
      onSelectedGoodsChange([...selectedGoods, id])
    }
  }

  const tabs = [
    {
      name: "sp",
      label: "Товары из СП",
      content: (
        <TabContent tabId="sp" selectedGoods={selectedGoods} onToggleItem={handleToggleItem} />
      ),
    },
    {
      name: "all",
      label: "Все товары",
      content: (
        <TabContent tabId="all" selectedGoods={selectedGoods} onToggleItem={handleToggleItem} />
      ),
    },
    {
      name: "bought",
      label: "Купленные вами",
      content: (
        <TabContent tabId="bought" selectedGoods={selectedGoods} onToggleItem={handleToggleItem} />
      ),
    },
    {
      name: "user",
      label: "Пользовательские",
      content: (
        <TabContent tabId="user" selectedGoods={selectedGoods} onToggleItem={handleToggleItem} />
      ),
    },
  ]

  return (
    <Tabs
      className="add-publication__tabs tabs--split"
      contentsClassName="add-publication__contents"
      tabs={tabs}
      initialActiveTab="all"
      hasSwiper
    />
  )
}
