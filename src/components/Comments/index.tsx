"use client"

import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import Image from "next/image"
import { useCallback, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Login } from "@/components/Login"
import { Loading } from "@/components/layout/Loading"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { useUpdateComment } from "@/hooks/comments/useUpdateComment"
import { FavoriteIcon } from "@/icons/FavoriteIcon"
import { UserCommentsIcon } from "@/icons/UserCommentsIcon"
import { AuthContext } from "@/providers/AuthProvider"
import { GlobalModalContext } from "@/providers/GlobalModalProvider"
import { authStatuses } from "@/types/authTypes"
import type {
  CommentReplyTypes,
  CommentsDataTypes,
  CommentsTypes,
  CommentTypes,
} from "@/types/comments"
import { request } from "@/utils/request"
import "./styles.scss"

interface CommentsProps {
  initialData?: CommentsTypes
  resourceUrl?: string
  queryKey?: string
  clientRevalidateTime?: number
  refetchIntervalInBackground?: boolean
  refetchOnWindowFocus?: boolean
}
interface CommentFormData {
  comment: string
}

interface ReplyFormData {
  reply: string
}

interface CommentItemProps {
  onLike: (id: number) => void
  activeReplyId: number | null
  onReplyToggle: (id: number) => void
  onReplySubmit: (commentId: number, authorName: string, text: string) => void
}

