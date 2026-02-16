import { z } from "zod/v4"

const JP_STATUS = ["progress", "done", "cancel"] as const

export const jpDetailsAuthorSchema = z.object({
  name: z.string(),
  image: z.string(),
  subscribersNumber: z.string(),
})

export const jpDetailsShopSchema = z.object({
  name: z.string(),
  image: z.string(),
})

export const jpDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.enum(JP_STATUS).optional(),
  discountSize: z.number(),
  discountSum: z.string(),
  oldSum: z.string(),
  allSum: z.string(),
  isActiveSP: z.number(),
  activityDateDay: z.string(),
  activityDateTime: z.string(),
  shop: jpDetailsShopSchema,
  author: jpDetailsAuthorSchema,
  spDateCreation: z.string(),
  describeSp: z.string(),
})

export const jpDetailsResponseSchema = z.object({
  data: z.object({
    jpDetails: jpDetailsSchema,
  }),
})

export type JpDetailsAuthorTypes = z.infer<typeof jpDetailsAuthorSchema>
export type JpDetailsShopTypes = z.infer<typeof jpDetailsShopSchema>
export type JpDetailsTypes = z.infer<typeof jpDetailsSchema>
export type JpDetailsResponseTypes = z.infer<typeof jpDetailsResponseSchema>
