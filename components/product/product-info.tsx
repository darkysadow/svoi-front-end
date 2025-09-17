"use client"

import { useState } from "react"
import { useCartStore } from "@/lib/stores/cart-store"
import { useLanguageStore } from "@/lib/stores/language-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { toast } from "sonner"
import { UpsellEngine } from "@/components/upsell/upsell-engine"
import type { Product } from "@/lib/product-data"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0]?.name || "")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const { addItem } = useCartStore()
  const { t } = useLanguageStore()

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error(t("errors.selectSize"))
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/placeholder.svg",
      color: selectedColor,
      size: selectedSize,
      season: product.season,
      series: product.series,
      quantity,
    })

    toast.success(t("status.addedToCart"))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {product.badges?.map((badge) => (
            <Badge key={badge} variant={badge === "Limited" ? "destructive" : "secondary"}>
              {badge}
            </Badge>
          ))}
          {discountPercentage > 0 && (
            <Badge variant="destructive">
              -{discountPercentage}% {t("product.discountOff")}
            </Badge>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          {product.season} • {product.series}
        </div>

        <h1 className="text-3xl font-bold font-serif">{product.name}</h1>

        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-semibold">
          {t("product.color")}: {selectedColor}
        </h3>
        <div className="flex gap-2">
          {product.variants.colors.map((color) => (
            <button
              key={color.name}
              className={`px-4 py-2 border rounded-md transition-all ${
                selectedColor === color.name
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-red-500"
              }`}
              onClick={() => setSelectedColor(color.name)}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">
          {t("product.size")}: {selectedSize || t("product.selectSizePrompt")}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {product.variants.sizes.map((size) => (
            <button
              key={size}
              className={`py-2 border rounded-md transition-all ${
                selectedSize === size
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-red-500"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">{t("product.quantity")}</h3>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="hover:bg-red-500/10 hover:border-red-500"
            aria-label={t("product.decreaseQuantity")}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= product.quantity}
            className="hover:bg-red-500/10 hover:border-red-500"
            aria-label={t("product.increaseQuantity")}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {product.quantity} {t("product.itemsInStock")}
        </p>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? t("actions.addToCart") : t("status.outOfStock")}
        </Button>
      </div>

      <UpsellEngine placement="pdp" currentProductId={product.id} />

      <div className="space-y-3 p-4 bg-card rounded-lg border border-border">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-4 w-4 text-primary" />
          <span>{t("shipping.freeShipping")}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="h-4 w-4 text-primary" />
          <span>{t("returns.thirtyDayReturns")}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="h-4 w-4 text-primary" />
          <span>{t("guarantee.authentic")}</span>
        </div>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="features">{t("product.features")}</TabsTrigger>
          <TabsTrigger value="specs">{t("product.specifications")}</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="space-y-3">
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="specs" className="space-y-3">
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t(`product.${key.toLowerCase()}`)}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
