import clsx from "clsx"

import { CheckboxIcon } from "@/icons/CheckboxIcon"

import "./styles.scss"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  labelClassName?: string
  isUncontrolled?: boolean
  onCheckedChange?: (name: string, value: string[], event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({
  value = "",
  name = "checkbox",
  disabled = false,
  checked = false,
  defaultChecked = false,
  isUncontrolled = false,
  className = "",
  labelClassName = "",
  children,
  onCheckedChange,
  ...props
}: CheckboxProps) => {

  return (
    <label className={clsx("checkbox", className)} >
      <input
        value={value}
        name={name}
        type="checkbox"
        disabled={disabled}
        {...(isUncontrolled ? { defaultChecked } : { checked })}
        onChange={(event) => onCheckedChange?.(name, [value], event)}
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
