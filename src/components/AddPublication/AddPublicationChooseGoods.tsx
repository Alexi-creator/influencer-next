"use client"

import { PublicationItem } from "@/components/PublicationItem"
import { Autocomplete } from "@/components/ui/Autocomplete"
import { Button } from "@/components/ui/Button"
import { Tabs } from "@/components/ui/Tabs"
import { CategoryIcon } from "@/icons/CategoryIcon"
import { CrossIcon } from "@/icons/CrossIcon"
import { SearchIcon } from "@/icons/SearchIcon"
import { SortsIcon } from "@/icons/SortsIcon"

interface AddPublicationChooseGoodsProps {
  selectedGoods: string[]
  onSelectedGoodsChange: (goods: string[]) => void
}

const mockItems = [
  {
    id: "1",
    img: "/images/product-img1.png",
    title: "Платье Gucci из новой коллекции",
    price: "36 000",
    currency: "₽",
    descr: "Платье вечернее, шёлк",
  },
  {
    id: "2",
    img: "/images/product-img2.png",
    title: "Сумка Louis Vuitton",
    price: "120 000",
    currency: "₽",
    descr: "Кожа, новая коллекция",
  },
  {
    id: "3",
    img: "/images/product-img3.png",
    title: "Туфли Jimmy Choo",
    price: "45 000",
    currency: "₽",
    descr: "Лакированная кожа",
  },
]

const FilterActions = ({ tabId }: { tabId: string }) => (
  <div className="add-publication__content-filters filter-actions">
    <div className="add-publication__content-filters-input">
      <Autocomplete
        id={`search-${tabId}`}
        name={`search-${tabId}`}
        placeholder="Название товара"
        prefixNode={<SearchIcon />}
        inputClassName="autocomplete__input input-text--color-grey"
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
  items,
  selectedGoods,
  onToggleItem,
}: {
  tabId: string
  items: typeof mockItems
  selectedGoods: string[]
  onToggleItem: (id: string) => void
}) => (
  <div className="add-publication__content">
    <FilterActions tabId={tabId} />

    <div className="add-publication__content-results">
      <div className="add-publication__content-results-title">Результаты поиска</div>

      {items.length === 0 && (
        <p className="add-publication__content-empty-text">
          Сейчас здесь ничего нет. Но, как только вы начнете вводить название товара в поле выше, —
          появятся товары, соответствующие запросу :)
        </p>
      )}

      {items.length > 0 && (
        <ul className="add-publication__content-results-list">
          {items.map((item) => (
            <li
              key={item.id}
              className="add-publication__content-results-list-item"
              data-id={item.id}
            >
              <PublicationItem
                className={selectedGoods.includes(item.id) ? "publication-item--selected" : ""}
                img={item.img}
                title={item.title}
                price={item.price}
                currency={item.currency}
                descr={item.descr}
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
)

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
        <TabContent
          tabId="sp"
          items={[]}
          selectedGoods={selectedGoods}
          onToggleItem={handleToggleItem}
        />
      ),
    },
    {
      name: "all",
      label: "Все товары",
      content: (
        <TabContent
          tabId="all"
          items={mockItems}
          selectedGoods={selectedGoods}
          onToggleItem={handleToggleItem}
        />
      ),
    },
    {
      name: "bought",
      label: "Купленные вами",
      content: (
        <TabContent
          tabId="bought"
          items={mockItems.slice(0, 2)}
          selectedGoods={selectedGoods}
          onToggleItem={handleToggleItem}
        />
      ),
    },
    {
      name: "user",
      label: "Пользовательские",
      content: (
        <TabContent
          tabId="user"
          items={mockItems.slice(0, 1)}
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
      initialActiveTab="all"
      hasSwiper
    >
      <h4 className="add-publication__contents-title">Выберите товары</h4>
    </Tabs>
  )
}