// Форма ответа на комментарий
const ReplyForm = ({
  commentId,
  authorName,
  onSubmit,
}: {
  commentId: number
  authorName: string
  onSubmit: (commentId: number, authorName: string, text: string) => void
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<ReplyFormData>({
    mode: "onChange",
    defaultValues: { reply: "" },
  })

  const handleReplySubmit = (data: ReplyFormData) => {
    onSubmit(commentId, authorName, data.reply)
    reset()
  }

  return (
    <form className="comments__item-answer-new" onSubmit={handleSubmit(handleReplySubmit)}>
      <div className="comments__item-answer-new-logo">
        <Image src="/images/avatar.jpg" alt="user-logo" width={40} height={40} />
      </div>
      <div className="comments__item-answer-new-input-wrapper">
        <Textarea
          placeholder="Введите текст"
          className="comments__item-answer-new-input"
          {...register("reply", {
            required: true,
            minLength: 2,
          })}
        />
      </div>
      <Button
        type="submit"
        className="btn--color-primary-light comments__item-answer-new-btn"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Отправка..." : "Отправить"}
      </Button>
    </form>
  )
}

// Рекурсивный компонент для отображения комментария с ответами
const CommentItem = ({
  id,
  authorName,
  authorAvatar,
  createdAt,
  text,
  likes,
  isLiked,
  replyTo,
  replies,
  onLike,
  activeReplyId,
  onReplyToggle,
  onReplySubmit,
}: (CommentTypes | CommentReplyTypes) & CommentItemProps) => (
  <div className="comments__item">
    <div className="comments__item-wrapper">
      <div className="comments__item-time">{createdAt}</div>
      <div className="comments__item-avatar">
        <Image
          className="comments__item-avatar-img"
          src={authorAvatar}
          alt={authorName}
          width={40}
          height={40}
        />
      </div>
      <div className="comments__item-title">
        <div className="comments__item-title-name">{authorName}</div>
        {replyTo && <div className="comments__item-title-descr">в ответ {replyTo}</div>}
      </div>
      <div className="comments__item-text">{text}</div>
      <div className="comments__item-actions">
        <Button
          className={clsx("btn--none", "comments__item-actions-like", {
            "comments__item-actions-like--favorite": isLiked,
          })}
          onClick={() => onLike(id)}
        >
          <FavoriteIcon className="comments__item-actions-svg" />
        </Button>
        <div className="comments__item-actions-count">{likes}</div>
        <Button className="btn--none comments__item-actions-btn" onClick={() => onReplyToggle(id)}>
          Ответить
        </Button>
      </div>
      <div className="comments__item-line" />
    </div>

    {activeReplyId === id && (
      <div className="comments__item-answer-wrapper">
        <ReplyForm commentId={id} authorName={authorName} onSubmit={onReplySubmit} />
      </div>
    )}

    {replies && replies.length > 0 && (
      <div className="comments__item-answer-wrapper">
        {replies.map((reply) => (
          <CommentItem
            key={reply.id}
            {...reply}
            onLike={onLike}
            activeReplyId={activeReplyId}
            onReplyToggle={onReplyToggle}
            onReplySubmit={onReplySubmit}
          />
        ))}
      </div>
    )}
  </div>
)

/**
 * Comments - компонент комментариев
 */
export const Comments = ({
  initialData,
  resourceUrl = "",
  queryKey,
  clientRevalidateTime,
  refetchIntervalInBackground = false,
  refetchOnWindowFocus = false,
}: CommentsProps) => {
  // TODO Рабить файл на компоненты
  const { setConfigModal } = useContext(GlobalModalContext)
  const { authStatus: _authStatus } = useContext(AuthContext)

  // const isAuth = authStatus === authStatuses.AUTHORIZED
  // TODO расскоментировать строку выше когда будет релиз
  const isAuth = true

  const { data, isFetching, isLoading } = useQuery<CommentsTypes>({
    queryKey: [queryKey],
    queryFn: async (): Promise<CommentsTypes> => {
      const res = await request<CommentsDataTypes>(resourceUrl)

      return res.data.data
    },
    initialData,
    refetchInterval: clientRevalidateTime, // Автообновление каждые clientRevalidateTime милисекунд
    refetchIntervalInBackground, // Не обновлять если вкладка неактивна
    refetchOnWindowFocus, // Не запрашивать при фокусе
  })

  const { totalCount, comments } = data ?? { totalCount: 0, comments: [] }
  const { toggleLike, isPending } = useUpdateComment(resourceUrl, queryKey ?? "")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CommentFormData>({
    mode: "onChange",
    defaultValues: {
      comment: "",
    },
  })

  const [activeReplyId, setActiveReplyId] = useState<number | null>(null)

  const handleReplyToggle = useCallback((id: number) => {
    setActiveReplyId((prev) => (prev === id ? null : id))
  }, [])

  const handleReplySubmit = useCallback((commentId: number, authorName: string, text: string) => {
    // TODO: Отправка ответа на сервер
    console.log("Ответ на комментарий:", { commentId, authorName, text })
    setActiveReplyId(null)
  }, [])

  const onSubmit = async (data: CommentFormData) => {
    // TODO: Отправка комментария на сервер
    console.log("Отправка комментария:", data)
    reset()
  }

  return (
    <div className="comments">
      {(isPending || isFetching || isLoading) && <Loading />}

      <div className="comments__title">
        Комментарии <span className="comments__title-count">{totalCount}</span>
      </div>

      <form className="comments__comment" onSubmit={handleSubmit(onSubmit)}>
        <div className="comments__comment-avatar">
          {isAuth ? (
            <Image
              className="comments__comment-avatar-img"
              src="/images/avatar.jpg" // TODO брать из контекста данных пользователя
              alt="user-avatar"
              width={40}
              height={40}
            />
          ) : (
            <UserCommentsIcon className="comments__comment-avatar-default" />
          )}
        </div>

        {isAuth ? (
          <div className="comments__comment-input">
            <Input
              className={clsx("input--color-grey", {
                error: errors.comment?.message,
              })}
              placeholder="Ваш комментарий тут"
              errorText={errors.comment?.message}
              {...register("comment", {
                required: "Введите комментарий",
                minLength: { value: 5, message: "Минимум 5 символов" },
              })}
            />
          </div>
        ) : (
          <div className="comments__comment-input">
            <Input
              className="input--color-grey input--disabled"
              placeholder="в свой аккаунт"
              disabled
              prefixNode={
                <Button
                  onClick={() => {
                    setConfigModal((prev) => ({
                      ...prev,
                      isOpen: true,
                      content: <Login />,
                    }))
                  }}
                  className="btn--none"
                >
                  Войдите
                </Button>
              }
            />
          </div>
        )}

        <Button
          type="submit"
          className={clsx("comments__comment-submit", {
            "btn--color-primary-light": isAuth,
          })}
          disabled={!isAuth || !isValid || isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </Button>
      </form>

      <div className="comments__list">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            {...comment}
            onLike={toggleLike}
            activeReplyId={activeReplyId}
            onReplyToggle={handleReplyToggle}
            onReplySubmit={handleReplySubmit}
          />
        ))}
      </div>
    </div>
  )
}
