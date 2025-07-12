import clsx from "clsx"
import Nouislider from "nouislider-react"
import "nouislider/distribute/nouislider.css"

import "./styles.scss"

interface RangeSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  minName?: string
  maxName?: string
  minValue?: string
  maxValue?: string
  min?: string
  max?: string
  currencySymbol?: string
  step?: number
}

export const RangeSlider = ({
  minName = "rangemin",
  maxName = "rangemax",
  minValue = "200000",
  maxValue = "500000",
  min = "50000",
  max = "1000000",
  currencySymbol = "₽",
  step = 1000,
  className,
  ...props
}: RangeSliderProps) => {


  return (
    <div className={clsx("range", className)} {...props}>
      <Nouislider
        range={{ min: 0, max: 100 }}
        start={[20, 80]}
        step={step}
        connect
      />

      <div className="range__inputs">
        <div className="range__min">
          <div>от</div>
          <div className="range__input-wrapper">
            <input
              className="range__input range__input-min input-text input-text--color-grey"
              name={minName}
              type="text"
              value={minValue}
              data-min={min}
              placeholder={min}
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
              type="text"
              value={maxValue}
              data-max={max}
              placeholder={max}
            />
          </div>
          <div className="range__currency">{currencySymbol}</div>
        </div>
      </div>
    </div>
  )
}
