"use client"

import Image from "next/image"

import type { UserPreviewTypes } from "@/app/api/user/route"
import { Share } from "@/components/Share"
import { Button } from "@/components/ui/Button"
import { TextCollapse } from "@/components/ui/TextCollapse"
import { InfluencerTagIcon } from "@/icons/InfluencerTagIcon"

import "./styles.scss"

interface UserPreviewProps {
  data: UserPreviewTypes
}

export const UserPreview = ({ data }: UserPreviewProps) => {
  const { name, image, influencer, desc, postCount, subCount } = data

  return (
    <div className="user-info">
      <div className="user-info__image-container">
        <Image
          className="user-info__image-avatar"
          src={image}
          alt={name}
          width={200}
          height={200}
        />
        {influencer && (
          <div className="user-info__image-text-overlay">
            <Image
              src="/images/Influencer-frame-full.png"
              alt="influencer"
              width={200}
              height={200}
            />
          </div>
        )}
      </div>

      <div className="user-info__desc-wrapper">
        <div className="user-info__desc-title-inner">
          <h3>{name}</h3>
          {influencer && <InfluencerTagIcon />}
        </div>

        <div className="user-info__content">
          <div className="user-info__desc-inner">
            <TextCollapse className="user-info__desc-text" maxLines={3}>
              {desc}
            </TextCollapse>
          </div>

          <div className="user-info__desc-sub-inner">
            <div className="user-info__desc-sub">
              <span className="number">{postCount}</span>
              <span>&nbsp;публикаций</span>
            </div>
            <div className="user-info__desc-sub">
              <span className="number">{subCount}</span>
              <span>&nbsp;подписчиков</span>
            </div>
          </div>

          <div className="user-info__desc-sub-share">
            <Button className="btn--color-primary-light">Подписаться</Button>
            <Share />
          </div>
        </div>
      </div>
    </div>
  )
}
