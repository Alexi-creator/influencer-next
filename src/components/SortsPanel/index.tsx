"use client"

import clsx from "clsx"

import { Radio } from "@/components/ui/Radio"

import { CrossIcon } from "@/icons/CrossIcon"
import { DownIcon } from "@/icons/DownIcon"
import { TopIcon } from "@/icons/TopIcon"

import "./styles.scss"

interface SortTypes {
  text: string
  value: string
  sortType: "asc" | "desc" | ""
}

interface SortsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  options?: SortTypes[]
  selectedSort?: SortTypes | null
  onClose: () => void
  onSortChange?: ({
    name,
    value,
    text,
    sortType,
    event,
  }: {
    name: string
    value: string
    text: string
    sortType: "asc" | "desc" | ""
    event: React.ChangeEvent<HTMLInputElement>
  }) => void
}

const baseOptions: SortTypes[] = [
  { value: "popular-asc", text: "По популярности", sortType: "asc" },
  { value: "rate-asc", text: "По рейтингу", sortType: "asc" },
  { value: "cost-asc", text: "По стоимости", sortType: "asc" },
  { value: "name-asc", text: "По названию", sortType: "asc" },
  { value: "popular-desc", text: "По популярности", sortType: "desc" },
  { value: "rate-desc", text: "По рейтингу", sortType: "desc" },
  { value: "cost-desc", text: "По стоимости", sortType: "desc" },
  { value: "name-desc", text: "По названию", sortType: "desc" },
]

export const SortsPanel = ({ isOpen = false, options = [], selectedSort, className, onClose = () => {}, onSortChange = () => {} }: SortsPanelProps) => {
  return (
    <div
      className={clsx("sorting", className, {
        active: isOpen,
      })}
    >
      <div className="sorting__title" onClick={onClose}>
        Сортировка
        <div className="sorting__cross">
          <CrossIcon />
        </div>
      </div>

      {(options.length > 0 ? options : baseOptions).map((sort) => (
        <div key={sort.value} className={clsx("sorting__btn", `sorting__btn--${sort.value}`)}>
          <Radio
            className="radio--btn"
            name="sorting"
            value={sort.value}
            checked={sort.value === selectedSort?.value}
            onCheckedChange={(name, value, e) => onSortChange({ name, value, text: sort.text, sortType: sort.sortType, event: e })}
          >
            <span className="btn btn--color-white">
              <span className="sorting__btn-text">{sort.text}</span>
              {sort.sortType === "asc" ? <TopIcon /> : <DownIcon />}
            </span>
          </Radio>
        </div>
      ))}
    </div>
  )
}
