"use client"

import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import Image from "next/image"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Login } from "@/components/Login"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
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
  initialData: CommentsTypes
  resourceUrl?: string
  queryKey?: string
  clientRevalidateTime?: number
  refetchIntervalInBackground?: boolean
  refetchOnMount?: boolean
  refetchOnWindowFocus?: boolean
}
interface CommentFormData {
  comment: string
}

// Рекурсивный компонент для отображения комментария с ответами
const CommentItem = ({
  authorName,
  authorAvatar,
  createdAt,
  text,
  likes,
  replyTo,
  replies,
}: CommentTypes | CommentReplyTypes) => (
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
        <button type="button" className="comments__item-actions-like">
          <FavoriteIcon className="comments__item-actions-svg" />
        </button>
        <div className="comments__item-actions-count">{likes}</div>
        <Button className="btn--none comments__item-actions-btn">Ответить</Button>
      </div>
      <div className="comments__item-line" />
    </div>

    {replies && replies.length > 0 && (
      <div className="comments__item-answer-wrapper">
        {replies.map((reply) => (
          <CommentItem key={reply.id} {...reply} />
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
  refetchOnMount = false,
  refetchOnWindowFocus = false,
}: CommentsProps) => {
  const { setConfigModal } = useContext(GlobalModalContext)
  const { authStatus: _authStatus } = useContext(AuthContext)

  // const isAuth = authStatus === authStatuses.AUTHORIZED
  // TODO расскоментировать строку выше когда будет релиз
  const isAuth = true

  const { data, isFetching: _isFetching } = useQuery<CommentsTypes>({
    queryKey: [queryKey],
    queryFn: async (): Promise<CommentsTypes> => {
      const res = await request<CommentsDataTypes>(resourceUrl)

      return res.data.data
    },
    initialData,
    refetchInterval: clientRevalidateTime, // Автообновление каждые clientRevalidateTime милисекунд
    refetchIntervalInBackground, // Не обновлять если вкладка неактивна
    refetchOnMount, // Не запрашивать при монтировании (есть initialData с сервера)
    refetchOnWindowFocus, // Не запрашивать при фокусе
  })

  const { totalCount, comments } = data

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

  const onSubmit = async (data: CommentFormData) => {
    // TODO: Отправка комментария на сервер
    console.log("Отправка комментария:", data)
    reset()
  }

  return (
    <div className="comments">
      <div className="comments__title">
        Комментарии <span className="comments__title-count">{totalCount}</span>
      </div>

      <form className="comments__comment" onSubmit={handleSubmit(onSubmit)}>
        <div className="comments__comment-avatar">
          {isAuth ? (
            <Image
              className="comments__comment-avatar-img"
              src="/images/avatar.jpg"
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
          <CommentItem key={comment.id} {...comment} />
        ))}
      </div>

      {/* Template для нового ответа (можно использовать при реализации функционала) */}
      {/* <template id="answer-template">
        <div className="comments__item-answer-new">
          <div className="comments__item-answer-new-logo">
            <Image src="/images/avatar.jpg" alt="user-logo" width={40} height={40} />
          </div>
          <div className="comments__item-answer-new-input-wrapper">
            <Textarea
              name="answer"
              placeholder="Введите текст"
              className="comments__item-answer-new-input"
            />
          </div>
          <Button className="btn--color-primary-light comments__item-answer-new-btn">
            Отправить
          </Button>
        </div>
      </template> */}
    </div>
  )
}
