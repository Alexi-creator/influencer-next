export interface UserCardTypes {
  id: number | string
  name: string
  imgSrc: string
  desc: string
  scoresInst: number
  scoresUsers: number
  isSubscribed?: boolean
}
