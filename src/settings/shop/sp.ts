import type { FiltersTypes } from "@/components/FiltersPanel"

import { API_URLS } from "@/constants/api"
import { BREAKPOINT_NAME } from "@/types/breakpointTypes"

export const resourceUrl = API_URLS.shop.sp

export const filtersSettings: FiltersTypes[] = [
  {
    label: "Фильтр",
    name: "filter_users",
    filterType: "checkbox",
    options: [
      { label: "все", value: "all" },
      { label: "FronTTrend SeTTer", value: "fts" },
      { label: "мои подписки", value: "subscribes" },
      { label: "мои подписчики", value: "followers" },
    ],
  },
]

export const filtersBreakpoints = {
  [BREAKPOINT_NAME.MOBILE]: 1,
  [BREAKPOINT_NAME.TABLET]: 2,
  [BREAKPOINT_NAME.DESKTOP]: 3,
  [BREAKPOINT_NAME.FULLHD]: 5,
}
