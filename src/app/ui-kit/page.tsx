export const dynamic = 'force-static';

import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <section className="section">
      <div className="section__inner">
        <h2>Buttons:</h2>
        
        <Button>
          Standart
        </Button>
        <Button className="btn--color-primary-light">
          primary light
        </Button>
        <Button className="btn--color-primary-light-text-black">
          primary light text black
        </Button>

        {/* 
      button.btn.btn--color-primary-light-text-black primary light text black
      button.btn
        | Count
        span.btn__suffix (7)
      button.btn.btn--text Text
      button.btn.btn--none Text padding height 0
      button.btn.btn--color-green Color green
      button.btn.btn--text.btn--color-grey Text grey
      button.btn.btn--small Small
      button.btn.btn--outlined Outlined
      button.btn.btn--tag Tag
      button.btn.btn--tag.btn--tag-checked Tag checked
      button.btn.btn--green Green
      button.btn.btn--outlined.btn--color-grey
        | Outlined grey with icons
        svg
          use(xlink:href="./img/icons/icons.svg#filters")
      button.btn(disabled) Disabled
      button.btn.btn--dashed Dashed
      button.btn.btn--loading.active
        | Loading active
        svg
          use(xlink:href="./img/icons/icons.svg#loading")
      button.btn.btn--loading.active(disabled)
        | Loading disabled
        svg
          use(xlink:href="./img/icons/icons.svg#loading")

    .ui-kit__block.ui-kit__block--primary.ui-kit__buttons
      button.btn.btn--color-white
        | color white
        svg
          use(xlink:href="./img/icons/icons.svg#filters") */}
      </div>
    </section>
  );
}
