export const DELIVERY_METHOD = {
  COURIER: "courier",
  PICKUP: "pickup",
} as const

export type DeliveryMethod = (typeof DELIVERY_METHOD)[keyof typeof DELIVERY_METHOD]
