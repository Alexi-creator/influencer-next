import { useMutation, useQueryClient } from "@tanstack/react-query"
import { HttpMethods } from "@/constants/httpMethods"
import type {
  CommentReplyTypes,
  CommentsDataTypes,
  CommentsTypes,
  CommentTypes,
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
    mutationFn: async (updatedData: CommentsTypes) => {
      const res = await request<CommentsDataTypes>(resourceUrl, {
        method: HttpMethods.PUT,
        body: JSON.stringify(updatedData),
      })

      return res.data.data
    },

    onMutate: async (updatedData: CommentsTypes) => {
      await queryClient.cancelQueries({ queryKey: [queryKey] })

      const previousComments = queryClient.getQueryData<CommentsTypes>([queryKey])

      // Оптимистичное обновление — ставим подготовленные данные
      queryClient.setQueryData<CommentsTypes>([queryKey], updatedData)

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
    const currentData = queryClient.getQueryData<CommentsTypes>([queryKey])
    if (!currentData) return

    // Подготавливаем данные на клиенте
    const updatedData: CommentsTypes = {
      ...currentData,
      comments: toggleLikeInComments(currentData.comments, commentId),
    }

    mutation.mutate(updatedData)
  }

  return {
    isPending: mutation.isPending,
    toggleLike,
  }
}
