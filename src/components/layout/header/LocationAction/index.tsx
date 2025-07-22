"use client"

import { useContext } from "react"

import { Location } from "@/components/Location"

import MapIcon from "@/icons/map.svg"

// import { AddressStatusEnum } from "@/types/addressTypes"
import { GlobalModalContext } from "@/providers/GlobalModalProvider"

// import "./styles.scss"

// interface LocationActionProps {
//   // addressStatus: AddressStatusEnum
// }

export const LocationAction = () => {
  const context = useContext(GlobalModalContext)
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
      <MapIcon onClick={handleOpenMainAddressModal} />
    </>
  )
}
