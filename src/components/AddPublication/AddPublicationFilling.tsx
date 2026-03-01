"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"

const CropperPublication = dynamic(
  () =>
    import("@/components/AddPublication/CropperPublication").then((m) => ({
      default: m.CropperPublication,
    })),
  { ssr: false },
)

import { PublicationItem } from "@/components/PublicationItem"
import { Button } from "@/components/ui/Button"
import { Collapse } from "@/components/ui/Collapse"
import { Input } from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"
import { Rating } from "@/components/ui/Rating"
import { Textarea } from "@/components/ui/Textarea"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import { ArrowIcon } from "@/icons/ArrowIcon"
import { PlusIcon } from "@/icons/PlusIcon"
import { UploadIcon } from "@/icons/UploadIcon"
import {
  ITEM_SOURCE,
  type ItemSource,
  type PublicationGoodsItemTypes,
} from "@/types/addPublicationGoods.schema"
import { BREAKPOINT_NAME } from "@/types/breakpointTypes"

const sourceClassMap: Record<NonNullable<ItemSource>, string> = {
  [ITEM_SOURCE.sp]: "publication-item--dark",
  [ITEM_SOURCE.bought]: "publication-item--green",
  [ITEM_SOURCE.user]: "publication-item--dark",
  [ITEM_SOURCE.external]: "publication-item--grey",
}

const getItemClass = (source: ItemSource | undefined) =>
  source ? sourceClassMap[source] : "publication-item--dark"

const fillingSchema = z.object({
  title: z.string().min(1, "Обязательное поле для заполнения").min(6, "Минимум 6 символов"),
  description: z
    .string()
    .min(1, "Обязательное поле для заполнения")
    .max(200, "Не более 200 символов"),
  mediaLink: z.string().optional(),
  tags: z.string().min(1, "Обязательное поле для заполнения"),
  images: z.array(z.string()).min(1, "Обязательное поле для заполнения"),
})

type FillingFormValues = z.infer<typeof fillingSchema>

interface AddPublicationFillingProps {
  selectedGoods: PublicationGoodsItemTypes[]
  onValidChange: (isValid: boolean) => void
}

