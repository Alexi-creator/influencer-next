"use client"

import { useContext } from "react"

import clsx from "clsx"

import { GlobalModalContext } from "@/providers/GlobalModalProvider"

import { BreakpointName } from "@/types/breakpointTypes"

// import { Radio } from "@/components/ui/Radio"
import { Button } from "@/components/ui/Button"
import { ClearFiltersModal } from "@/components/ClearFiltersModal"
import { Checkbox } from "@/components/ui/Checkbox"
import { Collapse } from "@/components/ui/Collapse"
import { Masonry } from "@/components/Masonry"
import { RangeSlider } from "@/components/ui/RangeSlider"

import { CrossIcon } from "@/icons/CrossIcon"
import { TrashIcon } from "@/icons/TrashIcon"

import { calculateSelectedFiltersCount } from "@/utils/calculateSelectedFiltersCount"

import "./styles.scss"

type CheckboxOption = {
  label: string
  value: string
}

type RangeSliderOption = {
  initialMin: number
  initialMax: number
  min: number
  max: number
  currencySymbol: string
  step: number
}

export type FiltersTypes =
  {
    label: string
    name: string
    filterType: "checkbox" | "radio" | "select" | "autocomplete"
    className?: string
    options: CheckboxOption[]
  } |
  {
    label: string
    name: string
    filterType: "rangeSlider"
    className?: string
    options: RangeSliderOption
  }

interface FiltersPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  filters: FiltersTypes[]
  temporaryFilters: Record<string, string | string[] | [number, number]>
  breakpointsSettings: Record<BreakpointName, number>
  setTemporaryFilters: React.Dispatch<React.SetStateAction<Record<string, string | string[] | [number, number]>>>
  onClose: () => void
  onFiltersChange: (newFilters: Record<string, string | string[] | [number, number]>) => void
}

/**
  FiltersPanel - панель фильтров, выбор и применени фильтров.
*/
export const FiltersPanel = ({
  isOpen = false,
  filters = [],
  className,
  temporaryFilters,
  breakpointsSettings,
  setTemporaryFilters,
  onClose = () => {},
  onFiltersChange,
}: FiltersPanelProps) => {
  const globalModalContext = useContext(GlobalModalContext)
  const { setConfigModal } = globalModalContext

  const handleFilterChange = (filter: FiltersTypes, value: string[] | [number, number], event?: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = filter

    if (filter.filterType === "checkbox") {
      const isSelected: boolean | undefined = event?.target.checked

      setTemporaryFilters(prev => {
        const prevValues = (prev[name] as string[]) || []

        const newValues = isSelected
          ? [...new Set([...prevValues, ...(value as string[])])]
          : prevValues.filter(v => v !== (value as string[])[0])

        return { ...prev, [name]: newValues }
      })
    }

    if (filter.filterType === "rangeSlider") {
      setTemporaryFilters(prev => ({ ...prev, [name]: value }))
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
    onClose()
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
        <Masonry
          breakpointsSettings={breakpointsSettings}
        >
          {filters.map(filter => (
            <div key={filter.name} className={clsx("filters__item", filter.className)}>
              <Collapse title={filter.label}>
                <div className={clsx("filters__collapse", {
                  "filters__collapse-grid": filter.filterType === "checkbox",
                })}>
                  {filter.filterType === "checkbox" && filter.options.map((opt) => (
                    <Checkbox
                      key={opt.value}
                      name={filter.name}
                      value={opt.value}
                      checked={
                        Array.isArray(temporaryFilters[filter.name]) &&
                        (temporaryFilters[filter.name] as string[]).includes(opt.value)
                      }
                      onCheckedChange={(value: string[], event: React.ChangeEvent<HTMLInputElement>) => handleFilterChange(filter, value, event)}
                    >
                      {opt.label}
                    </Checkbox>
                  ))}

                  {filter.filterType === "rangeSlider" && (
                    <RangeSlider
                      {...filter.options}
                      minName={`${filter.name}_from`}
                      maxName={`${filter.name}_to`}
                      onChange={(args) => handleFilterChange(filter, args)}
                    />
                  )}
                </div>
              </Collapse>
            </div>
          ))}
        </Masonry>
      </div>

      <div className="filters__actions">
        <Button className="filters__actions-clear" onClick={openResetModal}>
          <TrashIcon className="filters__actions-clear-icon" />
          <span className="filters__actions-clear-text">Очистить все фильтры</span>
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
