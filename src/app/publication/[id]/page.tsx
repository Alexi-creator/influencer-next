export const dynamicParams = true

import type { Metadata } from "next"
import { Publication } from "@/components/Publication"
import { PublicationComments } from "@/components/pageComponents/Users/PublicationComments"
import { Section } from "@/components/ui/Section"
import { API_URLS } from "@/constants/api"
import { revalidatePublicationNameTag, serverRevalidateTime } from "@/settings/publication"
import { publicationResponseSchema } from "@/types/publication.schema"
import "./styles.scss"

export const metadata: Metadata = {
  title: "Publication",
  description: "Influencer publication",
}

export async function generateStaticParams() {
  const res = await fetch(`http://localhost:3000${API_URLS.publications}`)
  const json = await res.json()
  const publications: { id: number }[] = json.data?.data ?? json.data ?? json

  return publications.map((p) => ({ id: String(p.id) }))
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

  const publicationData = publicationResponseSchema.parse(await publicationResponse.json()).data
    .data

  return (
    <>
      <Section className="section--publication">
        <Publication {...publicationData} />
      </Section>

      <Section className="section--comments">
        <PublicationComments resourceUrl={publicationCommentsUrl} />
      </Section>
    </>
  )
}
