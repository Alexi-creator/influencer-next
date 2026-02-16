import type { FiltersTypes } from "@/components/FiltersPanel"

import { API_URLS } from "@/constants/api"
import { BREAKPOINT_NAME } from "@/types/breakpointTypes"

export const resourceUrl = API_URLS.shop.goods

export const filtersSettings: FiltersTypes[] = [
  {
    label: "Прайс",
    name: "price",
    filterType: "rangeSlider",
    options: {
      initialMin: 200000,
      initialMax: 500000,
      min: 0,
      max: 1000000,
      currencySymbol: "₽", // TODO вынести валюты и применять в зависимости от языка или данных с бэка?
      step: 1000,
    },
  },
  {
    label: "Специальные предложение",
    name: "special",
    filterType: "checkbox",
    options: [
      { value: "specials36", label: "Test For Free" },
      { value: "specials38", label: "Совместная Покупка" },
      { value: "specials40", label: "Благотворительная покупка" },
      { value: "specials42", label: "Акция “2 по цене 1”" },
    ],
  },
  ...[0, 1, 2, 3, 4, 5].map<FiltersTypes>((i) => ({
    label: `Размер${i}`,
    name: `sizes${i}`,
    filterType: "checkbox",
    options: [
      { value: `${i}size36`, label: "36" },
      { value: `${i}size38`, label: "38" },
      { value: `${i}size40`, label: "40" },
      { value: `${i}size42`, label: "42" },
    ],
  })),
]

export const filtersBreakpoints = {
  [BREAKPOINT_NAME.MOBILE]: 1,
  [BREAKPOINT_NAME.TABLET]: 2,
  [BREAKPOINT_NAME.DESKTOP]: 3,
  [BREAKPOINT_NAME.FULLHD]: 5,
}
