"use client"

import type { JointPurchasesCardTypes } from "@/components/JointPurchasesCard"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

import { PlusIcon } from "@/icons/PlusIcon"

import "./styles.scss"

export interface JointPurchasesListTypes {
  data?: JointPurchasesCardTypes[]
  renderItems: (data?: JointPurchasesCardTypes[]) => React.ReactNode[] | undefined
}

export const JointPurchasesList = ({ data, renderItems }: JointPurchasesListTypes) => {
  return (
    <div className="joint-purchases">
      <div className="joint-purchases-actions">
        <div className="joint-purchases-search">
          <Input className="input--color-grey" placeholder="Введите название товара" />
        </div>

        <div className="joint-purchases-btn">
          <Button className="btn--color-primary-light">
            <span className="joint-purchases-btn-text">Создать СП</span>
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="joint-purchases-list">{renderItems(data)}</div>
    </div>
  )
}
