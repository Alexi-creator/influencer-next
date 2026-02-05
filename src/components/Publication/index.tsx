"use client"

import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { PublicationItem } from "@/components/PublicationItem"
import { Button } from "@/components/ui/Button"
import { GalleryCard } from "@/components/ui/GalleryCard"
import { Swiper } from "@/components/ui/Swiper"
import { HeartIcon } from "@/icons/HeartIcon"
import { ShareIcon } from "@/icons/ShareIcon"
import { ThumbsUpIcon } from "@/icons/ThumbsUpIcon"
import { GlobalModalContext } from "@/providers/GlobalModalProvider"
import type { PublicationTypes } from "@/types/publication"
import "./styles.scss"

/**
 * Publication - компонент публикации
 */
export const Publication = ({
  authorName,
  authorAvatar,
  createdAt,
  title,
  views,
  description,
  totalPrice,
  likes,
  hashtags,
  authorActivity,
  publicationItems,
  galleryItems,
  swiperImages,
}: PublicationTypes) => {
  const { setConfigModal } = useContext(GlobalModalContext)

  // Делим элементы пополам, при нечётном количестве слева больше
  const itemsMidpoint = Math.ceil(publicationItems.length / 2)
  const leftItems = publicationItems.slice(0, itemsMidpoint)
  const rightItems = publicationItems.slice(itemsMidpoint)

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
        <Button className="btn--none">
          <ShareIcon className="publication__actions-share" />
        </Button>
        <Button className="btn--none">
          <HeartIcon className="publication__actions-favourite" />
        </Button>
        <div className="publication__actions-views">{views} просмотров</div>
      </div>

      <div className="publication__set">
        <div className="publication__set-items">
          {leftItems.map((item) => (
            <PublicationItem key={item.id} {...item} />
          ))}
        </div>

        <div className="publication__swiper">
          <Swiper
            className="publication__swiper-swiper"
            slides={swiperSlides}
            slidesPerView={1}
            showNavigation
            showPagination
          />
        </div>

        <div className="publication__set-items">
          {rightItems.map((item) => (
            <PublicationItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="publication__goods">
        <GalleryCard cards={galleryItems.map((item) => item.imgHref)} />
        <div className="publication__goods-count">{galleryItems.length} товаров</div>
        <Button
          className="btn--none publication__goods-btn-popup"
          onClick={() =>
            setConfigModal((prev) => ({
              ...prev,
              isOpen: true,
              title: "Товары в этой публикации",
              className: "publication-items-modal",
              content: (
                <div className="publication-items-modal-content">
                  {publicationItems.map((item) => (
                    <PublicationItem key={item.id} {...item} />
                  ))}
                </div>
              ),
            }))
          }
        >
          Посмотреть
        </Button>
      </div>

      <div className="publication__descr">{description}</div>

      <div className="publication__price">Общая стоимость образа: {totalPrice}</div>

      <div className="publication__likes">
        <Button className="btn--none">
          <ThumbsUpIcon className="publication__likes-icon" />
        </Button>
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
