import { Publication } from "@/components/Publication"
import type { PublicationGoodsItemTypes } from "@/types/addPublicationGoods.schema"

interface AddPublicationPreviewProps {
  images: string[]
  selectedGoods: PublicationGoodsItemTypes[]
  title: string
  hashtags: string[]
}

const calcTotalPrice = (goods: PublicationGoodsItemTypes[]): string => {
  if (goods.length === 0) return ""
  const sum = goods.reduce((acc, g) => {
    const num = Number.parseFloat(g.price.replace(/\s/g, "").replace(",", ".")) || 0
    return acc + num
  }, 0)
  const currency = goods[0].currency
  return `${sum.toLocaleString("ru-RU")} ${currency}`.trim()
}

export const AddPublicationPreview = ({
  images,
  selectedGoods,
  title,
  hashtags,
}: AddPublicationPreviewProps) => {
  return (
    <>
      <div className="add-publication__preview-title">
        Так будет выглядеть ваша публикация. Если вы все же решили что-то изменить — нажмите на
        кнопку &quot;Назад&quot;.
        <div>А если все нравится — &quot;Опубликовать&quot;.</div>
      </div>

      <div className="add-publication__preview-content">
        <Publication
          id={0}
          authorName="Олеся Смирнова"
          authorAvatar="/images/logo-user-sm.jpg"
          createdAt=""
          title={title}
          views={0}
          description=""
          totalPrice={calcTotalPrice(selectedGoods)}
          likes={0}
          hashtags={hashtags}
          authorActivity=""
          publicationItems={selectedGoods.map((g, i) => ({
            id: i,
            img: g.img,
            title: g.title,
            price: g.price,
            currency: g.currency,
          }))}
          galleryItems={selectedGoods.map((g, i) => ({ id: i, imgHref: g.img }))}
          swiperImages={images}
        />
      </div>
    </>
  )
}
