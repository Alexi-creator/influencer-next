export const SP_STATUS = {
  ACTIVE: "active",
  HAPPENED: "happened",
  NOT_HAPPENED: "not-happened",
} as const

export type SpStatus = (typeof SP_STATUS)[keyof typeof SP_STATUS]
// Эквивалент: "active" | "happened" | "not-happened"
