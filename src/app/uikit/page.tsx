export const dynamic = "force-static"

import { UiKitComponents } from "@/components/pageComponents/UiKitComponents"

import "./styles.scss"

export default function UiKitPage() {
  return (
    <section className="section section--uikit">
      <UiKitComponents />
    </section>
  )
}
