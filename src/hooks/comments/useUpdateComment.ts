import { useMutation, useQueryClient } from "@tanstack/react-query"
import { revalidateComments } from "@/app/actions/comments/revalidate"
import { HttpMethods } from "@/constants/httpMethods"
import type {
  CommentReplyTypes,
  CommentsDataTypes,
  CommentsTypes,
  CommentTypes,
  UpdateCommentPayload,
} from "@/types/comments"
import { request } from "@/utils/request"

// Рекурсивный toggle лайка по id
const toggleLikeInComments = (
  comments: (CommentTypes | CommentReplyTypes)[],
  commentId: number,
): (CommentTypes | CommentReplyTypes)[] =>
  comments.map((comment) => {
    if (comment.id === commentId) {
      return {
        ...comment,
        isLiked: !comment.isLiked,
        likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
      }
    }
    if (comment.replies?.length) {
      return { ...comment, replies: toggleLikeInComments(comment.replies, commentId) }
    }
    return comment
  })

export const useUpdateComment = (resourceUrl: string, queryKey: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (payload: UpdateCommentPayload) => {
      const res = await request<CommentsDataTypes>(resourceUrl, {
        method: HttpMethods.PUT,
        body: JSON.stringify(payload),
      })

      return res.data.data
    },

    onMutate: async (payload: UpdateCommentPayload) => {
      await queryClient.cancelQueries({ queryKey: [queryKey] })

      const previousComments = queryClient.getQueryData<CommentsTypes>([queryKey])

      if (previousComments && payload.type === "toggle-like") {
        const { commentId } = payload.payload

        queryClient.setQueryData<CommentsTypes>([queryKey], {
          ...previousComments,
          comments: toggleLikeInComments(previousComments.comments, commentId),
        })
      }

      return { previousComments }
    },

    onSuccess: (updatedComments) => {
      queryClient.setQueryData<CommentsTypes>([queryKey], updatedComments)

      // TODO после подключения реальной апишки нужно расскомментировать
      // revalidateComments()
    },

    onError: (_error, _payload, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData<CommentsTypes>([queryKey], context.previousComments)
      }
    },
  })

  const toggleLike = (commentId: number) => {
    const payload: UpdateCommentPayload = {
      type: "toggle-like",
      payload: { commentId },
    }
    mutation.mutate(payload)
  }

  return {
    isPending: mutation.isPending,
    toggleLike,
  }
}
