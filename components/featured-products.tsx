"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/stores/cart-store"
import { useLanguageStore } from "@/lib/stores/language-store"
import Link from "next/link"
import { useFeaturedProducts } from "@/hooks/use-featured-products"
import Preloader from "./ui/preloader"

export function FeaturedProducts() {
  const { addItem } = useCartStore()
  const { t } = useLanguageStore()

  

  const handleQuickAdd = (product: (typeof products)[0]) => {
    const defaultColor = product.variant[0].color || "Default"
    const defaultSize = product.variant[0].size || "M"

    addItem({
      id: product.documentId,
      name: product.name,
      price: product.price,
      image: product.photo?.url,
      color: defaultColor,
      size: defaultSize,
      quantity: 1,
    })
  }

  const { loading, featuredProducts, error } = useFeaturedProducts()

  if (!featuredProducts?.products || loading) {
    return (
      <section className="bg-card/30 min-h-[40rem] w-full relative">
        <Preloader />
      </section>
    )
  }
  
  const products = featuredProducts.products.length > 4 ? featuredProducts.products.slice(0, 4) : featuredProducts.products
  
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-secondary">{featuredProducts.title.split(" ")[0]}</span>{" "}
            <span className="glitch-text" data-text={featuredProducts.title.split(" ")[1]}>
              {featuredProducts.title.split(" ")[1]}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{featuredProducts.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.documentId}
              className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.photo?.url || "/placeholder-product.svg"}
                  alt={product.name}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.tags?.map((badge, index) => (
                    <Badge key={index} variant={badge.name === "Limited" ? "destructive" : "secondary"} className="text-xs">
                      {badge.name}
                    </Badge>
                  ))}
                  {product.discountedPrice && (
                    <Badge variant="destructive" className="text-xs">
                      {Math.round(((product.discountedPrice - product.price) / product.discountedPrice) * 100)}%
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                    {product.drops?.[0].season.shortName || 'Season 1'}
                  </Badge>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  
                  {product.discountedPrice ? <span className="text-lg font-bold text-primary">${product.discountedPrice}</span> : <span className="text-lg font-bold text-primary">${product.price}</span>}
                  {product.discountedPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  <div className="mb-1">
                    {t("product.colors")}: {product.variant.map((v) => v.color).join(", ")}
                  </div>
                  <div>
                    {t("product.sizes")}: {product.variant.map((v) => v.size).join(", ")}
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
