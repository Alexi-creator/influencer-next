/**
 * API Route для комментариев (ТОЛЬКО ДЛЯ РАЗРАБОТКИ)
 *
 * ⚠️ Это моковый API для тестирования без бэкенда.
 */

import { NextResponse } from "next/server"

import type { CommentsTypes } from "@/types/comments"

const getCommentsData = (): CommentsTypes => ({
  totalCount: 4,
  comments: [
    {
      id: 1,
      authorName: "Юлия М.",
      authorAvatar: "/images/user-julia.jpg",
      createdAt: "18 апреля 2021 в 10:53",
      text: "в целом выглядит норм, но быстро будешь пачкаться и ходить как свинка. есть другие варианты по цвету или теперь в тренде только белый?",
      likes: 0,
      replies: [
        {
          id: 2,
          authorName: "Олеся Смирнова",
          authorAvatar: "/images/logo-user-sm.jpg",
          createdAt: "18 апреля 2021 в 10:53",
          text: "Юлия, вариантов много, просто эта публикация посвящена именно белому цвету. Посмотрите например вот эти варианты. Еще можете на меня подписаться, я каждую неделю выкладываю публикации с новыми цветами и новым стилем.",
          likes: 3,
          replyTo: "Юлия М.",
          replies: [
            {
              id: 3,
              authorName: "Юлия М.",
              authorAvatar: "/images/user-julia.jpg",
              createdAt: "18 апреля 2021 в 10:53",
              text: "ок, спасибо за ссылки. сейчас гляну",
              likes: 1,
              replyTo: "Олеся Смирнова",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      authorName: "Екатерина Добрынина",
      authorAvatar: "/images/user-ekaterina.jpg",
      createdAt: "18 апреля 2021 в 11:57",
      text: "А мне очень понравилась подборка для образа, просто бомба!",
      likes: 978,
    },
  ],
})

export async function GET() {
  return NextResponse.json(
    {
      data: {
        data: getCommentsData(),
      },
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  )
}
