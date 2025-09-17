"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/stores/cart-store"
import { X, Plus } from "lucide-react"

interface UpsellRule {
  id: string
  title: string
  active: boolean
  placement: "pdp" | "cart" | "thankyou"
  trigger_products: string[]
  recommend_products: Product[]
  discount_percent: number
  fallback_product?: Product
}

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  badges: string[]
  season: string
  series: string
  colors: string[]
  sizes: string[]
  category: string
}

interface UpsellEngineProps {
  placement: "pdp" | "cart" | "thankyou"
  currentProductId?: string
  cartItems?: any[]
  onClose?: () => void
}

// Mock upsell rules and products
const mockProducts: Product[] = [
  {
    id: "cap-1",
    name: "SVOI™ Glitch Cap",
    price: 35,
    originalPrice: 45,
    image: "/placeholder-ymfx4.png",
    badges: ["🆕 New"],
    season: "Season 1",
    series: "Genesis",
    colors: ["Black", "White"],
    sizes: ["One Size"],
    category: "accessories",
  },
  {
    id: "tote-1",
    name: "Digital Void Tote",
    price: 25,
    originalPrice: 35,
    image: "/placeholder.svg?height=400&width=400&text=Tote+Bag",
    badges: ["🔥 Limited Drop"],
    season: "Season 2",
    series: "Digital Void",
    colors: ["Black", "Gray"],
    sizes: ["One Size"],
    category: "accessories",
  },
  {
    id: "socks-1",
    name: "Neon Glitch Socks",
    price: 15,
    originalPrice: 20,
    image: "/placeholder.svg?height=400&width=400&text=Glitch+Socks",
    badges: ["🆕 New"],
    season: "Season 2",
    series: "Neon Dreams",
    colors: ["Black", "Neon Green"],
    sizes: ["S", "M", "L"],
    category: "accessories",
  },
  {
    id: "hoodie-upgrade",
    name: "Genesis Hoodie Premium",
    price: 120,
    originalPrice: 150,
    image: "/placeholder-wuscd.png",
    badges: ["🔥 Upgrade"],
    season: "Season 1",
    series: "Genesis",
    colors: ["Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    category: "hoodie",
  },
]

const upsellRules: UpsellRule[] = [
  {
    id: "pdp-accessories",
    title: "🛠️ Собери сет",
    active: true,
    placement: "pdp",
    trigger_products: [],
    recommend_products: mockProducts.filter((p) => p.category === "accessories"),
    discount_percent: 10,
  },
  {
    id: "cart-upgrade",
    title: "🔥 Апгрейд: замени футболку на худи за +30€",
    active: true,
    placement: "cart",
    trigger_products: ["2"], // T-shirt product ID
    recommend_products: [mockProducts.find((p) => p.category === "hoodie")!],
    discount_percent: 10,
  },
  {
    id: "thankyou-complete",
    title: "🔥 Завершите коллекцию",
    active: true,
    placement: "thankyou",
    trigger_products: [],
    recommend_products: mockProducts.slice(0, 3),
    discount_percent: 15,
  },
]

export function UpsellEngine({ placement, currentProductId, cartItems = [], onClose }: UpsellEngineProps) {
  const addItem = useCartStore((state) => state.addItem)

  // Find applicable upsell rules
  const applicableRules = upsellRules.filter(
    (rule) =>
      rule.active &&
      rule.placement === placement &&
      (rule.trigger_products.length === 0 ||
        rule.trigger_products.some(
          (productId) => currentProductId === productId || cartItems.some((item) => item.id === productId),
        )),
  )

  if (applicableRules.length === 0) {
    return null
  }

  const handleAddToCart = (product: Product, rule: UpsellRule) => {
    const discountedPrice = product.price * (1 - rule.discount_percent / 100)

    addItem({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
      color: product.colors[0],
      size: product.sizes[0],
      season: product.season,
      series: product.series,
      quantity: 1,
    })

    // Analytics event
    console.log(`[v0] Upsell added: ${product.name} with ${rule.discount_percent}% discount`)
  }

  return (
    <div className="space-y-6">
      {applicableRules.map((rule) => (
        <Card key={rule.id} className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">{rule.title}</CardTitle>
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {rule.discount_percent > 0 && (
              <Badge className="w-fit bg-primary/20 text-primary border-primary/30">
                -{rule.discount_percent}% скидка при добавлении
              </Badge>
            )}
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rule.recommend_products.map((product) => (
                <div key={product.id} className="space-y-3">
                  <div className="relative group">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product, rule)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Добавить
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">{product.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">
                        ${(product.price * (1 - rule.discount_percent / 100)).toFixed(2)}
                      </span>
                      {rule.discount_percent > 0 && (
                        <span className="text-xs text-muted-foreground line-through">${product.price}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.badges.slice(0, 1).map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
