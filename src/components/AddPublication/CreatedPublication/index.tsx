import Link from "next/link"

import { CheckRoundIcon } from "@/icons/CheckRoundIcon"

import "./styles.scss"

interface CreatedPublicationProps {
  publicationHref?: string
  catalogHref?: string
}

export const CreatedPublication = ({
  publicationHref = "/publication/1",
  catalogHref = "/catalog",
}: CreatedPublicationProps) => {
  return (
    <div className="created-publication">
      <CheckRoundIcon className="created-publication__icon" />
      <div className="created-publication__title">Ваша публикация готова!</div>
      <div className="created-publication__descr">
        <span>Теперь посмотрим на нее &quot;вживую&quot;?</span>
        <span>Или отправимся смотреть товары для новой?</span>
      </div>
      <div className="created-publication__links">
        <Link href={publicationHref}>Посмотреть публикацию</Link>
        <Link href={catalogHref}>Перейти ко всем товарам</Link>
      </div>
    </div>
  )
}
