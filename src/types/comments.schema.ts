import { z } from "zod/v4"

export interface CommentReplyTypes {
  id: number
  authorName: string
  authorAvatar: string
  createdAt: string
  text: string
  likes: number
  isLiked: boolean
  replyTo?: string
  replies?: CommentReplyTypes[]
}

const commentReplySchema: z.ZodType<CommentReplyTypes> = z.object({
  id: z.number(),
  authorName: z.string(),
  authorAvatar: z.string(),
  createdAt: z.string(),
  text: z.string(),
  likes: z.number(),
  isLiked: z.boolean(),
  replyTo: z.string().optional(),
  replies: z.lazy(() => z.array(commentReplySchema)).optional(),
})

export const commentSchema = z.object({
  id: z.number(),
  authorName: z.string(),
  authorAvatar: z.string(),
  createdAt: z.string(),
  text: z.string(),
  likes: z.number(),
  isLiked: z.boolean(),
  replyTo: z.string().optional(),
  replies: z.array(commentReplySchema).optional(),
})

export const commentsBodySchema = z.object({
  totalCount: z.number(),
  comments: z.array(commentSchema),
})

export const commentsResponseSchema = z.object({
  data: z.object({
    data: commentsBodySchema,
  }),
})

export type CommentTypes = z.infer<typeof commentSchema>
export type CommentsTypes = z.infer<typeof commentsBodySchema>
export type CommentsDataTypes = z.infer<typeof commentsResponseSchema>
