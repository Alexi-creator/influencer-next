"use client"

import { createContext, type ReactNode, useState } from "react"
import { Modal } from "@/components/ui/Modal"
import type { ModalProps } from "@/types/modalTypes"

export interface GlobalModalProps extends Omit<ModalProps, "children"> {
  content?: ReactNode | null
}

export interface GlobalModalContextProps {
  setConfigModal: React.Dispatch<React.SetStateAction<GlobalModalProps>>
}

export const GlobalModalContext = createContext<GlobalModalContextProps>({
  setConfigModal: () => {},
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
    onClose: () => setConfigModal((prev) => ({ ...prev, isOpen: false })),
  })

  return (
    <GlobalModalContext value={{ setConfigModal }}>
      {children}
      <Modal onClose={() => setConfigModal({ ...configModal, isOpen: false })} {...configModal}>
        {configModal.content}
      </Modal>
    </GlobalModalContext>
  )
}
