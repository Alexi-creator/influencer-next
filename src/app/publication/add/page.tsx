import type { Metadata } from "next"
import { AddPublication } from "@/components/AddPublication"
import { Title } from "@/components/Title"
import { Section } from "@/components/ui/Section"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Add Publication",
  description: "Create a new publication",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AddPublicationPage() {
  return (
    <>
      <Section>
        <Title
          title="Создание публикации"
          subscription="Создайте свою собственную публикацию с отзывом о товаре, рекомендацией или даже целым образом из товаров на площадке!"
        />
      </Section>

      <Section className="section--add-publication">
        <AddPublication />
      </Section>
    </>
  )
}
