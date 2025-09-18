"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { useLanguageStore } from "@/lib/stores/language-store"
import { ProductPhoto } from "@/hooks/use-product"

interface ProductGalleryProps {
  images: ProductPhoto[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { t } = useLanguageStore()

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-card border border-border group">
        <Image
          src={images?.[currentImage]?.url ?
            process.env.NEXT_PUBLIC_CMS_ENDPOINT + images[currentImage].url :
            "/placeholder-product.svg"}
          alt={`${productName} - Image ${currentImage + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-red-500/10 hover:border-red-500"
              onClick={prevImage}
              aria-label={t("product.previousImage")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-red-500/10 hover:border-red-500"
              onClick={nextImage}
              aria-label={t("product.nextImage")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-background/80 hover:bg-red-500/10 hover:border-red-500"
          onClick={() => setIsFullscreen(true)}
          aria-label={t("product.expandImage")}
        >
          <Expand className="h-4 w-4" />
        </Button>

        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
            {currentImage + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative aspect-square overflow-hidden rounded border-2 transition-all ${index === currentImage ? "border-primary" : "border-border hover:border-red-500"
                }`}
              onClick={() => setCurrentImage(index)}
              aria-label={`${t("product.thumbnail")} ${index + 1}`}
            >
              <Image
                src={(process.env.NEXT_PUBLIC_CMS_ENDPOINT + image.url) || "/placeholder-product.svg"}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={(process.env.NEXT_PUBLIC_CMS_ENDPOINT + images[currentImage].url) || "/placeholder-product.svg"}
              alt={`${productName} - Fullscreen`}
              width={800}
              height={800}
              className="object-contain max-h-[90vh]"
            />
            <Button variant="ghost" className="absolute top-2 right-2" onClick={() => setIsFullscreen(false)}>
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
