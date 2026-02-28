"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { PublicationItem } from "@/components/PublicationItem"
import { Autocomplete } from "@/components/ui/Autocomplete"
import { Loading } from "@/components/layout/Loading"
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
  type ItemSource,
  type PublicationGoodsItemTypes,
  type PublicationGoodsResponseTypes,
  publicationGoodsResponseSchema,
} from "@/types/addPublicationGoods.schema"
import { buildQueryString } from "@/utils/buildQueryString"
import { request } from "@/utils/request"

interface AddPublicationChooseGoodsProps {
  selectedGoods: string[]
  onSelectedGoodsChange: (goods: string[]) => void
}

type TabId = "sp" | "all" | "bought" | "user"

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
}: {
  tabId: TabId
  onSearchChange: (val: string) => void
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

    <Button className="add-publication__content-filters-sort filter-actions__sorts btn--outlined btn--color-grey">
      <span className="filter-actions__text">Сортировка</span>
      <SortsIcon className="filter-actions__icon filter-actions__icon--common" />
      <CrossIcon className="filter-actions__icon filter-actions__icon--cross" />
    </Button>

    <Button className="add-publication__content-filters-categories filter-actions__categories btn--outlined btn--color-grey">
      <span className="filter-actions__text">Категории</span>
      <span className="filter-actions__icon">
        <CategoryIcon className="filter-actions__icon filter-actions__icon--common" />
        <CrossIcon className="filter-actions__icon filter-actions__icon--cross" />
      </span>
      <span className="add-publication__actions-filters-count filter-actions__filters-count" />
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

  const { data, isFetching } = useQuery<PublicationGoodsResponseTypes>({
    queryKey: [addPublicationGoodsQueryKey, tabId, search],
    queryFn: async () => {
      const params = buildQueryString({ tab: tabId, ...(search ? { search } : {}) })
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
        <FilterActions tabId={tabId} onSearchChange={setSearch} />

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
