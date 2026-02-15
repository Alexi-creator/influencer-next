import { z } from "zod/v4"

export const postCardSchema = z.object({
  id: z.number(),
  imgSrc: z.string(),
  desc: z.string(),
  userName: z.string(),
  userLogoSrc: z.string(),
  rating: z.number(),
  scoresDiscus: z.number().optional(),
  scoresLikes: z.number().optional(),
  liked: z.boolean().optional(),
})

export const postCardResponseSchema = z.object({
  data: z.array(postCardSchema),
  count: z.number(),
})

export type PostCardTypes = z.infer<typeof postCardSchema>
export type PostCardResponseTypes = z.infer<typeof postCardResponseSchema>
