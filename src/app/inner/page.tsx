import { Divider } from "@/components/ui/Divider"
import Link from "next/link"

export const dynamic = "force-static"

export default function InnerPage() {
  return (
    <section className="section">
      <div className="section__inner">
        <h1>Демо страниц:</h1>
        <Divider />

        <h2>Основные страницы</h2>
        <ul>
          <li>
            <Link href="./shops.html">Магазин</Link>
          </li>
          <li>
            <Link href="/shops-list">Список магазинов</Link>
          </li>
          <li>
            <Link href="/uikit">Ui kit</Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

// li: a(href="./shops.html") Магазин
//   li: a(href="./shops-list.html") Список магазинов
//   li: a(href="./catalog.html") Каталог
//   li: a(href="./users.html") Блогеры
//   li: a(href="./user-inner.html") Блогер
//   li: a(href="./publication.html") Публикация
//   li: a(href="./add-publication.html") Добавление публикации
//   li: a(href="./product.html") Товар
//   li: a(href="./product-in-modal.html") Модальное окно товара
//   li: a(href="./carts.html") Корзины
//   li: a(href="./inner-jp.html") Совместные покупки

// hr.hr

// h2 Демострационные страницы состояний
// ul
//   li: a(href="./header-authorized.html") header авторизованного пользователя
//   li: a(href="./header-not-authorized.html") header не авторизованного пользователя
//   li: a(href="./header-not-location.html") header с не заполненным адресом
//   li: a(href="./header-half-location.html") header с частично заполненным адресом
//   li: a(href="./header-location.html") header с заполненным адресом

// hr.hr

// h2 Технические страницы
// ul
//   li: a(href="./ui-kit.html") Ui-kit
//   li: a(href="./img/stack/sprite.stack.html") svg icons

// hr.hr
