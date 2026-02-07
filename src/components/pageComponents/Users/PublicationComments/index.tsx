import { Comments } from "@/components/Comments"
import { API_URLS } from "@/constants/api"
import { clientRevalidateTime, publicationCommentsQueryKey } from "@/settings/publication"
import type { CommentsTypes } from "@/types/comments"

/**
 * PublicationComments - компонент комментариев обертка над комментариями
 */
export const PublicationComments = ({ totalCount, comments }: CommentsTypes) => {
  // TODO Comments возможно будет переиспользоваться. поэтому не должен быть привязан только к одному месту исользования
  // Возможно тут будут еще настройки и их прокидка, если нет то можно прокинуть все настройки будет из страницы
  return (
    <Comments
      initialData={{ totalCount, comments }}
      resourceUrl={API_URLS.publicationComments}
      queryKey={publicationCommentsQueryKey}
      clientRevalidateTime={clientRevalidateTime}
      refetchIntervalInBackground={false}
      refetchOnMount={false}
      refetchOnWindowFocus={false}
    />
  )
}
