import { FiltersTypes } from "@/components/FiltersPanel"

import { API_URLS } from "@/constants/api"
import { BreakpointName } from "@/types/breakpointTypes"

export const resourceUrl = API_URLS.shop.tff

export const filtersSettings: FiltersTypes[] = [
  {
    label: "Прайс",
    name: "price",
    filterType: "rangeSlider",
    options: {
      initialMin: 1000,
      initialMax: 20000,
      min: 0,
      max: 100000,
      currencySymbol: "₽", // TODO вынести валюты и применять в зависимости от языка или данных с бэка?
      step: 1000,
    }
  },
  {
    label: "Специальные предложение",
    name: "special",
    filterType: "checkbox",
    options: [
      { value: "specials36", label: "Test For Free" },
      { value: "specials38", label: "Совместная Покупка" },
      { value: "specials40", label: "Благотворительная покупка" },
      { value: "specials42", label: "Акция “2 по цене 1”" }
    ]
  },
  ...[0, 1, 2, 3, 4, 5].map<FiltersTypes>(i => ({
    label: `Размер${i}`,
    name: `sizes${i}`,
    filterType: "checkbox",
    options: [
      { value: `${i}size36`, label: "36" },
      { value: `${i}size38`, label: "38" },
      { value: `${i}size40`, label: "40" },
      { value: `${i}size42`, label: "42" }
    ]
  })),
]

export const filtersBreakpoints = {
  [BreakpointName.MOBILE]: 1,
  [BreakpointName.TABLET]: 2,
  [BreakpointName.DESKTOP]: 3,
  [BreakpointName.FULLHD]: 5,
}
