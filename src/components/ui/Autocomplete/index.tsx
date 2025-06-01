"use client"

import { useState } from "react"

import { Input } from "../Input"
import "./styles.scss"

interface OptionsProps {
  value: string
  label: string
  subLabel?: string
  href?: string
  imgSrc?: string
  className?: string
}

interface AutocompleteProps {
  id: string
  name: string
  placeholder?: string
  className?: string
  prefixNode?: React.ReactNode
  suffixNode?: React.ReactNode
  prefixClass?: string
  suffixClass?: string
  inputClassName?: string
  value?: string
  options?: OptionsProps[]
  renderOptions?: ((option: OptionsProps[]) => React.ReactNode) | null
}

export const Autocomplete = ({
  id = "",
  name = "",
  className = "",
  placeholder = "",
  prefixNode = null,
  suffixNode = null,
  prefixClass = "",
  suffixClass = "",
  inputClassName = "",
  value = "",
  options = [],
  renderOptions = null,
}: AutocompleteProps) => {
  const [isOpen, setIsOpan] = useState<boolean>(false)

  return (
    <div className={`autocomplete ${className}`} id={id}>
      <Input
        name={name}
        placeholder={placeholder}
        type="search"
        prefixNode={prefixNode}
        suffixNode={suffixNode}
        className={inputClassName}
        classNamePrefix={prefixClass}
        classNameSuffix={suffixClass}
      />

      <input name={name} value={value} hidden readOnly />

      <div className="autocomplete__body">
        <div className="autocomplete__body-title">
          Результаты поиска
        </div>

        {renderOptions ? renderOptions(options): (
          <ul className="autocomplete__options">
            {options.map(({ label, value }) => (
              <li key={value}>{label}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
