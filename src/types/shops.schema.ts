import { z } from "zod/v4"

const categorySchema = z.object({
  text: z.string(),
  href: z.string(),
})

export const shopsItemSchema = z.object({
  id: z.number(),
  logoImgHref: z.string(),
  name: z.string(),
  itemImages: z.array(z.string()),
  benefits: z.array(z.string()),
  categories: z.array(categorySchema),
  isSubscribed: z.boolean(),
})

export const shopSchema = z.object({
  id: z.number(),
  previewImgHref: z.string(),
  goodsImgHref: z.array(z.string()),
  title: z.string(),
  benefits: z.array(z.string()),
  about: z.string(),
  categories: z.array(categorySchema),
  shops: z.array(shopsItemSchema),
})

export const shopsResponseSchema = z.object({
  data: z.object({
    data: z.array(shopSchema),
    count: z.number(),
  }),
})

export type ShopsTypes = z.infer<typeof shopsItemSchema>
export type ShopTypes = z.infer<typeof shopSchema>
export type DataTypes = z.infer<typeof shopsResponseSchema>
