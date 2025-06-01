import LoadingIcon from "../../../icons/loading.svg"
import FiltersIcon from "../../../icons/filters.svg"
import SearchIcon from "../../../icons/search.svg"
import CheckboxIcon from "../../../icons/checkbox.svg"
import PlusIcon from "../../../icons/plus.svg"

import "./style.scss"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Autocomplete } from "@/components/ui/Autocomplete"
import { Button } from "@/components/ui/Button"
import { Select } from "@/components/ui/Select"
import Image from "next/image"

export const UiKitComponents = () => {
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

      <h2>Search:</h2>
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
          options={[
            {
              value: "val1",
              label: "Женское платье Lovely Ran с расклешенными рукавами и круглой",
              subLabel: "Товары с Aliexpress.ru",
              href: "#",
              imgSrc: "/images/avatar.jpg",
              className: "autocomplete__options-item",
            },
            {
              value: "val2",
              label: "Короткое платье из денима с \"Gucci Boutique\"",
              subLabel: "Gucci",
              href: "#",
              imgSrc: "/images/sp-slide2.jpg",
              className: "autocomplete__options-item",
            },
          ]}
          renderOptions={options => options.map(({ href, imgSrc, value, label, subLabel }) => (
            <a key={value} href={href} className={"autocomplete__options-item"} data-value={value} tabIndex={0}>
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
          ))}
        />
      </div>
    </div>
  )
}
