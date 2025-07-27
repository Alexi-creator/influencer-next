import Image from "next/image"
import Link from "next/link"

import { Counter } from "@/components/ui/Counter"
import { Select } from "@/components/ui/Select"

import { HeaderSearch } from "./HeaderSearch"
import { HeaderLogin } from "./HeaderLogin"
import { HeaderUsefulLinksAction } from "./HeaderUsefulLinksAction"
import { MobileMenu } from "./MobileMenu"
import { LocationAction } from "./LocationAction"
import { AddressButton } from "./AddressButton"

import CatalogIcon from "@/icons/catalog.svg"
import CrossIcon from "@/icons/cross.svg"
import ShoppingBagIcon from "@/icons/shopping-bag.svg"
import HeartIcon from "@/icons/heart.svg"
import FeedIcon from "@/icons/feed.svg"
import CameraIcon from "@/icons/camera.svg"

import "@/components/ui/Button/styles.scss"
import "./styles.scss"

export const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__top">
          <AddressButton />

          <div className="header__top-info">
            <Link href="#">Инструкции</Link>
            <Link href="#">Контакты</Link>
            <Select
              name="language"
              className="select--transparent header__top-language"
              options={[
                { value: "ru", label: "Русский" },
                { value: "en", label: "Английский" },
                { value: "kz", label: "Казахский" },
              ]}
              initialLabel="Русский"
              initialValue="ru"
            />
          </div>
        </div>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item header__nav-logo">
              <Link href="/" className="header__nav-logo-small">
                <Image src="/images/small-logo.svg" alt="small-logo" width={24} height={24} />
              </Link>
              <Link href="/" className="header__nav-logo-big">
                <Image src="/images/logo.svg" alt="logo" width={106} height={24} />
              </Link>
            </li>
            <li className="header__nav-item header__nav-catalog">
              <Link href="/catalog" className="btn header__nav-catalog-btn">
                <CatalogIcon className="header__nav-catalog-icon-catalog" />
                <CrossIcon className="header__nav-catalog-icon-cross" />
                Каталог
              </Link>
            </li>
            <li className="header__nav-item header__nav-search">
              <div className="header__nav-search-title">
                <div className="header__nav-search-title-text">Поиск по сайту</div>
                <CrossIcon />
              </div>

              <HeaderSearch />

              <div className="header__nav-search-filter">
                <div className="header__nav-search-filter-title">
                  Где будем искать
                </div>
                <div className="header__nav-search-mask"></div>
              </div>
            </li>
            <li className="header__nav-item header__nav-basket">
              <Link href={"/carts"}>
                <ShoppingBagIcon />
              </Link>
              <div className="header__nav-item-counter">
                <Counter color="green">
                  9
                </Counter>
              </div>
            </li>
            <li className="header__nav-item header__nav-favorite">
              <Link href={"#"}>
                <HeartIcon />
              </Link>
              <div className="header__nav-item-counter">
                <Counter color="green">
                  4
                </Counter>
              </div>
            </li>
            <li className="header__nav-item header__nav-feed">
              <Link href={"#"}>
                <FeedIcon />
              </Link>
              <div className="header__nav-item-counter">
                <Counter color="green">
                  1
                </Counter>
              </div>
            </li>
            <li className="header__nav-item header__nav-instagram">
              <Link href={"/add-publication"}>
                <CameraIcon />
              </Link>
              <div className="header__nav-item-counter">
                <Counter color="green">
                  0
                </Counter>
              </div>
            </li>
            <li className="header__nav-item header__nav-profile">
              <HeaderLogin />
            </li>
            <li className="header__nav-item header__nav-more">
              <HeaderUsefulLinksAction
                links={[
                  { text: "Категории", href: "#", },
                  { text: "Магазины", href: "#", },
                  { text: "Совместные покупки", href: "#", },
                  { text: "Test ForFree", href: "#", },
                  { text: "Блогеры", href: "#", },
                  { text: "Публикации", href: "#", },
                  { text: "Служба поддержки", href: "#", },
                ]} />
            </li>
            <li className="header__nav-item header__nav-location">
              <LocationAction />
            </li>
          </ul>
        </nav>
      </div>

      <MobileMenu />
    </header>
  )
}
