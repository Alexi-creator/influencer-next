"use client"

import Image from "next/image"

import type { UserPreviewTypes } from "@/app/api/user/[id]/route"
import { Share } from "@/components/Share"
import { Button } from "@/components/ui/Button"
import { TextCollapse } from "@/components/ui/TextCollapse"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import { InfluencerTagIcon } from "@/icons/InfluencerTagIcon"
import { BREAKPOINT_NAME } from "@/types/breakpointTypes"

import "./styles.scss"

interface UserPreviewProps {
  data: UserPreviewTypes
}

export const UserPreview = ({ data }: UserPreviewProps) => {
  const { name, image, influencer, desc, postCount, subCount } = data
  const { currentBreakpoint } = useBreakpoint()

  const maxLines = currentBreakpoint === BREAKPOINT_NAME.MOBILE ? 3 : 4

  return (
    <div className="user-info">
      <div className="user-info__avatar">
        <Image
          className="user-info__avatar-image"
          src={image}
          alt={name}
          width={200}
          height={200}
        />
        {influencer && (
          <div className="user-info__avatar-text-overlay">
            <Image
              src="/images/Influencer-frame-full.png"
              alt="influencer"
              width={200}
              height={200}
            />
          </div>
        )}
      </div>

      <div className="user-info__name">
        <h3>{name}</h3>
        {influencer && <InfluencerTagIcon />}
      </div>

      <TextCollapse className="user-info__desc" maxLines={maxLines} buttonAlign="right">
        {desc}
      </TextCollapse>

      <div className="user-info__stat">
        <span className="user-info__stat-item">{postCount} &nbsp;публикаций</span>
        <span className="user-info__stat-item">{subCount} &nbsp;подписчиков</span>
      </div>

      <div className="user-info__subscribe">
        <Button className="btn--color-primary-light">Подписаться</Button>
        <Share />
      </div>
    </div>
  )
}
