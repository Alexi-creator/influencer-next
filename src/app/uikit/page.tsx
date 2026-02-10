export const dynamic = "force-static"

import { UiKitComponents } from "@/components/pageComponents/UiKitComponents"
import { Section } from "@/components/ui/Section"

import "./styles.scss"

export default function UiKitPage() {
  return (
    <Section className="section--uikit" noInner>
      <UiKitComponents />
    </Section>
  )
}
