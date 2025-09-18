"use client"

import type React from "react"

import { useState } from "react"
import { useCartStore } from "@/lib/stores/cart-store"
import { useLanguageStore } from "@/lib/stores/language-store"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Eye } from "lucide-react"
import { ProductResponse, ProductVariant } from "@/hooks/use-season"

interface ProductCardProps {
  product: ProductResponse
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const { addItem } = useCartStore()
  const { language, t } = useLanguageStore()

  const discountPercentage = product.discountedPrice
    ? Math.round(((product.discountedPrice - product.price) / product.discountedPrice) * 100)
    : 0

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const defaultColor = product.variant[0].color || "Default"
    const defaultSize = product.variant[0].size || "M"

    addItem({
      id: product.documentId,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      image: product.photo?.[0]?.url || '',
      color: defaultColor,
      size: defaultSize,
      quantity: 1,
    })
  }

  const getBrandedBadge = (badge: string) => {
    switch (badge) {
      case "Limited":
        return t("limitedDrop")
      case "New":
        return t("newBadge")
      case "Custom":
        return t("customBadge")
      default:
        return badge
    }
  }

  const productPhotoUrl = product.photo?.[0] ?
    product.photo[0].url :
    "/placeholder-product.svg"

  function countUniqueColorsAndSizes(variants: ProductVariant[]) {
    const colorsSet = new Set<string>()
    const sizesSet = new Set<string>()

    if (!variants) {
      return {
        colors: 1,
        sizes: 1
      }
    }

    for (const { color, size } of variants) {
      if (color) {
        colorsSet.add(color.trim().toLowerCase())
      }
      if (size) {
        sizesSet.add(size.trim().toUpperCase())
      }
    }

    return {
      colors: colorsSet.size,
      sizes: sizesSet.size,
    }
  }

  const { colors, sizes } = countUniqueColorsAndSizes(product.variant);

  return (
    <Card
      className="product-card group relative overflow-hidden border-border bg-card hover:bg-card/80 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={productPhotoUrl}
            alt={product.name}
            fill
            className="product-image object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
            unoptimized={true}
          />

          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {product.tags?.map((badge) => (
              <Badge key={badge.name + 1} variant={badge.name === "Limited" ? "destructive" : "secondary"} className="text-xs">
                {getBrandedBadge(badge.name)}
              </Badge>
            ))}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          <div
            className={`absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center gap-2 transition-all duration-300 z-20 ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
          >
            <Button size="sm" asChild className="cursor-pointer w-40 hover:bg-red-500/10 hover:border-red-500">
              <Link href={`/product/${product.slug}`}>
                <Eye className="h-4 w-4 mr-2" />
                {t("product.viewProduct")}
              </Link>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleQuickAddToCart}
              className="cursor-pointer hover:bg-red-500/10 w-40 hover:border-red-500"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {t("product.addToCart")}
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-2">

          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-red-500 transition-colors cursor-pointer">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">${product.discountedPrice ? product.discountedPrice : product.price}</span>
            {product.discountedPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.price}</span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {colors || 0} {t("colors")}
            </span>
            <span>
              {sizes || 0} {t("sizes")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
