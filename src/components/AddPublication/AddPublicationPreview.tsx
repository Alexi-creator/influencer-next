import Image from "next/image"
import { HeartIcon } from "@/icons/HeartIcon"
import { ShareIcon } from "@/icons/ShareIcon"

export const AddPublicationPreview = () => {
  return (
    <>
      <div className="add-publication__preview-title">
        Так будет выглядеть ваша публикация. Если вы все же решили что-то изменить — нажмите на
        кнопку &quot;Назад&quot;.
        <div>А если все нравится — &quot;Опубликовать&quot;.</div>
      </div>

      <div className="add-publication__preview-content">
        <div className="publication">
          <div className="publication__author">
            <div className="publication__author-avatar">
              <Image src="/images/shop-avatar.png" alt="avatar" width={40} height={40} />
            </div>
            <div className="publication__author-name">Олеся Смирнова</div>
          </div>

          <div className="publication__title" />

          <div className="publication__actions">
            <button type="button">
              <ShareIcon className="publication__actions-share" />
            </button>
            <button type="button">
              <HeartIcon className="publication__actions-favourite" />
            </button>
          </div>

          <div className="publication__set">
            <div className="publication__set-items publication__set-items-left" />
            <div className="publication__swiper" />
            <div className="publication__set-items publication__set-items-right" />
          </div>

          <div className="publication__goods">
            <div className="gallery-card" />
            <div className="publication__goods-count">
              <span className="publication__goods-count-number" /> товаров
            </div>
          </div>

          <div className="publication__descr" />

          <div className="publication__price">
            Общая стоимость образа: <span className="publication__price-count" /> ₽
          </div>

          <ul className="publication__hashtags" />

          <div className="publication__subscribe">
            <div className="publication__subscribe-top">
              <div className="publication__subscribe-line" />
              <div className="publication__subscribe-avatar">
                <Image src="/images/shop-avatar.png" alt="avatar" width={40} height={40} />
              </div>
              <div className="publication__subscribe-line" />
            </div>
            <div className="publication__subscribe-name">Олеся Смирнова</div>
            <div className="publication__subscribe-activity">
              Персональный стилист / Актриса / Блогер
            </div>
            <div className="publication__subscribe-btn">
              <button type="button" className="btn" disabled>
                Подписаться
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
