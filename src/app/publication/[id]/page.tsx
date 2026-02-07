import type { Metadata } from "next"
import { Publication } from "@/components/Publication"
import { PublicationComments } from "@/components/pageComponents/Users/PublicationComments"
import { API_URLS } from "@/constants/api"
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
 * PublicationPage - Входная точка для страницы публикации вместе с ее комментариями
 */
export default async function PublicationPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const publicationPromise = fetch(
    `http://localhost:3000/${API_URLS.publication.replace(":id", id)}`,
    {
      next: {
        tags: [revalidatePublicationNameTag],
        revalidate: serverRevalidateTime,
      },
    },
  )

  const commentsPromise = fetch(
    `http://localhost:3000/${API_URLS.publicationComments.replace(":id", id)}`,
    {
      next: {
        tags: [revalidateCommentsNameTag],
        revalidate: serverRevalidateTime,
      },
    },
  )

  const [publicationResponse, commentsResponse] = await Promise.all([
    publicationPromise,
    commentsPromise,
  ])

  const publicationJson = await publicationResponse.json()
  const commentsJson = await commentsResponse.json()

  const publicationData: PublicationTypes =
    publicationJson.data?.data ?? publicationJson.data ?? publicationJson
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
          <PublicationComments {...commentsData} />
        </div>
      </section>
    </>
  )
}
