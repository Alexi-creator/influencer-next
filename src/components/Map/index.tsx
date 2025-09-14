"use client"

import { useState } from "react"
// import Image from "next/image"
import clsx from "clsx"

// import { AddressContext } from "@/providers/AddressProvider"
import { GlobalModalProps } from "@/providers/GlobalModalProvider"

// import { AddressStatusEnum } from "@/types/addressTypes"
import { deliveryMethodTypes } from "@/types/deliveryMethodTypes"

import { Autocomplete } from "@/components/ui/Autocomplete"
import { Location } from "@/components/Location"
import { Button } from "@/components/ui/Button"
import { Radio } from "@/components/ui/Radio"

import { ArrowGoLeftIcon } from "@/icons/ArrowGoLeftIcon"
import { CompassIcon } from "@/icons/CompassIcon"
import { CrossIcon } from "@/icons/CrossIcon"
import { LoadingIcon } from "@/icons/LoadingIcon"
import { SearchIcon } from "@/icons/SearchIcon"

import "./styles.scss"

interface MapProps {
  setConfigModal: React.Dispatch<React.SetStateAction<GlobalModalProps>>
}

export const Map = ({ setConfigModal }: MapProps) => {
  // const context = useContext(AddressContext)
  // const { addressInfo } = context
  // const { addressStatus } = addressInfo

  const [isLoadedMap, setIsLoadedMap] = useState<boolean>(false)
  const [deliveryMethod, setDeliveryMethod] = useState<deliveryMethodTypes>(deliveryMethodTypes.PICKUP)

  const handleOpenLocationModal = () => {
    setConfigModal(prev => ({
      ...prev,
      isOpen: true,
      title: "Куда доставить заказ?",
      className: "header__location",
      content: <Location setConfigModal={setConfigModal} />,
    }))
  }

  const handleCloseModal = () => setConfigModal(() => ({ isOpen: false }))
  const handleLoad = () => setIsLoadedMap(true)

  return (
    <div className={clsx("map", {
      "map--pickup": deliveryMethod === deliveryMethodTypes.PICKUP,
      "map--courier": deliveryMethod === deliveryMethodTypes.COURIER,
    })}>
      <div className="map__inner">
        <div className="map__header">
          <button className="map__header-back">
            <ArrowGoLeftIcon className="map__header-back-icon" onClick={handleOpenLocationModal} />
          </button>
          <div className="map__header-title">Способ доставки товаров</div>
          <div className="map__header-options">
            <Radio
              className={clsx("radio", "radio--active", "radio--reverse")}
              name="choose-delivery"
              value={deliveryMethodTypes.PICKUP}
              defaultChecked={deliveryMethod === deliveryMethodTypes.PICKUP}
              onCheckedChange={() => setDeliveryMethod(deliveryMethodTypes.PICKUP)}
            >
              Самовывоз
            </Radio>
            <Radio
              className={clsx("radio", "radio--active", "radio--reverse")}
              name="choose-delivery"
              value={deliveryMethodTypes.COURIER}
              defaultChecked={deliveryMethod === deliveryMethodTypes.COURIER}
              onCheckedChange={() => setDeliveryMethod(deliveryMethodTypes.COURIER)}
            >
              Курьером
            </Radio>
          </div>
          <Button
            className="map__header-cross btn--color-primary-light"
            onClick={handleCloseModal}
          >
            <CrossIcon className="map__header-cross-icon" />
          </Button>
        </div>

        <div className={clsx("map__yandex", {
          "map__yandex--load": isLoadedMap,
        })}>
          <iframe
            id="maps"
            width="100%"
            height="100%"
            frameBorder="0"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A537fae7c168826971fda4be15fc49e507e7378b4120e7181ce22ba085fc788eb&amp;source=constructor"
            loading="lazy"
            onLoad={handleLoad}
          ></iframe>
        </div>

        <div className="map__address">
          <div className="map__address-header">Куда доставить заказ?</div>
          <div className="map__address-descr">
            <div className="map__address-descr-pickup">
              Выберите пункт выдачи или найдите
            </div>
            <div className="map__address-descr-courier">
              Выберите адрес на карте или найдите
            </div>
          </div>
          <div className="map__address-actions">
            <Autocomplete
              id="pickup-autocomplete"
              name="pickup-autocomplete"
              className="map__address-actions-input map__autocomplete--pickup"
              placeholder="Пункт выдачи"
              prefixNode={<SearchIcon />}
              suffixNode={<div className="autocomplete__load">
                <LoadingIcon className="autocomplete__load-icon" />
              </div>}
            />

            <Autocomplete
              id="courier-autocomplete"
              name="courier-autocomplete"
              className="map__address-actions-input map__autocomplete--courier"
              placeholder="Адрес доставки"
              prefixNode={<SearchIcon />}
              suffixNode={<div className="autocomplete__load">
                <LoadingIcon className="autocomplete__load-icon" />
              </div>}
            />

            <button className="map__address-actions-define">
              <CompassIcon className="map__address-actions-define-icon" />
              Определить местоположение
            </button>

            <button className="btn map__btn map__btn--pickup" disabled>
              Продолжить
            </button>
            <button className="btn map__btn map__btn--courier" disabled>
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
