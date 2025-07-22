import { useState } from "react"

import clsx from "clsx"
import Nouislider from "nouislider-react"
import "nouislider/distribute/nouislider.css"

import "./styles.scss"

type minMax = "min" | "max"
interface RangeSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  min: number
  max: number
  step?: number
  minName?: string
  maxName?: string
  placeholderMin?: string
  placeholderMax?: string
  currencySymbol?: string
  initialMin: number
  initialMax: number
  onChange?: (values: [number, number]) => void
}

export const RangeSlider = ({
  min,
  max,
  step = 1000,
  minName = "rangemin",
  maxName = "rangemax",
  placeholderMin = "от",
  placeholderMax = "до",
  currencySymbol = "₽",
  initialMin,
  initialMax,
  className,
  onChange,
  ...props
}: RangeSliderProps) => {
  const [values, setValues] = useState<[number, number]>([initialMin, initialMax])
  const [inputValues, setInputValues] = useState<[number, number]>([initialMin, initialMax])

  const handleSliderChange = (renderedValues: (string)[]) => {
    const [start, end] = renderedValues.map(v => Math.round(Number(v))) as [number, number]
    setValues([start, end])
    setInputValues([start, end])
    onChange?.([start, end])
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: minMax) => {
    const newVal = Number(event.target.value.replace(/\D/g, ""))

    if (type === "min") {
      setInputValues(prev => [newVal, prev[1]])
    } else {
      setInputValues(prev => [prev[0], newVal])
    }
  }

  const handleBlur = (type: minMax) => {
    let [start, end] = inputValues

    if (type === "min") {
      if (start < min || start > end) {
        start = Math.min(Math.max(min, start), end)
      }
    } else {
      if (end > max || end < start) {
        end = Math.max(Math.min(max, end), start)
      }
    }

    setInputValues([start, end])
    setValues([start, end])
  }

  return (
    <div className={clsx("range", className)} {...props}>
      <Nouislider
        range={{ min, max }}
        start={values}
        connect
        step={step}
        onChange={handleSliderChange}
      />

      <div className="range__inputs">
        <div className="range__min">
          <div>от</div>
          <div className="range__input-wrapper">
            <input
              className="range__input range__input-min input-text input-text--color-grey"
              name={minName}
              value={inputValues[0]}
              placeholder={placeholderMin}
              onChange={val => handleInputChange(val, "min")}
              onBlur={() => handleBlur("min")}
            />
          </div>
          <div className="range__currency">{currencySymbol}</div>
        </div>
        <div className="range__max">
          <div>до</div>
          <div className="range__input-wrapper">
            <input
              className="range__input range__input-max input-text input-text--color-grey"
              name={maxName}
              value={inputValues[1]}
              placeholder={placeholderMax}
              onChange={val => handleInputChange(val, "max")}
              onBlur={() => handleBlur("max")}
            />
          </div>
          <div className="range__currency">{currencySymbol}</div>
        </div>
      </div>
    </div>
  )
}
