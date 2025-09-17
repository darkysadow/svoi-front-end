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
import type { Product } from "@/lib/product-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const { addItem } = useCartStore()
  const { language, t } = useLanguageStore()

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const defaultColor = product.variants?.colors?.[0]?.name || "Default"
    const defaultSize = product.variants?.sizes?.[0] || "M"

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: defaultColor,
      size: defaultSize,
      season: product.season,
      series: product.series,
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

  return (
    <Card
      className="product-card group relative overflow-hidden border-border bg-card hover:bg-card/80 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="product-image object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              console.log("[v0] Image failed to load:", product.image, "for product:", product.name)
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=400&width=300&text=" + encodeURIComponent(product.name)
            }}
            onLoad={() => {
              console.log("[v0] Image loaded successfully:", product.image, "for product:", product.name)
            }}
            priority={false}
            unoptimized={true}
          />

          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {product.badges?.map((badge) => (
              <Badge key={badge} variant={badge === "Limited" ? "destructive" : "secondary"} className="text-xs">
                {getBrandedBadge(badge)}
              </Badge>
            ))}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          <div
            className={`absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center gap-2 transition-all duration-300 z-20 ${
              isHovered ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <Button size="sm" asChild className="cursor-pointer hover:bg-red-500/10 hover:border-red-500">
              <Link href={`/product/${product.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                {t("product.viewProduct")}
              </Link>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleQuickAddToCart}
              className="cursor-pointer hover:bg-red-500/10 hover:border-red-500"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {t("product.addToCart")}
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="text-xs text-muted-foreground">
            {product.season} • {product.series}
          </div>

          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-red-500 transition-colors cursor-pointer">
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {product.variants?.colors?.length || 0} {t("colors")}
            </span>
            <span>
              {product.variants?.sizes?.length || 0} {t("sizes")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
