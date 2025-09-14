export interface UserCard {
  id: number
  name: string
  imgSrc: string
  desc: string
  scoresInst: number
  scoresUsers: number
  isSubscribed?: boolean
}
