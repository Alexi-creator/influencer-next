"use client"

import clsx from "clsx"
import { useContext } from "react"
import { Location } from "@/components/Location"
import { LocationFullIcon } from "@/icons/LocationFullIcon"
import { LocationIcon } from "@/icons/LocationIcon"
import { AddressContext } from "@/providers/AddressProvider"
import { GlobalModalContext } from "@/providers/GlobalModalProvider"
import { ADDRESS_STATUS } from "@/types/addressTypes"

export const AddressButton = () => {
  const addressContext = useContext(AddressContext)
  const { addressInfo } = addressContext
  const { addressStatus, currentAddress } = addressInfo

  const globalModalContext = useContext(GlobalModalContext)
  const { setConfigModal } = globalModalContext

  const handleOpenMainAddressModal = () => {
    setConfigModal((prev) => ({
      ...prev,
      isOpen: true,
      title: "Куда доставить заказ?",
      className: "header__location",
      content: <Location setConfigModal={setConfigModal} />,
    }))
  }

  return (
    <button
      className={clsx("header__top-location", {
        "header__top-location--empty": addressStatus === ADDRESS_STATUS.EMPTY,
        "header__top-location--half": addressStatus === ADDRESS_STATUS.HALF,
        "header__top-location--full": addressStatus === ADDRESS_STATUS.FULL,
      })}
      onClick={handleOpenMainAddressModal}
    >
      {addressStatus === ADDRESS_STATUS.FULL && <LocationFullIcon />}
      {(addressStatus === ADDRESS_STATUS.EMPTY || addressStatus === ADDRESS_STATUS.HALF) && <LocationIcon />}

      <span className="header__top-location-address">{currentAddress}</span>

      <span className="header__top-location-cta">
        {(addressStatus === ADDRESS_STATUS.EMPTY || addressStatus === ADDRESS_STATUS.HALF) && "Укажите точный адрес"}
      </span>
    </button>
  )
}
