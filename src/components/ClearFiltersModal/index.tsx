import { Button } from "@/components/ui/Button"

import "./styles.scss"

interface ClearFiltersModalProps {
  onReset: () => void
  onCloseModal: () => void
}

export const ClearFiltersModal = ({ onReset = () => {}, onCloseModal = () => {} }: ClearFiltersModalProps) => {
  return (
    <div className="clear-filter-content-popup">
      <div className="clear-filter-content-popup__inner">
        <div className="clear-filter-content-popup__title">Сбросить фильтры?</div>
        <div className="clear-filter-content-popup__descr">Все настроенные Вами фильтры будут удалены. Это действие невозможно отменить.</div>
        <div className="clear-filter-content-popup__actions">
          <Button className="btn--text btn--color-grey" onClick={onCloseModal}>
            Еще подумаю
          </Button>

          <Button
            onClick={() => {
              onReset()
              onCloseModal()
            }}
          >
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  )
}
