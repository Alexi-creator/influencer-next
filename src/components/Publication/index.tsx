"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Swiper } from "@/components/ui/Swiper"
import { HeartIcon } from "@/icons/HeartIcon"
import { ShareLinkIcon } from "@/icons/ShareLinkIcon"
import { ThumbsUpIcon } from "@/icons/ThumbsUpIcon"
import type { PublicationItemTypes, PublicationTypes } from "@/types/publication"

import "./styles.scss"

type PublicationProps = Partial<PublicationTypes>

const PublicationItem = ({ imgHref }: PublicationItemTypes) => (
  <div className="publication__set-item">
    <Image src={imgHref} alt="Publication item" width={80} height={80} />
  </div>
)

export const Publication = ({
  authorName = "Олеся Смирнова",
  authorAvatar = "/images/logo-user-sm.jpg",
  createdAt = "17 минут назад",
  title = "Светлый образ на холодную весну",
  views = 6072,
  description = "Безупречный белый позволителен дамам любого возраста и рода занятий, делая внешность неотразимой и такой безукоризненной. Облачаясь в белый цвет с ног до головы этой весной, отдавайте предпочтение белым платьям на весну, брючным костюмам, рубашкам и блузкам в белом цвете, а также и верхней одежде в белом цвете на весну. Именно белый цвет в модных образах весны 2021 будет на пике популярности для многих барышень.",
  totalPrice = "97 062 ₽",
  likes = 16,
  hashtags = ["#весна22", "#холод", "#лучшийобраз", "#костюмы", "#недешево"],
  authorActivity = "Персональный стилист / Актриса / Блогер",
  publicationItems = [
    { id: 1, imgHref: "/images/publication.jpg" },
    { id: 2, imgHref: "/images/post-card-img-black.png" },
    { id: 3, imgHref: "/images/publication.jpg" },
  ],
  galleryItems = [
    { id: 1, imgHref: "/images/publication.jpg" },
    { id: 2, imgHref: "/images/post-card-img-black.png" },
    { id: 3, imgHref: "/images/publication.jpg" },
    { id: 4, imgHref: "/images/publication.jpg" },
    { id: 5, imgHref: "/images/post-card-img-black.png" },
    { id: 6, imgHref: "/images/publication.jpg" },
    { id: 7, imgHref: "/images/publication.jpg" },
    { id: 8, imgHref: "/images/post-card-img-black.png" },
    { id: 9, imgHref: "/images/publication.jpg", moreCount: 7 },
  ],
  swiperImages = [
    "/images/publication.jpg",
    "/images/post-card-img-black.png",
    "/images/publication.jpg",
  ],
}: PublicationProps) => {
  const swiperSlides = swiperImages.map((src) => (
    <Image key={src} src={src} alt="Publication slide" width={600} height={400} />
  ))

  return (
    <div className="publication">
      <div className="publication__author">
        <div className="publication__author-avatar">
          <Image src={authorAvatar} alt={authorName} width={40} height={40} />
        </div>
        <div className="publication__author-name">{authorName}</div>
        <div className="publication__author-created">{createdAt}</div>
      </div>

      <div className="publication__title">{title}</div>

      <div className="publication__actions">
        <button type="button">
          <ShareLinkIcon className="publication__actions-share" />
        </button>
        <button type="button">
          <HeartIcon className="publication__actions-favourite" />
        </button>
        <div className="publication__actions-views">{views} просмотров</div>
      </div>

      <div className="publication__set">
        <div className="publication__set-items">
          {publicationItems.map((item) => (
            <PublicationItem key={item.id} {...item} />
          ))}
        </div>

        <div className="publication__swiper">
          <Swiper
            className="swiper-publication"
            slides={swiperSlides}
            slidesPerView={1}
            showNavigation
            showPagination
          />
        </div>

        <div className="publication__set-items">
          {publicationItems.map((item) => (
            <PublicationItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="publication__goods">
        <div className="gallery-card">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-card__item">
              <Image src={item.imgHref} alt="Gallery item" width={80} height={80} />
              {item.moreCount && (
                <span className="gallery-card__item-more">+{item.moreCount}</span>
              )}
            </div>
          ))}
        </div>
        <div className="publication__goods-count">{galleryItems.length} товаров</div>
        <Button className="btn--none publication__goods-btn-popup" data-popup="publication-items">
          Посмотреть
        </Button>
      </div>

      <div className="publication__descr">{description}</div>

      <div className="publication__price">Общая стоимость образа: {totalPrice}</div>

      <div className="publication__likes">
        <ThumbsUpIcon className="publication__likes-icon" />
        <div className="publication__likes-text">{likes} Отметок &quot;Нравится&quot;</div>
      </div>

      <ul className="publication__hashtags">
        {hashtags.map((tag) => (
          <li key={tag}>
            <Link href="#">{tag}</Link>
          </li>
        ))}
      </ul>

      <div className="publication__subscribe">
        <div className="publication__subscribe-top">
          <div className="publication__subscribe-line" />
          <div className="publication__subscribe-avatar">
            <Image src={authorAvatar} alt={authorName} width={60} height={60} />
          </div>
          <div className="publication__subscribe-line" />
        </div>
        <div className="publication__subscribe-name">{authorName}</div>
        <div className="publication__subscribe-activity">{authorActivity}</div>
        <div className="publication__subscribe-btn">
          <Button>Подписаться</Button>
        </div>
      </div>
    </div>
  )
}
