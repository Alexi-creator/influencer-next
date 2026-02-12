import { z } from "zod/v4"

export const userCardSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  imgSrc: z.string(),
  desc: z.string(),
  scoresInst: z.number(),
  scoresUsers: z.number(),
  isSubscribed: z.boolean().optional(),
})

export const usersResponseSchema = z.object({
  data: z.array(userCardSchema),
  count: z.number(),
})

export type UserCardTypes = z.infer<typeof userCardSchema>
export type UsersResponseTypes = z.infer<typeof usersResponseSchema>
