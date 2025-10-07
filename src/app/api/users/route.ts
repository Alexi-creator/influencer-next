import { NextResponse } from "next/server"

import { UserCardTypes as UserTypes } from "@/types/userCardTypes"

export interface UserCardTypes {
  data: UserTypes[]
  count: number
}

const usersStubs: UserCardTypes = {
  data: [
    {
      id: 1,
      imgSrc: "/images/shop-preview.jpg",
      name: "Елена Брадиславская длинное имя",
      desc: "Ревизор обуви и одежды. Более 10 лет в сфере блогинга.",
      scoresInst: 9801,
      scoresUsers: 140892,
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
      desc: "Нахожу и испытываю  наилучшие продукты для Вашей шерстки. Подписывайтесь.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: true
    },
    {
      id: 4,
      imgSrc: "/images/logo-vtb.png",
      name: "Кот",
      desc: "Нахожу и испытываю  наилучшие продукты для Вашей шерстки. Подписывайтесь.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: false,
    },
    {
      id: 5,
      imgSrc: "/images/logo-vtb.png",
      name: "Кот",
      desc: "Нахожу и испытываю  наилучшие продукты для Вашей шерстки. Подписывайтесь.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: false,
    },
    {
      id: 6,
      imgSrc: "/images/logo-cat.png",
      name: "Кот",
      desc: "Нахожу и испытываю  наилучшие продукты для Вашей шерстки. Подписывайтесь.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: false,
    },
    {
      id: 7,
      imgSrc: "/images/logo-woman.png",
      name: "Елена Брадиславская",
      desc: "Ревизор обуви и одежды. Более 10 лет в сфере блогинга.",
      scoresInst: 9801,
      scoresUsers: 140892,
      isSubscribed: false,
    },
    {
      id: 8,
      imgSrc: "/images/logo-rocher.png",
      name: "YVES ROCHER",
      desc: "Увлеченные и ответственные Создатели Растительной Косметики с 1959 года.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: true
    },
    {
      id: 9,
      imgSrc: "/images/logo-rocher.png",
      name: "YVES ROCHER",
      desc: "Увлеченные и ответственные Создатели Растительной Косметики с 1959 года.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: false,
    },
    {
      id: 10,
      imgSrc: "/images/logo-woman.png",
      name: "Елена Брадиславская",
      desc: "Ревизор обуви и одежды. Более 10 лет в сфере блогинга.",
      scoresInst: 9801,
      scoresUsers: 140892,
      isSubscribed: true,
    },
    {
      id: 11,
      imgSrc: "/images/logo-vtb.png",
      name: "Кот",
      desc: "Нахожу и испытываю  наилучшие продукты для Вашей шерстки. Подписывайтесь.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: false,
    },
    {
      id: 12,
      imgSrc: "/images/logo-cat.png",
      name: "Кот",
      desc: "Нахожу и испытываю  наилучшие продукты для Вашей шерстки. Подписывайтесь.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: false,
    },
    {
      id: 13,
      imgSrc: "/images/logo-cat.png",
      name: "Кот",
      desc: "Нахожу и испытываю  наилучшие продукты для Вашей шерстки. Подписывайтесь.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: false,
    },
    {
      id: 14,
      imgSrc: "/images/logo-vtb.png",
      name: "Кот",
      desc: "Нахожу и испытываю  наилучшие продукты для Вашей шерстки. Подписывайтесь.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: false,
    },
    {
      id: 15,
      imgSrc: "/images/logo-rocher.png",
      name: "YVES ROCHER",
      desc: "Увлеченные и ответственные Создатели Растительной Косметики с 1959 года.",
      scoresInst: 1089,
      scoresUsers: 172,
      isSubscribed: false,
    },
    {
      id: 16,
      imgSrc: "/images/logo-woman.png",
      name: "Елена Брадиславская",
      desc: "Ревизор обуви и одежды. Более 10 лет в сфере блогинга.",
      scoresInst: 9801,
      scoresUsers: 140892,
      isSubscribed: false,
    }
  ],
  count: 7034,
}

export async function GET() {
  return NextResponse.json(usersStubs)
}
