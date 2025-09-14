"use client"

import { use, useRef, useState } from "react"
import clsx from "clsx"
import Image from "next/image"

import { GlobalModalContext } from "@/providers/GlobalModalProvider"

import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Autocomplete } from "@/components/ui/Autocomplete"
import { Button } from "@/components/ui/Button"
import { Select } from "@/components/ui/Select"

import { GalleryCard } from "@/components/ui/GalleryCard"
import { Ticker } from "@/components/ui/Ticker"
import { Checkbox } from "@/components/ui/Checkbox"
import { Radio } from "@/components/ui/Radio"
import { Counter } from "@/components/ui/Counter"
import { Rating } from "@/components/ui/Rating"
import { Collapse } from "@/components/ui/Collapse"
import { Modal } from "@/components/ui/Modal"
import { Badge } from "@/components/ui/Badge"
import { Swiper } from "@/components/ui/Swiper"

import { ArrowIcon } from "@/icons/ArrowIcon"
import { CameraIcon } from "@/icons/CameraIcon"
import { CheckboxIcon } from "@/icons/CheckboxIcon"
import { InfoIcon } from "@/icons/InfoIcon"
import { FiltersIcon } from "@/icons/FiltersIcon"
import { LoadingIcon } from "@/icons/LoadingIcon"
import { PlusIcon } from "@/icons/PlusIcon"
import { SearchIcon } from "@/icons/SearchIcon"

import { RangeSlider } from "@/components/ui/RangeSlider"
import { Divider } from "@/components/ui/Divider"
import { Progress } from "@/components/ui/Progress"
import { Tabs } from "@/components/ui/Tabs"
import { Chip } from "@/components/ui/Chip"

import { scrollTo } from "@/utils/scrollTo"
import { Tooltip } from "@/components/ui/Tooltip"

import "./styles.scss"

