"use client"

import React, { useState, useRef } from "react"
import clsx from "clsx"
import "./styles.scss"

import ArrowIcon from "../../../icons/arrow.svg"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"

interface OptionsProps {
  value: string
  label: string
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
  const [selectedOption, setSelectedOption] = useState<OptionsProps>({ value: initialValue, label: initialLabel })

  const selectRef = useRef<HTMLDivElement>(null)

  const handleHeaderClick = (): void => {
    setIsOpen(prev => !prev)
  }

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget as HTMLLIElement
    const newValue = target.dataset.value

    const selected = options.find(option => option.value === newValue)

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
        "active": isOpen,
      })}
      ref={selectRef}
    >
      <div className="select__header"
        tabIndex={0}
        onClick={handleHeaderClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleHeaderClick()
          }
        }}
      >
        <div className="select__title">{selectedOption.label}</div>
        <div className={clsx("select__icon", {
          "active": isOpen,
        })}>
          <ArrowIcon />
        </div>
      </div>

      <ul className={clsx("select__options", {
        "active": isOpen,
      })}>
        {options.map(({ value, label }) => (
          <li
            key={value}
            className={clsx("select__options-item", {
              "active": value === selectedOption.value,
            })}
            data-value={value}
            role="button"
            tabIndex={0}
            onClick={handleItemClick}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleItemClick(e as unknown as React.MouseEvent<HTMLLIElement>)
              }
            }}
          >
            {label}
          </li>
        ))}
      </ul>

      <input name={name} value={selectedOption.value} hidden readOnly />
    </div>
  )
}
