"use client"

import clsx from "clsx"
import Cropper from "cropperjs"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/Button"

import "./styles.scss"

interface CropperPublicationProps {
  images: string[]
  onSave: (index: number, croppedSrc: string) => void
}

export const CropperPublication = ({ images, onSave }: CropperPublicationProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const cropperRef = useRef<Cropper | null>(null)

  useEffect(() => {
    if (activeIndex === null || !wrapperRef.current) return

    if (cropperRef.current) {
      cropperRef.current.destroy()
      cropperRef.current = null
    }
    wrapperRef.current.innerHTML = ""

    const img = document.createElement("img")
    img.src = images[activeIndex]
    img.alt = "crop"
    img.style.width = "100%"
    wrapperRef.current.appendChild(img)

    cropperRef.current = new Cropper(img)

    const selection = cropperRef.current.getCropperSelection()
    if (selection) {
      selection.zoomable = false
    }

    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy()
        cropperRef.current = null
      }
      if (wrapperRef.current) {
        wrapperRef.current.innerHTML = ""
      }
    }
  }, [activeIndex, images])

  const handleSave = async () => {
    if (!cropperRef.current || activeIndex === null) return
    const selection = cropperRef.current.getCropperSelection()
    if (!selection) return
    const canvas = await selection.$toCanvas()
    onSave(activeIndex, canvas.toDataURL("image/png"))
  }

  return (
    <div className="cropper-publication">
      <p className="cropper-publication__descr">
        Выберите области, которые будут показываться в миниатюрах добавленных вами фотографий. Для
        этого сначала выберите фотографию миниатюры, затем область на ней.
      </p>
      <div className="cropper-publication__title cropper-publication__title-img">Фотографии</div>
      <div className="cropper-publication__images">
        {images.map((src, i) => (
          // biome-ignore lint/performance/noImgElement: base64 data URL
          // biome-ignore lint/a11y/useKeyWithClickEvents: thumbnail selector
          <img
            key={src}
            src={src}
            alt="preview"
            className={clsx("cropper-publication__img", { active: activeIndex === i })}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
      <div className="cropper-publication__title cropper-publication__title-area">
        Выбранная область
      </div>
      <div ref={wrapperRef} className="cropper-publication__selected-wrapper" />
      <Button type="button" className="cropper-publication__btn btn" onClick={handleSave}>
        Сохранить и продолжить
      </Button>
    </div>
  )
}
