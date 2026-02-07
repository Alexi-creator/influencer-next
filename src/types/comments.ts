// Типы для ответа на комментарий
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

// Типы для комментария
export interface CommentTypes {
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

// Типы для списка комментариев
export interface CommentsTypes {
  totalCount: number
  comments: CommentTypes[]
}

// Типы для ответа API
export interface CommentsDataTypes {
  data: {
    data: CommentsTypes
  }
}

