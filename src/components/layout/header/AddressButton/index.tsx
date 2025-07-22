"use client"

import { useContext } from "react"
import clsx from "clsx"

import { Location } from "@/components/Location"

import LocationIcon from "@/icons/location.svg"
import LocationFullIcon from "@/icons/location-full.svg"

import { AddressStatusEnum } from "@/types/addressTypes"
import { GlobalModalContext } from "@/providers/GlobalModalProvider"

// import "./styles.scss"

interface AddressButtonProps {
  addressStatus: AddressStatusEnum
  address?: string
}

export const AddressButton = ({ addressStatus, address }: AddressButtonProps) => {
  const context = useContext(GlobalModalContext)
  // const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { setConfigModal } = context

  const handleOpenMainAddressModal = () => {
    setConfigModal(prev => ({
      ...prev,
      isOpen: true,
      title: "Куда доставить заказ?",
      className: "header__location",
      content: <Location setConfigModal={setConfigModal} />,
    }))
  }

  return (
    <>
      <button
        className={clsx("header__top-location", {
          "header__top-location--empty": addressStatus === AddressStatusEnum.EMPTY,
          "header__top-location--half": addressStatus === AddressStatusEnum.HALF,
          "header__top-location--full": addressStatus === AddressStatusEnum.FULL,
        })}
        onClick={handleOpenMainAddressModal}
      >
        {addressStatus === AddressStatusEnum.FULL && <LocationFullIcon />}
        {(addressStatus === AddressStatusEnum.EMPTY || addressStatus === AddressStatusEnum.HALF) && <LocationIcon />}

        <span className="header__top-location-address">
          {address}
        </span>

        <span className="header__top-location-cta">
          {(addressStatus === AddressStatusEnum.EMPTY || addressStatus === AddressStatusEnum.HALF) && "Укажите точный адрес"}
        </span>
      </button>
    </>
  )
}
