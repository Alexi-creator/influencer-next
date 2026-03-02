import { NextResponse } from "next/server"

export interface UserPreviewTypes {
  name: string
  image: string
  influencer?: boolean
  desc: string
  postCount: number
  subCount: number
}

export interface UserTypes {
  data: {
    preview: UserPreviewTypes
    user: {
      data: { name: string }[]
      count: number
    }
  }
}

const userStubs: UserTypes = {
  data: {
    preview: {
      name: "Олеся Смирнова",
      image: "/images/logo-user-sm.jpg",
      influencer: true,
      desc: "Ревизорро обуви и одежды. Более 10 лет в сфере блогинга. Производство контента не требует большого количества дорогостоящего оборудования, специального образования или технологического мастерства по сравнению с традиционными средствами массовой информации. Для Ревизорро обуви и одежды. Более 10 лет в сфере блогинга. Производство контента не требует большого количества дорогостоящего оборудования, специального образования или технологического мастерства по сравнению с традиционными средствами массовой информации.",
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
