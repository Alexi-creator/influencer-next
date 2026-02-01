import Image from "next/image"

import type { ShopPreviewTypes } from "@/app/api/shop/route"
import { Share } from "@/components/Share"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Button } from "@/components/ui/Button"

import "./styles.scss"

interface ShopPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ShopPreviewTypes
}

export const ShopPreview = ({ data }: ShopPreviewProps) => {
  const { name, title, about, subscribes, categories, image } = data

  return (
    <div className="shop-preview">
      <div className="shop-preview__block-img">
        <Image src={image} alt={name} width={600} height={400} />
      </div>

      <div className="shop-preview__block-descr">
        <h1 className="shop-preview__title">{title}</h1>
        <p className="shop-preview__about">{about}</p>

        <div className="shop-preview__bread-crumbs">
          <Breadcrumbs title="Категории:" items={categories} />
        </div>

        {/* TODO сделать универсальную функцию склонения */}
        <div className="shop-preview__followers">{subscribes} подписчиков</div>

        <div className="shop-preview__actions">
          <Button>Подписаться</Button>

          <div className="shop-preview__share">
            <Share />
          </div>
        </div>
      </div>
    </div>
  )
}
