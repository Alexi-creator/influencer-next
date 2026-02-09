import { Comments } from "@/components/Comments"
import { clientRevalidateTime, publicationCommentsQueryKey } from "@/settings/publication"

interface PublicationCommentsProps {
  resourceUrl: string
}

/**
 * PublicationComments - компонент комментариев обертка над комментариями
 */
export const PublicationComments = ({ resourceUrl }: PublicationCommentsProps) => {
  return (
    <Comments
      resourceUrl={resourceUrl}
      queryKey={publicationCommentsQueryKey}
      clientRevalidateTime={clientRevalidateTime}
      refetchIntervalInBackground={false}
      refetchOnWindowFocus={false}
    />
  )
}
