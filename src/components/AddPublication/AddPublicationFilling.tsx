"use client"

import { Collapse } from "@/components/ui/Collapse"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { PlusIcon } from "@/icons/PlusIcon"

interface AddPublicationFillingProps {
  selectedGoods: string[]
}

export const AddPublicationFilling = ({ selectedGoods }: AddPublicationFillingProps) => {
  return (
    <form className="add-publication__filling-form">
      <Collapse
        className="add-publication__filling-selected collapse--arrow"
        title={
          <span className="add-publication__filling-selected-title">
            Выбранные товары ({selectedGoods.length})
          </span>
        }
      >
        <ul className="add-publication__filling-selected-content">
          {selectedGoods.map((id) => (
            <li key={id}>Товар {id}</li>
          ))}
        </ul>
      </Collapse>

      <div className="add-publication__filling-field-title">Придумайте заголовок</div>
      <div className="add-publication__filling-field-wrapper">
        <Input
          name="title-goods"
          type="text"
          placeholder="Заголовок образа"
          className="input-text--color-grey"
        />
      </div>

      <div className="add-publication__filling-field-title">Что стоит отметить в образе?</div>
      <div className="add-publication__filling-field-wrapper">
        <Textarea
          name="description"
          placeholder="Например, расскажите о концепции образа или сочетании цветов"
          className="add-publication__filling-field-description textarea__input--grey"
        />
      </div>

      <div className="add-publication__filling-field-media">
        <div className="add-publication__filling-field-media-img-wrapper">
          <div className="add-publication__filling-field-title">Добавьте фотографии</div>
          <div className="add-publication__filling-field-wrapper add-publication__filling-field-upload">
            <Input
              name="add-picture"
              type="file"
              className="input-text--color-grey input-text--upload add-publication__filling-field-upload-input"
              prefixNode={<PlusIcon />}
              multiple
            />
            <p className="add-publication__filling-field-upload-descr">
              До 8 изображений в формате PNG или JPG. Можно просто перетащить их в это окно
            </p>
            <div className="add-publication__filling-field-upload-files" />
            <p className="add-publication__filling-field-upload-info">
              Вы можете изменить порядок показа фотографий перетаскиванием. Чтобы посмотреть на фото
              в увеличенном масштабе, просто кликните на нее
            </p>
          </div>
        </div>

        <div className="add-publication__filling-field-media-video-wrapper">
          <div className="add-publication__filling-field-title">Есть видео? Вставьте ссылку</div>
          <div className="add-publication__filling-field-wrapper">
            <Input
              name="media-link"
              type="text"
              placeholder="Вставьте ссылку на нужное видео в это поле"
              className="input-text--color-grey"
            />
          </div>
        </div>
      </div>

      <div className="add-publication__filling-field-title">Прикрепите теги</div>
      <div className="add-publication__filling-field-wrapper">
        <Textarea
          name="tags"
          placeholder="Поле тегов"
          className="add-publication__filling-field-tags textarea__input--grey"
        />
      </div>
    </form>
  )
}
