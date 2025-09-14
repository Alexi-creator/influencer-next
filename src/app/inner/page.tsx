export const dynamic = "force-static"

import { Divider } from "@/components/ui/Divider"
import Link from "next/link"

import "./styles.scss"

export default function InnerPage() {
  return (
    <section className="section section--inner-page">
      <div className="section__inner">
        <h1>Демо страниц:</h1>

        <Divider />

        <h2>Основные страницы</h2>
        <ul>
          <li>
            <Link href="/catalog">Каталог</Link>
          </li>
          <li>
            <Link href="/users">Блогеры</Link>
          </li>
        </ul>

        <Divider />

        <h2>Демострационные страницы состояний</h2>
        <ul>
          <li>
            <Link href="/inner/header/auth">header авторизованного пользователя</Link>
          </li>
          <li>
            <Link href="/inner/header/noauth">header неавторизованного пользователя</Link>
          </li>
          <li>
            <Link href="/inner/header/emptyaddress">header с незаполненным адресом</Link>
          </li>
          <li>
            <Link href="/inner/header/partiallyaddress">header с частично заполненным адресом</Link>
          </li>
          <li>
            <Link href="/inner/header/fulladdress">header с заполненным адресом</Link>
          </li>
        </ul>

        <Divider />

        <h2>Технические страницы</h2>
        <ul>
          <li>
            <Link href="/uikit">Ui kit</Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
