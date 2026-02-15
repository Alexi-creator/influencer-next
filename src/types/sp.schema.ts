import { z } from "zod/v4"

const spSlideSchema = z.object({
  img1: z.string(),
  img2: z.string(),
  title: z.string(),
  priceOld: z.string(),
  priceNew: z.string(),
})

const SP_STATUS = ["processing", "ready", "disabled"] as const

export const spCardSchema = z.object({
  id: z.number(),
  shopBrandImgHref: z.string(),
  title: z.string(),
  shareLink: z.string(),
  progress: z.string(),
  status: z.enum(SP_STATUS),
  categories: z.string(),
  slides: z.array(spSlideSchema),
})

export const spResponseSchema = z.object({
  data: z.array(spCardSchema),
  count: z.number(),
})

export type SpSlideTypes = z.infer<typeof spSlideSchema>
export type SpCardTypes = z.infer<typeof spCardSchema>
export type SpResponseTypes = z.infer<typeof spResponseSchema>
