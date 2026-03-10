"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { PlusIcon } from "@/icons/PlusIcon"

import "./styles.scss"

const schema = z.object({
  url: z.string().min(1, "Обязательное поле"),
  title: z.string().min(1, "Обязательное поле"),
  price: z.string().min(1, "Обязательное поле"),
  image: z.custom<FileList>((val) => val instanceof FileList && val.length > 0, "Обязательное поле"),
})

type FormValues = z.infer<typeof schema>

export const AddGoodsFromSite = () => {
  const {
    register,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  })

  return (
    <div className="add-goods-from-site">
      <div className="add-goods-from-site__inner">
        <p className="add-goods-from-site__title">
          Вставьте ссылку на страницу с нужным товаром и мы попробуем автоматически подставить
          информацию в поля ниже. Если что-то скопируется недостоверно, вы сможете изменить это
          вручную.
        </p>

        <form className="add-goods-from-site__form">
          <div className="add-goods-from-site__form-column">
            <div className="add-goods-from-site__form-field">
              <div className="add-goods-from-site__form-field-title">Вставьте ссылку</div>
              <Input
                type="text"
                placeholder="https://..."
                className={clsx("input--color-grey", { error: errors.url })}
                errorText={errors.url?.message}
                {...register("url")}
              />
            </div>

            <div className="add-goods-from-site__form-field">
              <div className="add-goods-from-site__form-field-title">Название</div>
              <Input
                type="text"
                placeholder="Введите название"
                className={clsx("input--color-grey", { error: errors.title })}
                errorText={errors.title?.message}
                {...register("title")}
              />
            </div>

            <div className="add-goods-from-site__form-field">
              <div className="add-goods-from-site__form-field-title">Стоимость</div>
              <Input
                type="text"
                placeholder="Введите стоимость"
                className={clsx("input--color-grey", { error: errors.price })}
                errorText={errors.price?.message}
                {...register("price")}
              />
            </div>
          </div>

          <div className="add-goods-from-site__form-column add-goods-from-site__form-column-second">
            <div className="add-goods-from-site__form-field">
              <div className="add-goods-from-site__form-field-title">Фото товара</div>
              <div className="add-goods-from-site__form-field-upload">
                <div className="add-goods-from-site__form-field-upload-input">
                  <Input
                    type="file"
                    className={clsx(
                      "input--disabled input--upload input--upload-small add-goods-from-site__form-field-upload",
                      { error: errors.image },
                    )}
                    prefixNode={<PlusIcon />}
                    errorText={errors.image?.message}
                    {...register("image")}
                  />
                </div>
                <div className="add-goods-from-site__form-field-upload-img" />
                <div
                  className="add-goods-from-site__form-field-upload-text"
                  data-text="Загрузить другое фото"
                >
                  Загрузить фото
                </div>
              </div>
            </div>

            <div className="add-goods-from-site__form-field">
              <div className="add-goods-from-site__form-field-title">
                Предпросмотр стороннего товара
              </div>
              <div className="add-goods-from-site__form-field-preview">
                <div className="add-goods-from-site__form-field-preview-plug">
                  <div className="add-goods-from-site__form-field-preview-plug-item" />
                  <div className="add-goods-from-site__form-field-preview-plug-item" />
                  <div className="add-goods-from-site__form-field-preview-plug-item" />
                  <div className="add-goods-from-site__form-field-preview-plug-item" />
                </div>
                <div className="add-goods-from-site__form-field-preview-img">
                  <div className="publication-item publication-item--grey">
                    <div className="publication-item__img" />
                    <div className="publication-item__content">
                      <div className="publication-item__title" />
                      <div className="publication-item__price">
                        <span className="publication-item__price-number" />
                      </div>
                      <div className="publication-item__descr">
                        <span className="add-publication__content-results-list-item-subtitle">
                          Товар с другого сайта
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button className="add-goods-from-site__form-btn" type="submit" disabled={!isValid}>
            Добавить
          </Button>
        </form>
      </div>
    </div>
  )
}
