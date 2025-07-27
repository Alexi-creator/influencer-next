import { ReactNode } from "react"
import clsx from "clsx"

import { CheckboxIcon } from "@/icons/CheckboxIcon"

import "./styles.scss"

interface CheckboxProps {
  value: string
  name: string
  disabled?: boolean
  className?: string
  labelClassName?: string
  children: ReactNode
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({
  value = "",
  name = "checkbox",
  disabled = false,
  className = "",
  labelClassName = "",
  children,
  onChange,
  ...props
}: CheckboxProps) => {

  return (
    <label className={clsx("checkbox", className)} >
      <input
        value={value}
        name={name}
        disabled={disabled}
        type="checkbox"
        onChange={onChange}
        {...props}
      />
      <span className="checkbox__checkmark">
        <CheckboxIcon />
      </span>
      <span className={`checkbox__label ${labelClassName}`}>
        {children}
      </span>
    </label>
  )
}
