"use client"

import { useContext } from "react"

import clsx from "clsx"

import { GlobalModalContext } from "@/providers/GlobalModalProvider"

// import { Radio } from "@/components/ui/Radio"
import { ClearFiltersModal } from "@/components/ClearFiltersModal"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import { Collapse } from "@/components/ui/Collapse"

import { CrossIcon } from "@/icons/CrossIcon"
import { TrashIcon } from "@/icons/TrashIcon"

import { calculateSelectedFiltersCount } from "@/utils/calculateSelectedFiltersCount"

import "./styles.scss"

export interface filtersTypes {
  label: string
  name: string
  filterType: "checkbox" | "radio" | "select" | "autocomplete" // TODO сделать константы
  className?: string
  options: {
    label: string
    value: string
  }[]
}

interface FiltersPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  filters: filtersTypes[]
  temporaryFilters: Record<string, string | string[]>
  setTemporaryFilters: React.Dispatch<React.SetStateAction<Record<string, string | string[]>>>
  onClose: () => void
  onFiltersChange: (newFilters: Record<string, string | string[]>) => void
}

/**
  FiltersPanel - панель фильтров
*/

export const FiltersPanel = ({
  isOpen = false,
  filters = [],
  className,
  temporaryFilters,
  setTemporaryFilters,
  onClose = () => {},
  onFiltersChange,
}: FiltersPanelProps) => {
  const globalModalContext = useContext(GlobalModalContext)
  const { setConfigModal } = globalModalContext

  const handleFilterChange = (name: string, value: string[], event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected: boolean = event.target.checked

    // TODO вынести для разных фильтров свои проверки
    if (Array.isArray(value)) {
      setTemporaryFilters(prev => ({
        ...prev,
        [name]: isSelected
          ? [...new Set([...(prev[name] || []), ...value])]
          : [...(prev[name] || [])].filter(val => val !== value[0]),
      }))
    }
  }

  const handleCloseModal = () => setConfigModal(prev => ({ ...prev, isOpen: false }))

  const resetFilters = () => {
    setTemporaryFilters({})
    onFiltersChange({})
  }

  const openResetModal = () => {
    setConfigModal(prev => ({
      ...prev,
      isOpen: true,
      isCloseIcon: false,
      content: <ClearFiltersModal onCloseModal={handleCloseModal} onReset={resetFilters} />,
    }))
  }

  const selectedFiltersCount = calculateSelectedFiltersCount(temporaryFilters)

  return (
    <div className={clsx("filters", className, {
      "active": isOpen,
    })}>
      <div className="filters__title" onClick={onClose}>
        Фильтры
        <div className="filters__title-cross">
          <CrossIcon />
        </div>
      </div>

      <div className={clsx("filters__items", {})}>
        {filters.map(filter => (
          <div key={filter.name} className={clsx("filters__item", filter.className)}>
            <Collapse title={filter.label}>
              <div className="filters__collapse filters__collapse-grid">
                {filter.options.map(opt => (
                  <Checkbox
                    key={opt.value}
                    name={filter.name}
                    value={opt.value}
                    checked={temporaryFilters[filter.name]?.includes(opt.value)}
                    onCheckedChange={handleFilterChange}
                  >
                    {opt.label}
                  </Checkbox>
                ))}
              </div>
            </Collapse>
          </div>
        ))}
      </div>

      <div className="filters__actions">
        <Button className="filters__actions-clear">
          <TrashIcon className="filters__actions-clear-icon" />
          <span className="filters__actions-clear-text" onClick={openResetModal}>Очистить все фильтры</span>
        </Button>

        <Button onClick={() => {
          onFiltersChange(temporaryFilters)
          onClose()
        }}
        >
          Применить
          <span>{Boolean(selectedFiltersCount) && `(${selectedFiltersCount})`}</span>
        </Button>
      </div>
    </div>
  )
}
