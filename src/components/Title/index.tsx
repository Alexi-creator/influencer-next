import "./styles.scss"

interface TitleProps {
  title: string
  subscription?: string
}

export const Title = ({
  title,
  subscription,
}: TitleProps) => {
  return (
    <div className="title">
      <h1 className="title__txt">{title}</h1>

      {subscription && (
        <p className="title__under">
          {subscription}
        </p>
      )}
    </div>
  )
}
