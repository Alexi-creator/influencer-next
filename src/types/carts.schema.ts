import { z } from "zod/v4"
import { SP_STATUS } from "./spStatusTypes"

export const goodsSchema = z.object({
  id: z.number(),
  imgHref: z.string(),
  brand: z.string(),
  description: z.string(),
  isDisabled: z.boolean(),
  isSp: z.boolean(),
  isSelected: z.boolean(),
  amount: z.number(),
  size: z.string(),
  discountPercent: z.number(),
  oldSum: z.string(),
  newSum: z.string(),
  pricingByQuantity: z.record(z.string(), z.string()).optional(),
})

export const cartSchema = z.object({
  id: z.number(),
  isSp: z.boolean(),
  title: z.string(),
  soldSum: z.string(),
  allSum: z.string(),
  spStatus: z.enum([SP_STATUS.ACTIVE, SP_STATUS.HAPPENED, SP_STATUS.NOT_HAPPENED]),
  progress: z.string(),
  date: z.string(),
  time: z.string(),
  storeName: z.string(),
  storeLogoHref: z.string().optional(),
  canCreateSp: z.boolean().optional(),
  canUpdateStore: z.boolean().optional(),
  isAllSelected: z.boolean(),
  goods: z.array(goodsSchema),
})

export const cartsBodySchema = z.array(cartSchema)

export const cartsResponseSchema = z.object({
  data: z.object({
    data: cartsBodySchema,
  }),
})

export type GoodsTypes = z.infer<typeof goodsSchema>
export type CartTypes = z.infer<typeof cartSchema>
export type CartsDataTypes = z.infer<typeof cartsResponseSchema>
