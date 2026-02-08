import type { Metadata } from "next"
import { Publication } from "@/components/Publication"
import { PublicationComments } from "@/components/pageComponents/Users/PublicationComments"
import { API_URLS } from "@/constants/api"
import { revalidatePublicationNameTag, serverRevalidateTime } from "@/settings/publication"
import type { PublicationTypes } from "@/types/publication"
import "./styles.scss"

export const metadata: Metadata = {
  title: "Publication",
  description: "Influencer publication",
}

export async function generateStaticParams() {
  return [{ id: "1" }]
}

export default async function PublicationPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const publicationCommentsUrl = API_URLS.publicationComments.replace(":id", id)

  const publicationResponse = await fetch(
    `http://localhost:3000/${API_URLS.publication.replace(":id", id)}`,
    {
      next: {
        tags: [revalidatePublicationNameTag],
        revalidate: serverRevalidateTime,
      },
    },
  )

  const publicationJson = await publicationResponse.json()

  const publicationData: PublicationTypes =
    publicationJson.data?.data ?? publicationJson.data ?? publicationJson

  return (
    <>
      <section className="section section--publication">
        <div className="section__inner">
          <Publication {...publicationData} />
        </div>
      </section>

      <section className="section section--comments">
        <div className="section__inner">
          <PublicationComments resourceUrl={publicationCommentsUrl} />
        </div>
      </section>
    </>
  )
}
