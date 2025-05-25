import { Button } from '../../ui/Button'

import './style.scss'

export const UiKitPage = () => {
  return (
    <div className="ui-kit">
      <h2>Buttons:</h2>

      <div className="ui-kit__block ui-kit__buttons">
        <Button>
          Standart
        </Button>
        <Button className="btn--color-primary-light">
          primary light
        </Button>
        <Button className="btn--color-primary-light-text-black">
          primary light text black
        </Button>

        <Button className="btn--color-primary-light-text-black">
          primary light text black
        </Button>

        <Button className="btn">
          Count <span className="btn__suffix">(7)</span>
        </Button>

        <Button className="btn--text">
          Text
        </Button>

        <Button className="btn--none">
          Text padding height 0
        </Button>

        <Button className="btn--color-green">
          Color green
        </Button>

        <Button className="btn--text btn--color-grey">
          Text grey
        </Button>

        <Button className="btn--small">
          Small
        </Button>

        <Button className="btn--outlined">
          Outlined
        </Button>

        <Button className="btn--tag">
          Tag
        </Button>

        <Button className="btn--tag btn--tag-checked">
          Tag checked
        </Button>

        <Button className="btn--green">
          Green
        </Button>

        <Button className="btn--outlined btn--color-grey">
          Outlined grey with icons
          <svg>
            <use xlinkHref="./img/icons/icons.svg#filters" />
          </svg>
        </Button>

        <Button disabled>
          Disabled
        </Button>

        <Button className="btn--dashed">
          Dashed
        </Button>

        <Button className="btn--loading active">
          Loading active
          <svg>
            <use xlinkHref="./img/icons/icons.svg#loading" />
          </svg>
        </Button>

        <Button className="btn--loading active" disabled>
          Loading disabled
          <svg>
            <use xlinkHref="./img/icons/icons.svg#loading" />
          </svg>
        </Button>

      </div>
    </div>

    //   button.btn.btn--color-primary-light-text-black primary light text black
    //   button.btn
    //     | Count
    //     span.btn__suffix (7)
    //   button.btn.btn--text Text
    //   button.btn.btn--none Text padding height 0
    //   button.btn.btn--color-green Color green
    //   button.btn.btn--text.btn--color-grey Text grey
    //   button.btn.btn--small Small
    //   button.btn.btn--outlined Outlined
    //   button.btn.btn--tag Tag
    //   button.btn.btn--tag.btn--tag-checked Tag checked
    //   button.btn.btn--green Green
    //   button.btn.btn--outlined.btn--color-grey
    //     | Outlined grey with icons
    //     svg
    //       use(xlink:href="./img/icons/icons.svg#filters")
    //   button.btn(disabled) Disabled
    //   button.btn.btn--dashed Dashed
    //   button.btn.btn--loading.active
    //     | Loading active
    //     svg
    //       use(xlink:href="./img/icons/icons.svg#loading")
    //   button.btn.btn--loading.active(disabled)
    //     | Loading disabled
    //     svg
    //       use(xlink:href="./img/icons/icons.svg#loading")

    // .ui-kit__block.ui-kit__block--primary.ui-kit__buttons
    //   button.btn.btn--color-white
    //     | color white
    //     svg
    //       use(xlink:href="./img/icons/icons.svg#filters")
  )
}
