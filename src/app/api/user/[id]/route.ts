import { NextResponse } from "next/server"

import type { UserTypes } from "@/app/api/user/route"

const userStubs: UserTypes = {
  data: {
    preview: {
      name: "Олеся Смирнова",
      image: "/images/logo-user-sm.jpg",
      influencer: true,
      desc: "Привет! Я Олеся — fashion-блогер и стилист. Делюсь образами, нахожу лучшие вещи и помогаю собирать идеальные луки. Помогаю девушкам выглядеть стильно каждый день без лишних затрат.",
      postCount: 134,
      subCount: 4820,
    },
    user: {
      data: [],
      count: 0,
    },
  },
}

export async function GET() {
  return NextResponse.json(userStubs)
}
