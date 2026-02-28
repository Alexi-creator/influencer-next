"use client"

import clsx from "clsx"
import { useState } from "react"
import { Steps } from "@/components/Steps"
import { Button } from "@/components/ui/Button"
import { LoadingIcon } from "@/icons/LoadingIcon"
import type { PublicationGoodsItemTypes } from "@/types/addPublicationGoods.schema"
import { GalleryCard } from "../ui/GalleryCard"
import { Modal } from "../ui/Modal"
import { AddPublicationChooseGoods } from "./AddPublicationChooseGoods"
import { AddPublicationFilling } from "./AddPublicationFilling"
import { AddPublicationPreview } from "./AddPublicationPreview"
import { AddPublicationSelectedGoods } from "./AddPublicationSelectedGoods"

import "./styles.scss"

const STEP = {
  chooseGoods: "chooseGoods",
  filling: "filling",
  preview: "preview",
  imageCreated: "imageCreated",
} as const

type StepId = (typeof STEP)[keyof typeof STEP]

const STEPS = [
  { id: STEP.chooseGoods, name: "Выбор товаров" },
  { id: STEP.filling, name: "Наполнение" },
  { id: STEP.preview, name: "Предпросмотр" },
  { id: STEP.imageCreated, name: "Образ создан" },
]

export const AddPublication = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(STEP.chooseGoods)
  const [selectedGoods, setSelectedGoods] = useState<PublicationGoodsItemTypes[]>([])
  const [isSelectedOpen, setIsSelectedOpen] = useState(false)

  const currentIndex = STEPS.findIndex((s) => s.id === currentStep)
  const isFirstStep = currentIndex === 0
  const isLastStep = currentStep === STEP.preview
  const hasSelectedGoods = selectedGoods.length > 0

  const handleNext = () => {
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].id as StepId)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].id as StepId)
    }
  }

  const handlePublish = () => {
    setCurrentStep(STEP.imageCreated)
  }

  return (
    <div className="add-publication">
      <div className="add-publication__inner">
        <Steps steps={STEPS} currentStep={currentStep} />

        <div className="add-publication__step-contents">
          {/* Блок 1 шага (Выбор товара) */}
          <div
            className={clsx("add-publication__step-content add-publication__choose-goods", {
              active: currentStep === STEP.chooseGoods,
            })}
          >
            <AddPublicationChooseGoods
              selectedGoods={selectedGoods}
              onSelectedGoodsChange={setSelectedGoods}
            />

            <Modal
              isOpen={isSelectedOpen}
              className="add-publication__selected modal--no-overlay"
              onClose={() => setIsSelectedOpen(false)}
            >
              <AddPublicationSelectedGoods
                selectedGoods={selectedGoods}
                onClearAll={() => {
                  setSelectedGoods([])
                  setIsSelectedOpen(false)
                }}
                onClose={() => setIsSelectedOpen(false)}
                onToggleItem={(item) =>
                  setSelectedGoods((prev) => prev.filter((g) => g.id !== item.id))
                }
              />
            </Modal>
          </div>

          {/* Блок 2 шага (Наполнение) */}
          <div
            className={clsx("add-publication__step-content add-publication__filling", {
              active: currentStep === STEP.filling,
            })}
          >
            <AddPublicationFilling selectedGoods={selectedGoods} />
          </div>

          {/* Блок 3 шага (Предпросмотр) */}
          <div
            className={clsx("add-publication__step-content add-publication__preview", {
              active: currentStep === STEP.preview,
            })}
          >
            <AddPublicationPreview />
          </div>

          {/* Блок с кнопками управления шагами (назад вперед, ...) */}
          <div
            className={clsx("add-publication__actions", {
              "add-publication__actions--first-step": isFirstStep,
            })}
          >
            <Button
              className={clsx("add-publication__actions-site btn--text btn--color-grey", {
                active: currentStep === STEP.chooseGoods,
              })}
            >
              Добавить товар с другого сайта
            </Button>

            {!isFirstStep && (
              <Button
                className="add-publication__actions-prev btn--color-primary-light"
                onClick={handlePrev}
              >
                Назад
              </Button>
            )}

            {hasSelectedGoods && (
              <Button
                className={clsx("add-publication__actions-preview btn--outlined", {
                  active: hasSelectedGoods,
                })}
                onClick={() => setIsSelectedOpen((prev) => !prev)}
              >
                <div className="add-publication__actions-preview-wrapper">
                  <div className="add-publication__actions-preview-choose">Вы выбрали</div>
                  <div className="add-publication__actions-preview-goods">
                    <GalleryCard
                      className="add-publication__actions-preview-goods-gallery active"
                      cards={selectedGoods.map((g) => g.img)}
                    />
                    <span className="add-publication__actions-preview-goods-count">
                      {selectedGoods.length} товара
                    </span>
                  </div>
                </div>
                <div className="add-publication__actions-preview-action">
                  {isSelectedOpen ? "Скрыть" : "Посмотреть"}
                </div>
              </Button>
            )}

            <Button
              className={clsx("add-publication__actions-next", {
                active: !isLastStep,
              })}
              disabled={!hasSelectedGoods}
              onClick={handleNext}
            >
              Далее
            </Button>

            {isLastStep && (
              <Button
                className="add-publication__actions-publication btn--loading"
                onClick={handlePublish}
              >
                Опубликовать
                <LoadingIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
