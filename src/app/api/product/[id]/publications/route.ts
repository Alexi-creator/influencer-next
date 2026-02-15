import { type NextRequest, NextResponse } from "next/server"
import type { PostCardTypes } from "@/types/postCard.schema"

const allPosts: PostCardTypes[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  imgSrc: `/images/post-card-img-${i % 2 === 0 ? "white" : "black"}.png`,
  desc: `Обзор на новую коллекцию платьев Gucci ${i + 1}`,
  userName: `User ${i + 1}`,
  userLogoSrc: "/images/shop-avatar.png",
  rating: (i % 5) + 1,
  ...(i % 2 === 0
    ? {
        scoresDiscus: Math.floor(Math.random() * 50) + 1,
        scoresLikes: Math.floor(Math.random() * 200) + 1,
      }
    : {}),
  liked: i % 3 === 0,
}))

const PAGE_SIZE = 4

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page = Number(searchParams.get("page") ?? 1)

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const pageData = allPosts.slice(start, end)

  return NextResponse.json({
    data: pageData,
    count: allPosts.length,
  })
}
