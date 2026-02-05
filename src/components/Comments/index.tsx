"use client"

import Image from "next/image"
import { useContext } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { FavoriteIcon } from "@/icons/FavoriteIcon"
import { UserCommentsIcon } from "@/icons/UserCommentsIcon"
import { AuthContext } from "@/providers/AuthProvider"
import { GlobalModalContext } from "@/providers/GlobalModalProvider"
import { authStatuses } from "@/types/authTypes"
import type { CommentReplyTypes, CommentsTypes, CommentTypes } from "@/types/comments"
import { Login } from "../Login"
import "./styles.scss"

interface CommentsProps extends CommentsTypes {
  isAuthenticated?: boolean
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
export const Comments = ({ totalCount, comments }: CommentsProps) => {
  const { setConfigModal } = useContext(GlobalModalContext)
  const { authStatus } = useContext(AuthContext)

  const isAuth = authStatus === authStatuses.AUTHORIZED
  // TODO расскоментировать строку выше когда будет релиз
  // const isAuth = true

  return (
    <div className="comments">
      <div className="comments__title">
        Комментарии <span className="comments__title-count">{totalCount}</span>
      </div>

      <form className="comments__comment">
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
          <div className="comments__comment-input comments__comment-input--auth">
            <Input
              name="comment-main"
              type="text"
              placeholder="Ваш комментарий тут"
              className="input-text--color-grey"
            />
          </div>
        ) : (
          <div className="comments__comment-input comments__comment-input--no-auth">
            <Input
              name="comment-disabled"
              type="text"
              placeholder="в свой аккаунт"
              className="input-text--color-grey input-text--disabled"
              disabled
              prefixNode={
                <Button
                  onClick={() =>
                    setConfigModal((prev) => ({
                      ...prev,
                      isOpen: true,
                      content: <Login />,
                    }))
                  }
                  className="btn--none"
                >
                  Войдите
                </Button>
              }
            />
          </div>
        )}

        {isAuth ? (
          <Button
            type="submit"
            className="btn--color-primary-light comments__comment-submit comments__comment-submit--auth"
          >
            Отправить
          </Button>
        ) : (
          <Button
            type="button"
            className="comments__comment-submit comments__comment-submit--no-auth"
            disabled
          >
            Отправить
          </Button>
        )}
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
