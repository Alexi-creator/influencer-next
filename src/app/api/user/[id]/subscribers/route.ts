import { NextResponse } from "next/server"

import type { UsersResponseTypes } from "@/types/users.schema"

const subscribersStubs: UsersResponseTypes = {
  data: [
    {
      id: 1,
      imgSrc: "/images/shop-preview.jpg",
      name: "Елена Брадиславская",
      desc: "Ревизор обуви и одежды. Более 10 лет в сфере блогинга.",
      scoresInst: 9801,
      scoresUsers: 140892,
      isSubscribed: true,
    },
    {
      id: 2,
      imgSrc: "/images/logo-rocher.png",
      name: "YVES ROCHER",
      desc: "Увлеченные и ответственные Создатели Растительной Косметики с 1959 года.",
      scoresInst: 1089,
      scoresUsers: 172,
    },
    {
      id: 3,
      imgSrc: "/images/logo-cat.png",
      name: "Кот",
      desc: "Нахожу и испытываю наилучшие продукты для Вашей шерстки. Подписывайтесь.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: true,
    },
    {
      id: 4,
      imgSrc: "/images/shop-preview.jpg",
      name: "Мария Иванова",
      desc: "Lifestyle блогер. Делюсь лучшими находками в моде и красоте.",
      scoresInst: 5200,
      scoresUsers: 83400,
    },
  ],
  count: 4,
}

export async function GET() {
  return NextResponse.json(subscribersStubs)
}
