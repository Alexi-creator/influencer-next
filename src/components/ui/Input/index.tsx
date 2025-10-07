import { forwardRef } from "react"
import "./styles.scss"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixNode?: React.ReactNode
  suffixNode?: React.ReactNode
  // classNameInput?: string
  classNamePrefix?: string
  classNameSuffix?: string
}

// export const Input = ({
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      placeholder = "",
      type = "text",
      prefixNode,
      suffixNode,
      className,
      classNamePrefix = "",
      classNameSuffix = "",
      multiple = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="input">
        <label className={`input__label ${className}`} data-id={`parent-${name}`}>
          {prefixNode && (
            <div className={`input__prefix ${classNamePrefix}`}>
              {prefixNode}
            </div>
          )}

          <input
            ref={ref}
            id={name}
            name={name}
            // className={`input__input ${classNameInput}`}
            className={"input__input"}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            multiple={multiple}
            {...props}
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
)

Input.displayName = "Input"
