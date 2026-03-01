import clsx from "clsx"
import { StepCheckIcon } from "@/icons/StepCheckIcon"
import { StepCircleIcon } from "@/icons/StepCircleIcon"
import { StepDividerIcon } from "@/icons/StepDividerIcon"

import "./styles.scss"

export interface StepItem {
  id: string
  name: string
}

interface StepsProps {
  steps: StepItem[]
  currentStep?: string
  className?: string
}

export const Steps = ({ steps, currentStep, className }: StepsProps) => {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className={clsx("steps", className)}>
      <div className="steps__inner">
        <div className="steps__items">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1
            const isCurrent = step.id === currentStep
            const isPassed = index < currentIndex

            return (
              <div
                key={step.id}
                className={clsx("steps__item", {
                  "steps__item--current": isCurrent,
                  "steps__item--passed": isPassed,
                })}
              >
                <div className="steps__item-wrapper">
                  <div className="steps__item-step">
                    {isLast ? <StepCheckIcon /> : index + 1}
                  </div>
                  <StepCircleIcon className="steps__item-circle" />
                </div>
                <div className="steps__item-line" />
                <div className="steps__item-name">{step.name}</div>
              </div>
            )
          })}
        </div>

        <div className="steps__divider">
          <StepDividerIcon />
        </div>
      </div>
    </div>
  )
}
