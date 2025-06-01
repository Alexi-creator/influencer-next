import React, { InputHTMLAttributes } from "react"
import "./styles.scss"


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefixNode?: React.ReactNode
  suffixNode?: React.ReactNode
  classNamePrefix?: string
  classNameSuffix?: string
}

export const Input = ({
  name,
  placeholder = "",
  type = "text",
  prefixNode,
  suffixNode,
  className = "",
  classNamePrefix = "",
  classNameSuffix = "",
  multiple = false,
  disabled = false,
}: InputProps) => {
  return (
    <div className="input">
      <label className={`input__label ${className}`} data-id={`parent-${name}`}>
        {prefixNode && (
          <div className={`input__prefix ${classNamePrefix}`}>
            {prefixNode}
          </div>
        )}
        <input
          className="input__input"
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          multiple={multiple}
        />
        {suffixNode && (
          <div className={`input__suffix ${classNameSuffix}`}>
            {suffixNode}
          </div>
        )}
      </label>
      <p className="input__error" data-id={`error-${name}`} />
    </div>
  )
}
