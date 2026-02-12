export const AUTH_STATUS = {
  UNKNOWN: 0,
  AUTHORIZED: 1,
  NOTAUTHORIZED: 2,
} as const

export type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS]
