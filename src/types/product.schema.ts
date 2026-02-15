import { z } from "zod/v4"

export const productBreadcrumbSchema = z.object({
  text: z.string(),
  href: z.string(),
})

export const productSchema = z.object({
  id: z.number(),
  images: z.array(z.string()),
  point: z.string(),
  deliveryPrice: z.string(),
  productDescription: z.string(),
  productName: z.string(),
  productShortDescription: z.string(),
  rating: z.number().int().min(0).max(5),
  likesScore: z.number(),
  postScore: z.number(),
  postLink: z.string(),
  sizeOptions: z.array(z.object({ value: z.string(), label: z.string(), stock: z.number() })),
  amountOptions: z.array(z.object({ value: z.string(), label: z.string() })),
  priceCrossed: z.string(),
  priceNew: z.string(),
  discountScore: z.number(),
  sellerName: z.string(),
  imgSeller: z.string(),
  isDiscount: z.boolean().optional(),
  discountExtra: z.number().optional(),
  discountExtraSum: z.string().optional(),
  spDiscountLinksFound: z.string().optional(),
  priceByAmount: z.record(z.string(), z.string()),
  productDetails: z.array(z.string()),
  breadcrumbs: z.array(productBreadcrumbSchema),
})

export const productResponseSchema = z.object({
  data: z.object({
    data: productSchema,
  }),
})

export type ProductBreadcrumb = z.infer<typeof productBreadcrumbSchema>
export type ProductTypes = z.infer<typeof productSchema>
export type ProductDataTypes = z.infer<typeof productResponseSchema>
