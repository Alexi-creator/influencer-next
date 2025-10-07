import { FiltersTypes } from "@/components/FiltersPanel"

import { API_URLS } from "@/constants/api"
import { BreakpointName } from "@/types/breakpointTypes"

export const resourceUrl = API_URLS.users

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
  [BreakpointName.MOBILE]: 1,
  [BreakpointName.TABLET]: 2,
  [BreakpointName.DESKTOP]: 3,
  [BreakpointName.FULLHD]: 5,
}
