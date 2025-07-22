"use client"

import { createContext, useState, ReactNode } from "react"

import { ModalProps } from "@/types/modalTypes"

import { Modal } from "@/components/ui/Modal"

export interface GlobalModalProps extends Omit<ModalProps, "children"> {
  content?: ReactNode | null
}

export interface GlobalModalContextProps {
  setConfigModal: React.Dispatch<React.SetStateAction<GlobalModalProps>>
}

export const GlobalModalContext = createContext<GlobalModalContextProps>({
  setConfigModal: () => {}
})

export const GlobalModalProvider = ({ children }: { children: ReactNode }) => {
  const [configModal, setConfigModal] = useState<GlobalModalProps>({
    isOpen: false,
    title: "",
    titleClassName: "",
    iconCloseClassName: "",
    isCloseIcon: true,
    className: "",
    content: <></>,
    onClose: () => setConfigModal(prev => ({ ...prev, isOpen: false })),
  })

  return (
    <GlobalModalContext value={{ setConfigModal }}>
      {children}
      <Modal
        {...configModal}
      >
        {configModal.content}
      </Modal>
    </GlobalModalContext>
  )
}