export const AddPublicationFilling = ({
  selectedGoods,
  onValidChange,
}: AddPublicationFillingProps) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(true)
  const [isUploadActive, setIsUploadActive] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const isImagesTouched = useRef(false)
  const { currentBreakpoint } = useBreakpoint()

  const isMobile =
    currentBreakpoint === BREAKPOINT_NAME.MOBILE || currentBreakpoint === BREAKPOINT_NAME.TABLET

  const handleCropSave = (index: number, croppedSrc: string) => {
    setPreviewImages((prev) => {
      const updated = [...prev]
      updated[index] = croppedSrc
      return updated
    })
  }

  const handleFileInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    isImagesTouched.current = true
    trigger("images")
    if (window.innerWidth >= 1200) {
      e.preventDefault()
      setIsUploadActive((prev) => !prev)
    }
  }

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxFileSize = 5 * 1024 * 1024
    const files = Array.from(e.target.files || []).filter(
      (f) => f.type.startsWith("image/") && f.size < maxFileSize,
    )

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const src = ev.target?.result as string
        if (src) {
          setPreviewImages((prev) => {
            if (prev.length >= 8) return prev
            return [...prev, src]
          })
        }
      }
      reader.readAsDataURL(file)
    })

    setIsUploadActive(false)
  }

  const {
    register,
    setValue,
    trigger,
    formState: { isValid, errors },
  } = useForm<FillingFormValues>({
    resolver: zodResolver(fillingSchema),
    mode: "onTouched",
    defaultValues: { images: [] },
  })

  useEffect(() => {
    onValidChange(isValid)
  }, [isValid, onValidChange])

  useEffect(() => {
    setValue("images", previewImages, { shouldValidate: isImagesTouched.current })
  }, [previewImages, setValue])

  return (
    <>
      <form className="add-publication__filling-form">
        <Collapse
          className="add-publication__filling-selected collapse--arrow"
          onOpenChange={setIsCollapseOpen}
          title={
            <span className="add-publication__filling-selected-title">
              Выбранные товары (
              <span className="add-publication__filling-selected-count">
                {selectedGoods.length})
              </span>
              <span className="add-publication__filling-selected-toggle">
                {isCollapseOpen ? "Свернуть" : "Развернуть"}
              </span>
            </span>
          }
          CustomIcon={<ArrowIcon style={{ color: "rgb(var(--color-grey))" }} />}
        >
          <ul className="add-publication__filling-selected-content">
            {selectedGoods.map((item) => (
              <li key={item.id} className="add-publication__content-results-list-item active">
                <PublicationItem
                  className={getItemClass(item.source)}
                  img={item.img}
                  title={item.title}
                  price={item.price}
                  currency={item.currency}
                />
                {item.source === ITEM_SOURCE.bought && (
                  <div className="add-publication__content-results-list-item-rating">
                    {!item.rating ? (
                      <>
                        <div className="add-publication__content-results-list-item-rating-text">
                          Оцените купленный товар
                        </div>
                        <div className="add-publication__content-results-list-item-rating-rate">
                          <Rating name={`item-rating-${item.id}`} interactive />
                        </div>
                      </>
                    ) : (
                      <div className="add-publication__content-results-list-item-rating-rate">
                        <Rating initialRate={item.rating} />
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Collapse>

        <div className="add-publication__filling-field-title">Придумайте заголовок</div>
        <div className="add-publication__filling-field-wrapper">
          <Input
            className={clsx("input--color-grey", { error: errors.title })}
            placeholder="Заголовок образа"
            errorText={errors.title?.message}
            {...register("title")}
          />
        </div>

        <div className="add-publication__filling-field-title">Что стоит отметить в образе?</div>
        <div className="add-publication__filling-field-wrapper">
          <Textarea
            placeholder="Например, расскажите о концепции образа или сочетании цветов"
            className={clsx("add-publication__filling-field-description textarea__input--grey", {
              error: errors.description,
            })}
            errorText={errors.description?.message}
            {...register("description")}
          />
        </div>

        <div className="add-publication__filling-field-media">
          <div className="add-publication__filling-field-media-img-wrapper">
            <div className="add-publication__filling-field-title">Добавьте фотографии</div>
            <div className="add-publication__filling-field-wrapper add-publication__filling-field-upload">
              <Input
                type="file"
                className={clsx(
                  "input--color-grey input--upload add-publication__filling-field-upload-input",
                  { active: isUploadActive },
                )}
                prefixNode={<PlusIcon />}
                suffixNode={
                  // biome-ignore lint/a11y/noStaticElementInteractions: drag-and-drop zone
                  <div className="add-publication__filling-field-upload-popup">
                    <UploadIcon />
                    <div className="add-publication__filling-field-upload-popup-text">
                      Перетащите в это окно изображения в формате PNG или JPG, которые хотите
                      добавить к публикации. Общее количество изображений не должно превышать 8 шт.,
                      а размер каждого не должен быть больше 5 МБ.
                    </div>
                  </div>
                }
                multiple
                errorText={errors.images?.message}
                onClick={handleFileInputClick}
                onChange={handleFilesChange}
              />
              <p
                className={clsx("add-publication__filling-field-upload-descr", {
                  hide: previewImages.length > 0,
                })}
              >
                До 8 изображений в формате PNG или JPG. Можно просто перетащить их в это окно
              </p>
              <div className="add-publication__filling-field-upload-files active">
                {previewImages.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt="preview"
                    className="add-publication__filling-field-upload-files-img"
                  />
                ))}
              </div>
              <p
                className={clsx("add-publication__filling-field-upload-info", {
                  active: previewImages.length > 0,
                })}
              >
                Вы можете изменить порядок показа фотографий перетаскиванием. Чтобы посмотреть на
                фото в увеличенном масштабе, просто кликните на нее
              </p>
              <Button
                className={clsx("add-publication__filling-field-upload-settings btn--none", {
                  active: previewImages.length > 0,
                })}
                type="button"
                onClick={() => setIsCropperOpen(true)}
              >
                Настроить область показа миниатюр
              </Button>
            </div>
          </div>

          <div className="add-publication__filling-field-media-video-wrapper">
            <div className="add-publication__filling-field-title">Есть видео? Вставьте ссылку</div>
            <div className="add-publication__filling-field-wrapper">
              <Input
                placeholder="Вставьте ссылку на нужное видео в это поле"
                className="input--color-grey"
                {...register("mediaLink")}
              />
            </div>
          </div>
        </div>

        <div className="add-publication__filling-field-title">Прикрепите теги</div>
        <div className="add-publication__filling-field-wrapper">
          <Textarea
            className={clsx("add-publication__filling-field-tags textarea__input--grey", {
              error: errors.tags,
            })}
            placeholder="Поле тегов"
            errorText={errors.tags?.message}
            {...register("tags")}
          />
        </div>
      </form>

      <Modal
        isOpen={isCropperOpen}
        title="Выберите область показа фото"
        className={clsx("add-publication__filling-cropper", { "modal--no-overlay": isMobile })}
        onClose={() => setIsCropperOpen(false)}
      >
        <CropperPublication images={previewImages} onSave={handleCropSave} />
      </Modal>
    </>
  )
}
