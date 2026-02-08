import type { Metadata } from "next"

// import "./styles.scss"

export const metadata: Metadata = {
  title: "Product",
  description: "Influencer Product",
}

/**
 * PublicationPage - Входная точка для страницы публикации вместе с ее комментариями
 */
export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params
  // const publicationCommentsUrl = API_URLS.publicationComments.replace(":id", id)

  // const publicationPromise = fetch(
  //   `http://localhost:3000/${API_URLS.publication.replace(":id", id)}`,
  //   {
  //     next: {
  //       tags: [revalidatePublicationNameTag],
  //       revalidate: serverRevalidateTime,
  //     },
  //   },
  // )

  // const commentsPromise = fetch(`http://localhost:3000/${publicationCommentsUrl}`, {
  //   next: {
  //     tags: [revalidateCommentsNameTag],
  //     revalidate: serverRevalidateTime,
  //   },
  // })

  // const [publicationResponse, commentsResponse] = await Promise.all([
  //   publicationPromise,
  //   commentsPromise,
  // ])

  // const publicationJson = await publicationResponse.json()
  // const commentsJson = await commentsResponse.json()

  // const publicationData: PublicationTypes =
  //   publicationJson.data?.data ?? publicationJson.data ?? publicationJson
  // const commentsData: CommentsTypes = commentsJson.data?.data ?? commentsJson.data ?? commentsJson

  return (
    <>
      <div>Product {id}</div>
      {/* <section className="section section--publication">
        <div className="section__inner">
          <Publication {...publicationData} />
        </div>
      </section>

      <section className="section section--comments">
        <div className="section__inner">
          <PublicationComments resourceUrl={publicationCommentsUrl} {...commentsData} />
        </div>
      </section> */}
    </>
  )
}
