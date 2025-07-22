export interface ModalProps {
  isOpen: boolean
  title?: React.ReactNode
  titleClassName?: string
  iconCloseClassName?: string
  className?: string
  isCloseIcon?: boolean
  media?: string
  children: React.ReactNode
  onClose?: () => void
}
