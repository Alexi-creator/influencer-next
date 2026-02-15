import { ArrowGoLeftIcon } from "@/icons/ArrowGoLeftIcon"
import { ArrowIcon } from "@/icons/ArrowIcon"
import { ArrowUp } from "@/icons/ArrowUp"
import { CameraIcon } from "@/icons/CameraIcon"
import { CatalogIcon } from "@/icons/CatalogIcon"
import { CategoryIcon } from "@/icons/CategoryIcon"
import { CheckboxIcon } from "@/icons/CheckboxIcon"
import { ClockIcon } from "@/icons/ClockIcon"
import { ClothIcon } from "@/icons/ClothIcon"
import { CloudIcon } from "@/icons/CloudIcon"
import { CollapseIcon } from "@/icons/CollapseIcon"
import { CompassIcon } from "@/icons/CompassIcon"
import { CopyIcon } from "@/icons/CopyIcon"
import { CreditCardIcon } from "@/icons/CreditCardIcon"
import { CrossIcon } from "@/icons/CrossIcon"
import { DensityGridIcon } from "@/icons/DensityGridIcon"
import { DensityTileIcon } from "@/icons/DensityTileIcon"
import { DiscusIcon } from "@/icons/DiscusIcon"
import { DownIcon } from "@/icons/DownIcon"
import { EmailIcon } from "@/icons/EmailIcon"
import { FacebookIcon } from "@/icons/FacebookIcon"
import { FavoriteIcon } from "@/icons/FavoriteIcon"
import { FeedIcon } from "@/icons/FeedIcon"
import { FiltersIcon } from "@/icons/FiltersIcon"
import { GoogleIcon } from "@/icons/GoogleIcon"
import { HeartIcon } from "@/icons/HeartIcon"
import { InfoIcon } from "@/icons/InfoIcon"
import { LikesIcon } from "@/icons/LikesIcon"
import { LoaderIcon } from "@/icons/LoaderIcon"
import { LoadingIcon } from "@/icons/LoadingIcon"
import { LocationFullIcon } from "@/icons/LocationFullIcon"
import { LocationIcon } from "@/icons/LocationIcon"
import { MapIcon } from "@/icons/MapIcon"
import { MinusIcon } from "@/icons/MinusIcon"
import { MoreIcon } from "@/icons/MoreIcon"
import { PhoneIcon } from "@/icons/PhoneIcon"
import { PlusIcon } from "@/icons/PlusIcon"
import { ProfileIcon } from "@/icons/ProfileIcon"
import { RatingIcon } from "@/icons/RatingIcon"
import { RevealIcon } from "@/icons/RevealIcon"
import { RoundIcon } from "@/icons/RoundIcon"
import { SearchIcon } from "@/icons/SearchIcon"
import { ShareIcon } from "@/icons/ShareIcon"
import { ShareLinkIcon } from "@/icons/ShareLinkIcon"
import { ShoppingBagIcon } from "@/icons/ShoppingBagIcon"
import { SortsIcon } from "@/icons/SortsIcon"
import { TelegramIcon } from "@/icons/TelegramIcon"
import { ThumbsUpIcon } from "@/icons/ThumbsUpIcon"
import { TopIcon } from "@/icons/TopIcon"
import { TrashIcon } from "@/icons/TrashIcon"
import { TruckIcon } from "@/icons/TruckIcon"
import { TwitterIcon } from "@/icons/TwitterIcon"
import { UserCommentsIcon } from "@/icons/UserCommentsIcon"
import { UserIcon } from "@/icons/UserIcon"
import { UserLogoSmIcon } from "@/icons/UserLogoSmIcon"
import { ViewLogoIcon } from "@/icons/ViewLogoIcon"
import { VkIcon } from "@/icons/VkIcon"
import { WhatsappIcon } from "@/icons/WhatsappIcon"

import "./styles.scss"

const icons = [
  { name: "ArrowGoLeftIcon", component: ArrowGoLeftIcon },
  { name: "ArrowIcon", component: ArrowIcon },
  { name: "ArrowUp", component: ArrowUp },
  { name: "CameraIcon", component: CameraIcon },
  { name: "CatalogIcon", component: CatalogIcon },
  { name: "CategoryIcon", component: CategoryIcon },
  { name: "CheckboxIcon", component: CheckboxIcon },
  { name: "ClockIcon", component: ClockIcon },
  { name: "ClothIcon", component: ClothIcon },
  { name: "CloudIcon", component: CloudIcon },
  { name: "CollapseIcon", component: CollapseIcon },
  { name: "CompassIcon", component: CompassIcon },
  { name: "CopyIcon", component: CopyIcon },
  { name: "CreditCardIcon", component: CreditCardIcon },
  { name: "CrossIcon", component: CrossIcon },
  { name: "DensityGridIcon", component: DensityGridIcon },
  { name: "DensityTileIcon", component: DensityTileIcon },
  { name: "DiscusIcon", component: DiscusIcon },
  { name: "DownIcon", component: DownIcon },
  { name: "EmailIcon", component: EmailIcon },
  { name: "FacebookIcon", component: FacebookIcon },
  { name: "FavoriteIcon", component: FavoriteIcon },
  { name: "FeedIcon", component: FeedIcon },
  { name: "FiltersIcon", component: FiltersIcon },
  { name: "GoogleIcon", component: GoogleIcon },
  { name: "HeartIcon", component: HeartIcon },
  { name: "InfoIcon", component: InfoIcon },
  { name: "LikesIcon", component: LikesIcon },
  { name: "LoaderIcon", component: LoaderIcon },
  { name: "LoadingIcon", component: LoadingIcon },
  { name: "LocationFullIcon", component: LocationFullIcon },
  { name: "LocationIcon", component: LocationIcon },
  { name: "MapIcon", component: MapIcon },
  { name: "MinusIcon", component: MinusIcon },
  { name: "MoreIcon", component: MoreIcon },
  { name: "PhoneIcon", component: PhoneIcon },
  { name: "PlusIcon", component: PlusIcon },
  { name: "ProfileIcon", component: ProfileIcon },
  { name: "RatingIcon", component: RatingIcon },
  { name: "RevealIcon", component: RevealIcon },
  { name: "RoundIcon", component: RoundIcon },
  { name: "SearchIcon", component: SearchIcon },
  { name: "ShareIcon", component: ShareIcon },
  { name: "ShareLinkIcon", component: ShareLinkIcon },
  { name: "ShoppingBagIcon", component: ShoppingBagIcon },
  { name: "SortsIcon", component: SortsIcon },
  { name: "TelegramIcon", component: TelegramIcon },
  { name: "ThumbsUpIcon", component: ThumbsUpIcon },
  { name: "TopIcon", component: TopIcon },
  { name: "TrashIcon", component: TrashIcon },
  { name: "TruckIcon", component: TruckIcon },
  { name: "TwitterIcon", component: TwitterIcon },
  { name: "UserCommentsIcon", component: UserCommentsIcon },
  { name: "UserIcon", component: UserIcon },
  { name: "UserLogoSmIcon", component: UserLogoSmIcon },
  { name: "ViewLogoIcon", component: ViewLogoIcon },
  { name: "VkIcon", component: VkIcon },
  { name: "WhatsappIcon", component: WhatsappIcon },
]

export default function IconsPage() {
  return (
    <div className="icons-page">
      <h1 className="icons-page__title">Icons ({icons.length})</h1>
      <div className="icons-page__grid">
        {icons.map(({ name, component: Icon }) => (
          <div key={name} className="icons-page__item">
            <Icon />
            <span className="icons-page__name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
