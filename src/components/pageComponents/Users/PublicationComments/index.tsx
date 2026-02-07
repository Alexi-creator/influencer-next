import { Comments } from "@/components/Comments"
import { clientRevalidateTime, publicationCommentsQueryKey } from "@/settings/publication"
import type { CommentsTypes } from "@/types/comments"

interface PublicationCommentsProps extends CommentsTypes {
  resourceUrl: string
}

/**
 * PublicationComments - компонент комментариев обертка над комментариями
 */
export const PublicationComments = ({
  totalCount,
  comments,
  resourceUrl,
}: PublicationCommentsProps) => {
  // TODO Comments возможно будет переиспользоваться. поэтому не должен быть привязан только к одному месту исользования
  // Возможно тут будут еще настройки и их прокидка, если нет то можно прокинуть все настройки будет из страницы
  return (
    <Comments
      resourceUrl={resourceUrl}
      // TODO возможно стоит передавать сразу 1 проп в виде объекта для настроек tanstack и спредить его внутри, создать общий тип для этого
      initialData={{ totalCount, comments }}
      queryKey={publicationCommentsQueryKey}
      clientRevalidateTime={clientRevalidateTime}
      refetchIntervalInBackground={false}
      refetchOnMount={false}
      refetchOnWindowFocus={false}
    />
  )
}
