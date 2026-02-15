export const dynamic = "force-static"

import Link from "next/link"
import { Divider } from "@/components/ui/Divider"
import { Section } from "@/components/ui/Section"

import "./styles.scss"

export default function InnerPage() {
  return (
    <Section className="section--inner-page">
      <h1>Демо страниц:</h1>

      <Divider />

      <h2>Основные страницы</h2>
      <ul>
        <li>
          <Link href="/shop/1/goods">Магазин</Link>
        </li>
        <li>
          <Link href="/shops">Список магазинов</Link>
        </li>
        <li>
          <Link href="/catalog">Каталог</Link>
        </li>
        <li>
          <Link href="/users">Блогеры</Link>
        </li>
        <li>
          <Link href="/carts">Корзины</Link>
        </li>
        <li>
          <Link href="/publication/1">Публикация</Link>
        </li>
        <li>
          <Link href="/product/1">Продукт</Link>
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
        <li>
          <Link href="/icons">Icons</Link>
        </li>
      </ul>
    </Section>
  )
}
