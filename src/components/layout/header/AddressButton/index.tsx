"use client"

import { useContext } from "react"
import clsx from "clsx"

import { AddressContext } from "@/providers/AddressProvider"
import { GlobalModalContext } from "@/providers/GlobalModalProvider"

import { AddressStatusEnum } from "@/types/addressTypes"

import { LocationFullIcon } from "@/icons/LocationFullIcon"
import { LocationIcon } from "@/icons/LocationIcon"

import { Location } from "@/components/Location"

export const AddressButton = () => {
  const addressContext = useContext(AddressContext)
  const { addressInfo } = addressContext
  const { addressStatus, currentAddress } = addressInfo

  const globalModalContext = useContext(GlobalModalContext)
  const { setConfigModal } = globalModalContext

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
          {currentAddress}
        </span>

        <span className="header__top-location-cta">
          {(addressStatus === AddressStatusEnum.EMPTY || addressStatus === AddressStatusEnum.HALF) && "Укажите точный адрес"}
        </span>
      </button>
    </>
  )
}
