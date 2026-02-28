"use client"

import { PublicationItem } from "@/components/PublicationItem"
import { Button } from "@/components/ui/Button"
import { CheckboxIcon } from "@/icons/CheckboxIcon"
import { CrossIcon } from "@/icons/CrossIcon"
import {
  ITEM_SOURCE,
  type ItemSource,
  type PublicationGoodsItemTypes,
} from "@/types/addPublicationGoods.schema"

interface AddPublicationSelectedGoodsProps {
  selectedGoods: PublicationGoodsItemTypes[]
  onClearAll: () => void
  onClose: () => void
  onToggleItem: (item: PublicationGoodsItemTypes) => void
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

export const AddPublicationSelectedGoods = ({
  selectedGoods,
  onClearAll,
  onClose,
  onToggleItem,
}: AddPublicationSelectedGoodsProps) => {
  return (
    <div className="add-publication__selected-inner">
      <div className="add-publication__selected-title">Выбранные товары</div>

      <Button
        className="add-publication__selected-all-clear btn--text btn--none btn--color-grey"
        onClick={onClearAll}
      >
        Очистить выбранные
      </Button>

      <button className="add-publication__selected-close" type="button" onClick={onClose}>
        <CrossIcon />
      </button>

      <ul className="add-publication__selected-list add-publication__content-results-list">
        {selectedGoods.map((item) => (
          <li key={item.id} className="add-publication__content-results-list-item">
            <PublicationItem
              className={getItemClass(item.source)}
              img={item.img}
              title={item.title}
              price={item.price}
              currency={item.currency}
              descr={getItemDescr(item.source, item.brand)}
            />

            <Button
              className="add-publication__content-results-list-item-clear"
              onClick={(e) => {
                e.stopPropagation()
                onToggleItem(item)
              }}
            >
              <CrossIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
