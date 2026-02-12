export const ADDRESS_STATUS = {
  FULL: "FULL",
  HALF: "HALF",
  EMPTY: "EMPTY",
} as const

export type AddressStatus = (typeof ADDRESS_STATUS)[keyof typeof ADDRESS_STATUS]
