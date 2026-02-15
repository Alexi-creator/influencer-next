"use client"

import clsx from "clsx"
import type React from "react"
import { type ReactNode, useRef, useState } from "react"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"

import { ArrowIcon } from "@/icons/ArrowIcon"

import "./styles.scss"

interface OptionsProps {
  value: string
  label: string
  additionalLabel?: string | ReactNode
  color?: "red"
}

interface SelectProps {
  name: string
  className?: string
  initialValue?: string
  initialLabel?: string
  options?: OptionsProps[]
}

export const Select = ({
  name,
  className = "",
  initialValue = "",
  initialLabel = "",
  options = [],
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<OptionsProps>({
    value: initialValue,
    label: initialLabel,
  })

  const selectRef = useRef<HTMLDivElement>(null)

  const handleHeaderClick = (): void => {
    setIsOpen((prev) => !prev)
  }

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget as HTMLLIElement
    const newValue = target.dataset.value

    const selected = options.find((option) => option.value === newValue)

    if (selected) {
      setSelectedOption(selected)
      setIsOpen(false)
    }
  }

  const handleClickOutside = (event: Event): void => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useOnClickOutside(selectRef, handleClickOutside)

  return (
    <div
      id={name}
      className={clsx("select noselect", className, {
        active: isOpen,
      })}
      ref={selectRef}
    >
      <div
        className="select__header"
        role="combobox"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={handleHeaderClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleHeaderClick()
          }
        }}
      >
        <div className="select__title">
          {selectedOption.label}
          {
            <span
              className={clsx("select__options-item-descr", {
                "select__options-item-descr--red": selectedOption.color === "red",
              })}
            >
              {selectedOption.additionalLabel}
            </span>
          }
        </div>
        <div
          className={clsx("select__icon", {
            active: isOpen,
          })}
        >
          <ArrowIcon />
        </div>
      </div>

      <ul
        className={clsx("select__options", {
          active: isOpen,
        })}
      >
        {options.map(({ value, label, additionalLabel, color }) => (
          <li
            key={value}
            className={clsx("select__options-item", {
              active: value === selectedOption.value,
            })}
            tabIndex={isOpen ? 0 : -1}
            data-value={value}
            onClick={handleItemClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleItemClick(e as unknown as React.MouseEvent<HTMLLIElement>)
              }
            }}
          >
            {label}
            <span
              className={clsx("select__options-item-descr", {
                "select__options-item-descr--red": color === "red",
              })}
            >
              {additionalLabel}
            </span>
          </li>
        ))}
      </ul>

      <input name={name} value={selectedOption.value} hidden readOnly />
    </div>
  )
}
