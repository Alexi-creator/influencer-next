"use client"

import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

import { Input } from "@/components/ui/Input"

import "./styles.scss"

interface OptionProps {
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
  initialValue?: OptionProps
  initialOptions?: OptionProps[]
  renderOption?: ((
    option: OptionProps,
    isValue: boolean,
    onClick: (event: React.MouseEvent) => void
  ) => React.ReactNode) | null
  onSelect?: (val: string) => void
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
  initialValue = { value: "", label: "" },
  initialOptions = [],
  renderOption = null,
  onSelect,
}: AutocompleteProps) => {
  const ref = useRef<HTMLInputElement>(null)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [userInputValue, setUserInputValue] = useState<string>("")
  const [selectedOption, setSelectedOption] = useState<OptionProps>(initialValue)
  const [options, setOptions] = useState<OptionProps[]>(initialOptions)

  const searchMatch = (userInput: string) => {
    const match = new RegExp(userInput, "i")
    const matches: OptionProps[] = options.filter(option => match.test(option?.label))

    setOptions(matches)
  }

  const handleInputClick = (): void => {
    setIsOpen(prev => !prev)
  }

  const handleSelect = (option: OptionProps): void => {
    setSelectedOption(option)
    setUserInputValue(option.label)
    onSelect?.(option.value)
  }

  const handleBlur = (): void => {
    // onSelect?.(selectedOption.value)

    setTimeout(() => {
      setIsOpen(false)
    }, 100)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setUserInputValue(newValue)

    if (newValue === "") {
      setSelectedOption({ value: "", label: "" })
      setOptions(initialOptions)

      return
    }

    searchMatch(newValue)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleSearch = () => {
      onSelect?.("")
    }

    el.addEventListener("search", handleSearch)

    return () => el.removeEventListener("search", handleSearch)
  }, [onSelect])

  return (
    <div className={clsx(`autocomplete ${className}`, {
      "active": isOpen,
    })} id={id}>
      <Input
        ref={ref}
        name={name}
        placeholder={placeholder}
        type="search"
        value={userInputValue}
        prefixNode={prefixNode}
        suffixNode={suffixNode}
        // className="autocomplete__input"
        className={clsx("autocomplete__input", inputClassName)}
        // classNameInput={inputClassName}
        classNamePrefix={prefixClass}
        classNameSuffix={suffixClass}
        onClick={handleInputClick}
        onChange={() => {}}
        onInput={handleInput}
        onBlur={handleBlur}
      />

      <input name={name} value={selectedOption.value} hidden readOnly />

      <div className="autocomplete__body">
        <div className="autocomplete__body-title">
          Результаты поиска
        </div>

        {renderOption && (
          <div className="autocomplete__options">
            {options.map(opt => renderOption(
              opt,
              opt.value === selectedOption.value,
              () => handleSelect({ value: opt.value, label: opt.label }),
            ))}
          </div>
        )}

        {!renderOption && (
          <ul className="autocomplete__options">
            {options.map(({ label, value }) => (
              <li
                key={value}
                className={clsx(
                  "autocomplete__options-item", {
                    "active": selectedOption.value === value,
                  }
                )}
                data-value={value}
                onClick={() => handleSelect({ value, label })}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
