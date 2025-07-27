"use client"

import { useContext, useState } from "react"
import Image from "next/image"
import clsx from "clsx"

import { AddressContext } from "@/providers/AddressProvider"
import { GlobalModalProps } from "@/providers/GlobalModalProvider"

import { AddressStatusEnum } from "@/types/addressTypes"
import { deliveryMethodTypes } from "@/types/deliveryMethodTypes"

import { Button } from "@/components/ui/Button"
import { ChooseCity } from "@/components/ChooseCity"
import { Map } from "@/components/Map"

import { CrossIcon } from "@/icons/CrossIcon"
import { MapIcon } from "@/icons/MapIcon"

import "./styles.scss"

interface LocationProps {
  setConfigModal: React.Dispatch<React.SetStateAction<GlobalModalProps>>
}

interface stubsProps {
  id: number
  deliveryMethod: deliveryMethodTypes
  title: string
  address: string
  storagePeriod?: string
  contacts?: string
}

const stubs: stubsProps[] = [
  {
    id: 1,
    deliveryMethod: deliveryMethodTypes.PICKUP,
    title: "Отделение Почты России",
    address: "188508, г Санкт-Петербург, пр-кт Большой В.О., дом 70 литер А",
    storagePeriod: "15",
    contacts: "",
  },
  {
    id: 2,
    deliveryMethod: deliveryMethodTypes.COURIER,
    title: "Доставка по адресу",
    address: "188508, г Москва, пр-кт Космонавтов, дом 1",
    storagePeriod: "",
    contacts: "Маргарита А., +7 999 123 45 67",
  },
]

export const Location = ({ setConfigModal }: LocationProps) => {
  const context = useContext(AddressContext)
  const { addressInfo } = context
  const { addressStatus } = addressInfo

  // TODO вынести сохранение помимо бэка в провайдер AddressContext
  const [addressIdSelected, setAddressIdSelected] = useState<number>(0)

  const handleOpenChangeAddress = () => {
    setConfigModal(prev => ({
      ...prev,
      isOpen: true,
      title: "",
      content: <ChooseCity setConfigModal={setConfigModal} />,
    }))
  }

  const handleMapModal = () => {
    setConfigModal(prev => ({
      ...prev,
      isOpen: true,
      title: "",
      className: "modal--no-overlay header__map",
      content: <Map setConfigModal={setConfigModal} />,
    }))
  }

  return (
    <div className={clsx("location", {
      "location--setup": addressStatus === AddressStatusEnum.FULL,
    })}>
      <div className="location__inner">
        <div className={clsx("location__img", "location__not-setup")}>
          <Image src="/images/delivery.jpg" alt="delivery" width={100} height={100} />
        </div>

        <div className={clsx("location__descr", "location__setup")}>
          Выберите адрес, чтобы увидеть условия доставки
        </div>

        <div className="location__actions">
          <div className="location__actions-city">
            <MapIcon className="location__address-city-icon" />
            <span className="location__address-city-name">{addressInfo.currentAddress || "Москва"}</span>
          </div>
          <Button
            className="location__actions-change btn btn--text"
            onClick={handleOpenChangeAddress}
          >
            Изменить
          </Button>
        </div>

        <ul className={clsx("location__addresses", "location__setup")}>
          {stubs.map(item => (
            <li
              key={item.id}
              className={clsx("location__address", {
                "location__address--selected": addressIdSelected === item.id,
              })}
              role="button"
              tabIndex={0}
              onClick={() => setAddressIdSelected(item.id)}
            >
              <div className="location__address-header">
                <div className="location__address-option">{item.title}</div>
                <button className="location__address-remove">
                  <CrossIcon />
                </button>
              </div>
              <div className="location__address-address">{item.address}</div>
              {item.storagePeriod && (
                <div className="location__address-storage-period">
                  Срок хранения заказа -
                  <span className="location__address-storage-period-count">{item.storagePeriod} дней</span>
                </div>
              )}
              {item.contacts && (
                <div className="location__address-contacts">{item.contacts}</div>
              )}
            </li>
          ))}
        </ul>

        <div className="location__descr location__not-setup">
          Укажите точный адрес или выберите удобный пункт выдачи, чтобы заранее увидеть условия доставки товаров
        </div>
        <button className="location__button location__not-setup btn" onClick={handleMapModal}>
          Выбрать адрес на карте
        </button>
        <button className="location__button location__setup btn" onClick={handleMapModal}>
          Добавить новый адрес или пункт
        </button>
      </div>
    </div>
  )
}
