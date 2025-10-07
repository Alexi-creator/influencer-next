
import React from "react"

import Link from "next/link"
import Image from "next/image"

import { UserCardTypes } from "@/types/userCardTypes"

import { Ticker } from "@/components/ui/Ticker"
import { Badge } from "@/components/ui/Badge"

import { ViewLogoIcon } from "@/icons/ViewLogoIcon"
import { UserLogoSmIcon } from "@/icons/UserLogoSmIcon"

import "./styles.scss"

export const UserCard = ({
  name,
  imgSrc,
  desc,
  scoresInst,
  scoresUsers,
  isSubscribed
}: UserCardTypes) => {

  return (
    <Link href="#" className="user-card">
      <div className="user-card__wrapper">
        <div className="user-card__image-container">
          <Image src={imgSrc} width={100} height={100} alt={name} />
        </div>

        <Ticker text={name} className="user-card__name" />

        <p className="user-card__desc">{desc}</p>

        <div className="user-card__scores">
          <div className="user-card__scores-inst">
            <ViewLogoIcon />
            <span>{scoresInst}</span>
          </div>
          <div className="user-card__scores-users">
            <UserLogoSmIcon />
            <span>{scoresUsers}</span>
          </div>
        </div>

        {isSubscribed && (
          <Badge className="user-card__sub badge badge--color-white-green badge--font-commissioner">
            Вы подписаны
          </Badge>
        )}
      </div>
    </Link>
  )
}
