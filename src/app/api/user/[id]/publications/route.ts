import { NextResponse } from "next/server"

import type { PostCardTypes } from "@/types/postCard.schema"

const publicationsStubs: { data: { data: PostCardTypes[]; count: number } } = {
  data: {
    data: [
      {
        id: 1,
        imgSrc: "/images/post-card-img-black.png",
        desc: "Лучший летний образ этого сезона — лёгкий комбинезон из шёлковой вискозы",
        userName: "Yves Saint Lauren",
        userLogoSrc: "/images/avatar-influencer.jpg",
        rating: 4,
        scoresDiscus: 12,
        scoresLikes: 340,
        liked: true,
      },
      {
        id: 2,
        imgSrc: "/images/post-card-img-white.png",
        desc: "Плетёная сумка-сэтчел — идеальный аксессуар для городских прогулок",
        userName: "Yves Saint Lauren",
        userLogoSrc: "/images/avatar-influencer.jpg",
        rating: 5,
        scoresDiscus: 8,
        scoresLikes: 210,
        liked: false,
      },
      {
        id: 3,
        imgSrc: "/images/post-louis-vuitton.png",
        desc: "Новая коллекция осень-зима: элегантность в каждой детали",
        userName: "Yves Saint Lauren",
        userLogoSrc: "/images/avatar-influencer.jpg",
        rating: 3,
        scoresDiscus: 5,
        scoresLikes: 98,
      },
      {
        id: 4,
        imgSrc: "/images/post-jeans.png",
        desc: "Стильный образ для деловых встреч и вечерних выходов",
        userName: "Yves Saint Lauren",
        userLogoSrc: "/images/avatar-influencer.jpg",
        rating: 4,
        scoresDiscus: 20,
        scoresLikes: 512,
        liked: true,
      },
    ],
    count: 4,
  },
}

export async function GET() {
  return NextResponse.json(publicationsStubs)
}