export const UiKitComponents = () => {
  const context = use(GlobalModalContext)
  const { setConfigModal } = context

  const [isOpen1, setIsOpen1] = useState<boolean>(false)
  const [isOpen2, setIsOpen2] = useState<boolean>(false)
  const [isOpen3, setIsOpen3] = useState<boolean>(false)

  const elemScrollRef = useRef<HTMLDivElement | null>(null)

  const handleSetGlobalModal = () => {
    setConfigModal((prev) => ({ ...prev, isOpen: true, content: <div>global Modal</div> }))
  }

  return (
    <div className="ui-kit">

      <h2>Breadcrumbs:</h2>
      <div className="ui-kit__block ui-kit__breadcrumbs">
        <Breadcrumbs
          items={[
            { text: "Платья и сарафаны", href: "#" },
            { text: "Блузы и рубашки", href: "#" },
            { text: "Юбки", href: "" },
            { text: "+ еще 12", href: "" },
          ]}
        />
      </div>

      <div className="ui-kit__block ui-kit__breadcrumbs">
        <Breadcrumbs
          className="breadcrumbs--primary"
          items={[
            { text: "Платья и сарафаны", href: "#" },
            { text: "Блузы и рубашки", href: "#" },
            { text: "Юбки", href: "" },
            { text: "+ еще 12", href: "" },
          ]}
        />
      </div>

      <h2>Buttons:</h2>

      <div className="ui-kit__block ui-kit__buttons">
        <Button>
          Standart
        </Button>

        <Button className="btn--color-primary-light">
          primary light
        </Button>

        <Button className="btn--color-primary-light-text-black">
          primary light text black
        </Button>

        <Button className="btn">
          Count <span className="btn__suffix">(7)</span>
        </Button>

        <Button className="btn--text">
          Text
        </Button>

        <Button className="btn--none">
          Text padding height 0
        </Button>

        <Button className="btn--color-green">
          Color green
        </Button>

        <Button className="btn--text btn--color-grey">
          Text grey
        </Button>

        <Button className="btn--small">
          Small
        </Button>

        <Button className="btn--outlined">
          Outlined
        </Button>

        <Button className="btn--tag">
          Tag
        </Button>

        <Button className="btn--tag btn--tag-checked">
          Tag checked
        </Button>

        <Button className="btn--green">
          Green
        </Button>

        <Button className="btn--outlined btn--color-grey">
          Outlined grey with icons
          <FiltersIcon />
        </Button>

        <Button disabled>
          Disabled
        </Button>

        <Button className="btn--dashed">
          Dashed
        </Button>

        <Button className="btn--loading active">
          Loading active
          <LoadingIcon />
        </Button>

        <Button className="btn--loading active" disabled>
          Loading disabled
          <LoadingIcon />
        </Button>
      </div>

      <div className="ui-kit__block ui-kit__block--primary ui-kit__buttons">
        <button className="btn btn--color-white">
          color white
          <FiltersIcon />
        </button>
      </div>

      <h2>Input:</h2>
      <div className="ui-kit__block ui-kit__input">
        <Input
          name="input1"
          placeholder="Простой инпут"
        />
      </div>

      <div className="ui-kit__block ui-kit__input">
        <Input
          name="input2"
          placeholder="Инпут с элементом слева"
          prefixNode={<SearchIcon />}
        />
      </div>

      <div className="ui-kit__block ui-kit__input">
        <Input
          name="input3"
          placeholder="Инпут с элементом слева и справа"
          prefixNode={<SearchIcon />}
          suffixNode={<CheckboxIcon />}
        />
      </div>

      <div className="ui-kit__block ui-kit__input">
        <Input
          name="input4"
          placeholder="Инпут меньшего размера"
          className="input--small"
          prefixNode={<SearchIcon />}
          suffixNode={<CheckboxIcon />}
        />
      </div>

      <div className="ui-kit__block ui-kit__input">
        <Input
          name="input5"
          type="password"
          placeholder="Пароль с серой рамкой"
          className="input--color-grey"
          prefixNode={<SearchIcon />}
          suffixNode={<CheckboxIcon />}
        />
      </div>

      <div className="ui-kit__block ui-kit__input">
        <Input
          name="input6"
          type="password"
          placeholder="Задизейбленный инпут"
          className="input--color-grey input--disabled"
          disabled
        />
      </div>

      <h4>Input type file upload</h4>
      <div className="ui-kit__block ui-kit__input">
        <Input
          name="input7"
          type="file"
          placeholder=""
          className="input--upload"
          prefixNode={<PlusIcon />}
        />
      </div>

      <h4>Input type file upload (disabled)</h4>
      <div className="ui-kit__block ui-kit__input">
        <Input
          name="input8"
          type="file"
          placeholder=""
          className="input--upload input--disabled"
          prefixNode={<PlusIcon />}
          disabled
        />
      </div>

      <h2>TextArea:</h2>
      <Textarea
        name="textarea"
        placeholder="Введите текст"
      />

      <h2>TextArea с серой рамкой:</h2>
      <Textarea
        name="textarea-grey"
        placeholder="Введите текст"
        className="textarea__input--grey"
      />

      <h2>Select:</h2>
      <div className="ui-kit__block ui-kit__select">
        <Select
          name="select"
          options={[
            { value: "Везде", label: "Везде" },
            { value: "Везде2", label: "Везде2" },
            { value: "Везде3 очень длинный текст", label: "Везде3 очень длинный текст" },
          ]}
          initialLabel="Везде"
          initialValue="Везде"
        />

        <Select
          name="select2"
          options={[
            { value: "Везде", label: "Везде" },
            { value: "Везде2", label: "Везде2" },
            { value: "Везде3 очень длинный текст", label: "Везде3 очень длинный текст" },
          ]}
          initialLabel="Везде"
          initialValue="Везде"
          className="select--transparent"
        />

        <Select
          name="select3"
          options={[
            { value: "Везде", label: "Везде" },
            { value: "Везде2", label: "Везде2" },
            { value: "Везде3 очень длинный текст", label: "Везде3 очень длинный текст" },
          ]}
          initialLabel="Везде"
          initialValue="Везде"
          className="select--border-grey"
        />

        <Select
          name="select4"
          options={[
            { value: "option1", label: "Очень много опций 1" },
            { value: "option2", label: "Очень много опций 2" },
            { value: "option3", label: "Очень много опций 3" },
            { value: "option4", label: "Очень много опций 4" },
            { value: "option5", label: "Очень много опций 5" },
            { value: "option6", label: "Очень много опций 6" },
            { value: "option7", label: "Очень много опций 7" },
            { value: "option8", label: "Очень много опций 8" },
            { value: "option9", label: "Очень много опций 9" },
            { value: "option10", label: "Очень много опций 10" },
          ]}
          initialLabel="Очень много опций10"
          initialValue="option10"
        />
      </div>

      <h2>Autocomplete:</h2>
      <div className="ui-kit__block ui-kit__autocomplete">
        <Autocomplete
          id="autocomplete1"
          name="autocomplete1"
          placeholder="ui-kit-autocomplete"
          prefixNode={<SearchIcon />}
          initialOptions={[
            {
              value: "val1",
              label: "Женское платье Lovely Ran с расклешенными рукавами и круглой",
            },
            {
              value: "val2",
              label: "Короткое платье из денима с \"Gucci Boutique\"",
            },
          ]}
        />
      </div>

      <div className="ui-kit__block ui-kit__autocomplete">
        <Autocomplete
          id="autocomplete-grey"
          name="autocomplete-grey"
          placeholder="ui-kit-autocomplete grey"
          prefixNode={<SearchIcon />}
          inputClassName="input--small input--color-grey"
          initialOptions={[
            {
              value: "val1",
              label: "Женское платье Lovely Ran с расклешенными рукавами и круглой",
            },
            {
              value: "val2",
              label: "Короткое платье из денима с \"Gucci Boutique\"",
            },
          ]}
        />
      </div>

      <h2>Search Autocomplete:</h2>
      <div className="ui-kit__block ui-kit__search">
        <Autocomplete
          id="search"
          name="search"
          placeholder="Найдите что-нибудь"
          className="header__nav-search-input autocomplete--img autocomplete--select"
          prefixNode={<SearchIcon />}
          suffixNode={
            <Select
              name="select-search"
              className="select--transparent"
              initialValue="value1"
              initialLabel="Везде"
              options={[
                { value: "value1", label: "Везде" },
                { value: "value2", label: "value 2" },
              ]}
            />}
          inputClassName="autocomplete__input"
          initialOptions={[
            {
              value: "val1",
              label: "Женское платье Lovely Ran с расклешенными рукавами и круглой",
              subLabel: "Товары с Aliexpress.ru",
              href: "#",
              imgSrc: "/images/avatar.jpg",
            },
            {
              value: "val2",
              label: "Короткое платье из денима с \"Gucci Boutique\"",
              subLabel: "Gucci",
              href: "#",
              imgSrc: "/images/sp-slide2.jpg",
            },
          ]}
          renderOption={({ href, imgSrc, value, label, subLabel }, isActive, onClick) => (
            <a
              key={value}
              href={href}
              className={clsx("autocomplete__options-item", {
                "active": isActive,
              })}
              data-value={value}
              tabIndex={0}
              onClick={onClick}
            >
              {imgSrc && (
                <Image
                  className="autocomplete__options-item-img"
                  src={imgSrc}
                  alt="empty"
                  width={32}
                  height={48}
                  priority
                />
              )}
              <div className="autocomplete__options-item-title">{label}</div>
              <div className="autocomplete__options-item-subtitle">{subLabel}</div>
            </a>
          )}
        />
      </div>

      <h2>Gallery-card:</h2>
      <div className="ui-kit__block ui-kit__gallery-card">
        <GalleryCard cards={[
          "/images/publication.jpg",
          "/images/avatar.jpg",
          "/images/product-first.png",
          "/images/product-card.jpg",
          "/images/product-card2.jpg",
          "/images/sp-slide1.jpg",
          "/images/sp-slide2.jpg",
          "/images/sp-slide3.jpg",
          "/images/sp-slide4.jpg"]}
        />
      </div>

      <h2>Бегущая строка:</h2>
      <div className="ui-kit__block ui-kit__ticker">
        <Ticker text="Наведи на меня курсором! Длинный текст который не вмещается в блоке." />
      </div>

      <h2>Checkbox:</h2>
      <div className="ui-kit__block ui-kit__checkbox">
        <Checkbox
          value = "1"
          name="checkbox"
          isUncontrolled
          disabled
        >
          text
        </Checkbox>
        <Checkbox
          value = "2"
          name="checkbox"
          isUncontrolled
        >
          text 2
        </Checkbox>
        <Checkbox
          value = "3"
          name="checkbox"
          className="checkbox--tag"
          labelClassName="btn btn--tag btn--small"
          isUncontrolled
        >
          По цене
        </Checkbox>
        <Checkbox
          value = "4"
          name="checkbox"
          className="checkbox--tag"
          labelClassName="btn btn--tag btn--small"
          isUncontrolled
        >
          По популярности
        </Checkbox>
      </div>

      <h2>Radio:</h2>
      <div className="ui-kit__block ui-kit__radio" ref={elemScrollRef}>
        <Radio
          name="radio-uikit"
          value="1"
          disabled
          isUncontrolled
        >
          text
        </Radio>
        <Radio
          name="radio-uikit"
          value="2"
          isUncontrolled
        >
          text
        </Radio>
        <Radio
          name="radio-uikit"
          value="3"
          isUncontrolled
        >
          text
        </Radio>
        <Radio
          name="radio-uikit"
          value="4"
          isUncontrolled
        >
          text
        </Radio>
        <Radio
          name="radio-uikit"
          value="5"
          isUncontrolled
        >
          active
        </Radio>
        <Radio
          name="radio-uikit"
          value="btn"
          className="radio--btn"
          isUncontrolled
        >
          <span className="btn btn--color-white">
            like button
            <FiltersIcon />
          </span>
        </Radio>
      </div>

      <h2>Counter:</h2>
      <div className="ui-kit__block ui-kit__counter">
        <Counter color="green">9</Counter>
        <Counter color="primary">1</Counter>
        <Counter color="red">32</Counter>
        <Counter color="grey">10</Counter>
      </div>

      <h2>Rating:</h2>
      <div className="ui-kit__block">
        <Rating initialRate={3} />
      </div>

      <h2>Rating:Rating hover (active select):</h2>
      <div className="ui-kit__block">
        <Rating
          name="rating"
          className="rating--select"
        />
      </div>

      <h2>Collapse:</h2>
      <Collapse
        title="Title"
        initialOpen={true}
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt neque quidem non,
          voluptatem velit quo laudantium ex minus error rem officia, nulla a nobis iure est vitae!
          Voluptas, delectus accusamus.
        </div>
      </Collapse>

      <h2>Collapse initial close:</h2>
      <Collapse
        title="Title (закрыт изначально)"
        initialOpen={false}
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt neque quidem non,
          voluptatem velit quo laudantium ex minus error rem officia, nulla a nobis iure est vitae!
          Voluptas, delectus accusamus.
        </div>
      </Collapse>

      <h2>Collapse with custom icon:</h2>
      <Collapse
        title="Title с кастомной иконкой"
        initialOpen={false}
        CustomIcon={<ArrowIcon />}
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt neque quidem non,
          voluptatem velit quo laudantium ex minus error rem officia, nulla a nobis iure est vitae!
          Voluptas, delectus accusamus.
        </div>
      </Collapse>

      <h2>Modals:</h2>
      <Modal
        isOpen={isOpen1}
        onClose={() => setIsOpen1(false)}
      >
        <div>content Modal 1</div>
      </Modal>

      <Modal
        isOpen={isOpen2}
        title="Modal c title и без кнопки закрытия"
        isCloseIcon={false}
        onClose={() => setIsOpen2(false)}
      >
        <div>Modal 2</div>
      </Modal>

      <Modal
        isOpen={isOpen3}
        title="Modal c title и с кнопкой закрытия"
        onClose={() => setIsOpen3(false)}
      >
        <div>Контент модалки</div>
      </Modal>

      <Button onClick={() => setIsOpen1(true)}>open Modal 1</Button>
      <Button onClick={() => setIsOpen2(true)}>open Modal 2</Button>
      <Button onClick={() => setIsOpen3(true)}>Modal c title</Button>

      <Button onClick={handleSetGlobalModal}>Global Modal</Button>

      <h2>Badge:</h2>
      <div className="ui-kit__block ui-kit__block--primary ui-kit__badges">
        <Badge>
          -50%
        </Badge>
        <Badge>
          <CameraIcon />
        </Badge>
        <Badge>
          СП
        </Badge>
        <Badge>
          TFF
        </Badge>
        <Badge className="badge--big">
          BIG
        </Badge>
        <Badge className="badge--small">
          small
        </Badge>
        <Badge className="badge--round badge--font-commissioner badge--color-white">
          Round
        </Badge>
        <Badge className="badge--big badge--without-border">
          big without border
        </Badge>
        <Badge className="badge--font-commissioner">
          font commissioner
        </Badge>
      </div>

      <div className="ui-kit__block ui-kit__badges">
        <Badge className="badge--font-commissioner badge--color-primary-light badge--without-border">
          color light primary
        </Badge>
        <Badge className="badge--font-commissioner badge--color-green badge--without-border">
          color green
        </Badge>
        <Badge className="badge--font-commissioner badge--color-grey badge--without-border">
          color grey
        </Badge>
      </div>

      <h2>Swiper:</h2>
      <div className="ui-kit__block ui-kit__swiper-btns">
        Дефолтный вариант:
        <Swiper
          slides={["Slide 1", "Slide 2", "Slide 3"]}
        />
        <br />

        С пагинацией:
        <Swiper
          slides={[
            <Image
              key="publication"
              src="/images/avatar-influencer.jpg"
              height={250}
              width={250}
              alt="1"
            />,
            <Image
              key="avatar"
              src="/images/post-louis-vuitton.png"
              height={250}
              width={250}
              alt="2"
            />,
            <Image
              key="product-first"
              src="/images/post-card-img-white.png"
              height={250}
              width={250}
              alt="3"
            />,
          ]}
          showPagination
          slidesPerView={1}
        />
        <br />

        Без пагинации и навигации:
        <Swiper
          slides={["Slide 1", "Slide 2", "Slide 3"]}
          showNavigation={false}
        />
        <br />
      </div>

      <h2>Range Slider nouislider:</h2>
      <div className="ui-kit__block ui-kit__slider">
        <RangeSlider
          min={0}
          max={100000}
          step={1000}
          initialMin={10000}
          initialMax={60000}
        />
      </div>

      <div className="ui-kit__block ui-kit__slider">
        <RangeSlider
          min={0}
          max={100}
          step={1}
          initialMin={10}
          initialMax={60}
          currencySymbol="%"
        />
      </div>

      <h2>Divider:</h2>
      <div className="ui-kit__block ui-kit__divider">
        <Divider />
      </div>

      <h2>Progress:</h2>
      <div className="ui-kit__block ui-kit__progress">
        <Progress color="primary" width="35%" />
        <Progress color="green" width="85%" />
        <Progress color="grey" width="20%" />
      </div>

      <h2>Tabs</h2>
      <div className="ui-kit__block ui-kit__tabs">
        <Tabs
          initialActiveTab="goods"
          tabs={[
            { path: "goods", label: "Товары", count: 501, content: "content Товары" },
            { path: "sp", label: "Совместные покупки", count: 79, content: "content Совместные покупки" },
            { path: "tff", label: "Test For Free", count: 13, content: "content Test For Free" },
            { path: "contacts", label: "Контакты", content: "Контакты" },
          ]}
        />
      </div>
      <h2>Tabs с раздельными табами:</h2>
      <div className="ui-kit__block ui-kit__tabs">
        <Tabs
          className="tabs--split"
          initialActiveTab="goods"
          tabs={[
            { path: "goods", label: "Товары", count: 501, content: "content Товары" },
            { path: "sp", label: "Совместные покупки", count: 79, content: "content Совместные покупки" },
            { path: "tff", label: "Test For Free", count: 13, content: "content Test For Free" },
            { path: "contacts", label: "Контакты", content: "Контакты" },
          ]}
        />
      </div>

      <h2>Chips:</h2>
      <div className="ui-kit__block ui-kit__chips">
        <Chip
          title="Размеры"
          content="36, 38, 40"
          count={22}
        />
        <Chip
          title="Размеры2"
          content="36, 38, 40"
          count={42}
        />
        <Chip
          title="Размеры3"
          content="36, 38, 40"
          count={18}
        />
      </div>

      <h2>Scroll:</h2>
      <div className="ui-kit__block ui-kit__scroll">
        <Button onClick={() => scrollTo()}>
          Скролл до верха
        </Button>

        <Button onClick={() => scrollTo(elemScrollRef.current)}>
          Скролл до Radio
        </Button>
      </div>

      <h2>Tooltip:</h2>
      <div className="ui-kit__block">
        <Tooltip
          // eslint-disable-next-line max-len
          content="Тултип Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eius obcaecati at laboriosam veniam impedit laudantium velit atque nemo ducimus sint inventore, dolore qui hic doloremque voluptatum perferendis labore quasi!"
        >
          <InfoIcon color="red" />
        </Tooltip>
      </div>

    </div>)
}
