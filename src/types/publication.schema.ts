import { z } from "zod/v4"

export const publicationItemSchema = z.object({
  id: z.number(),
  img: z.string(),
  title: z.string(),
  price: z.string(),
  currency: z.string(),
  descr: z.string().optional(),
})

export const galleryItemSchema = z.object({
  id: z.number(),
  imgHref: z.string(),
  moreCount: z.number().optional(),
})

export const publicationSchema = z.object({
  id: z.number(),
  authorName: z.string(),
  authorAvatar: z.string(),
  createdAt: z.string(),
  title: z.string(),
  views: z.number(),
  description: z.string(),
  totalPrice: z.string(),
  likes: z.number(),
  hashtags: z.array(z.string()),
  authorActivity: z.string(),
  publicationItems: z.array(publicationItemSchema),
  galleryItems: z.array(galleryItemSchema),
  swiperImages: z.array(z.string()),
})

export const publicationResponseSchema = z.object({
  data: z.object({
    data: publicationSchema,
  }),
})

export type PublicationItemTypes = z.infer<typeof publicationItemSchema>
export type GalleryItemTypes = z.infer<typeof galleryItemSchema>
export type PublicationTypes = z.infer<typeof publicationSchema>
export type PublicationDataTypes = z.infer<typeof publicationResponseSchema>
