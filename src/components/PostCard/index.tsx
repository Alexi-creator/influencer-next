"use client"

import Image from "next/image"
import Link from "next/link"
import { memo } from "react"
import { Rating } from "@/components/ui/Rating"
import { DiscusIcon } from "@/icons/DiscusIcon"
import { HeartIcon } from "@/icons/HeartIcon"
import type { PostCardTypes } from "@/types/postCard.schema"
import "./styles.scss"

export type { PostCardTypes } from "@/types/postCard.schema"

export const PostCard = memo(
  ({
    imgSrc,
    desc,
    userName,
    userLogoSrc,
    rating,
    scoresDiscus,
    scoresLikes,
    liked,
  }: PostCardTypes) => {
    return (
      <Link href="#" className="post-card">
        <div className="post-card__wrapper">
          <Image src={imgSrc} alt={desc} width={300} height={400} />
          <div className="post-card__desc-inner">
            <p className="post-card__desc">{desc}</p>
            <div className="post-card__range">
              <Rating initialRate={rating} />
              <div className="post-card__range-inner">
                <p>{userName}</p>
                <Image src={userLogoSrc} alt={userName} width={24} height={24} />
              </div>
            </div>
            {(scoresDiscus !== undefined || scoresLikes !== undefined) && (
              <div className="post-card__scores">
                {scoresDiscus !== undefined && (
                  <div className="post-card__discus">
                    <DiscusIcon />
                    <span>{scoresDiscus}</span>
                  </div>
                )}
                {scoresLikes !== undefined && (
                  <div className="post-card__discus">
                    <HeartIcon />
                    <span>{scoresLikes}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* {liked && (
            <div className="post-card__liked">
              <FavoriteIcon />
            </div>
          )} */}
        </div>
      </Link>
    )
  },
)
