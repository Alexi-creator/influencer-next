import clsx from "clsx"

import { LoaderIcon } from "@/icons/LoaderIcon"

import "./styles.scss"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  isFixed?: boolean
}

export const Loading = ({ isFixed, className }: LoadingProps) => {
  return (
    <div className={clsx("loading", className, {
      "loading--fixed": isFixed,
    })} >
      <LoaderIcon />
    </div>
  )
}
