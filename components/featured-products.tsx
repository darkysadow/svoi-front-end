"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { products } from "@/lib/product-data"
import { useCartStore } from "@/lib/stores/cart-store"
import { useLanguageStore } from "@/lib/stores/language-store"
import Link from "next/link"

export function FeaturedProducts() {
  const { addItem } = useCartStore()
  const { t } = useLanguageStore()

  const featuredProducts = products.slice(0, 4)

  const handleQuickAdd = (product: (typeof products)[0]) => {
    // Use first available color and size for quick add
    const defaultColor = product.variants.colors[0]?.name || "Default"
    const defaultSize = product.variants.sizes[0] || "M"

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

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-secondary">{t("featured.featuredDrops").split(" ")[0]}</span>{" "}
            <span className="glitch-text" data-text={t("featured.featuredDrops").split(" ")[1]}>
              {t("featured.featuredDrops").split(" ")[1]}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("featured.handpickedPieces")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.badges?.map((badge, index) => (
                    <Badge key={index} variant={badge === "Limited" ? "destructive" : "secondary"} className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                  {product.originalPrice && (
                    <Badge variant="destructive" className="text-xs">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="w-full" onClick={() => handleQuickAdd(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {t("actions.quickAdd")}
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs mb-2">
                    {product.season}
                  </Badge>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  <div className="mb-1">
                    {t("product.colors")}: {product.variants.colors.map((c) => c.name).join(", ")}
                  </div>
                  <div>
                    {t("product.sizes")}: {product.variants.sizes.join(", ")}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/catalog">{t("actions.viewAllProducts")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
