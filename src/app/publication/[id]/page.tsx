import type { Metadata } from "next"
import { Comments } from "@/components/Comments"
import { Publication } from "@/components/Publication"
import {
  revalidateCommentsNameTag,
  revalidatePublicationNameTag,
  serverRevalidateTime,
} from "@/settings/publication"
import type { CommentsTypes } from "@/types/comments"
import type { PublicationTypes } from "@/types/publication"
import "./styles.scss"

export const metadata: Metadata = {
  title: "Publication",
  description: "Influencer publication",
}

/**
 * PublicationPage - Входная точка для страницы публикации
 */
export default async function PublicationPage({ params }: { params: { id: string } }) {
  const publicationPromise = fetch(`http://localhost:3000/api/publication/${params.id}`, {
    next: {
      tags: [revalidatePublicationNameTag],
      revalidate: serverRevalidateTime,
    },
  })

  const commentsPromise = fetch(`http://localhost:3000/api/publication/${params.id}/comments`, {
    next: {
      tags: [revalidateCommentsNameTag],
      revalidate: serverRevalidateTime,
    },
  })

  const [publicationResponse, commentsResponse] = await Promise.all([publicationPromise, commentsPromise])

  const publicationJson = await publicationResponse.json()
  const commentsJson = await commentsResponse.json()

  const publicationData: PublicationTypes = publicationJson.data?.data ?? publicationJson.data ?? publicationJson
  const commentsData: CommentsTypes = commentsJson.data?.data ?? commentsJson.data ?? commentsJson

  return (
    <>
      <section className="section section--publication">
        <div className="section__inner">
          <Publication {...publicationData} />
        </div>
      </section>

      <section className="section section--comments">
        <div className="section__inner">
          <Comments {...commentsData} />
        </div>
      </section>
    </>
  )
}
