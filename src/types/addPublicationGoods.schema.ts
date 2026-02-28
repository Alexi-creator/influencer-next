import { z } from "zod/v4"

export const itemSourceSchema = z.enum(["sp", "bought", "user", "external"])

export const publicationGoodsItemSchema = z.object({
  id: z.string(),
  source: itemSourceSchema.optional(),
  img: z.string(),
  title: z.string(),
  price: z.string(),
  currency: z.string(),
  brand: z.string().optional(),
})

export const publicationGoodsResponseSchema = z.object({
  data: z.array(publicationGoodsItemSchema),
  count: z.number(),
})

export const ITEM_SOURCE = itemSourceSchema.enum

export type ItemSource = z.infer<typeof itemSourceSchema>
export type PublicationGoodsItemTypes = z.infer<typeof publicationGoodsItemSchema>
export type PublicationGoodsResponseTypes = z.infer<typeof publicationGoodsResponseSchema>
