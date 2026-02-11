"use client"

import { Button } from "@/components/ui/Button"
import { Section } from "@/components/ui/Section"

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Section noInner>
      <h1>Что-то пошло не так</h1>
      <p>Произошла непредвиденная ошибка</p>
      <Button onClick={reset}>Попробовать снова</Button>
    </Section>
  )
}
