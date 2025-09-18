"use client"

import { useCartStore } from "@/lib/stores/cart-store"
import { useLanguageStore } from "@/lib/stores/language-store"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Minus, Plus, X, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartDrawer() {
  const { items, itemCount, total, updateQuantity, removeItem, clearCart } = useCartStore()
  const { t } = useLanguageStore()

  const getProductPhotoUrl = (item?: string) => item ?
    process.env.NEXT_PUBLIC_CMS_ENDPOINT + item :
    "/placeholder-product.svg"

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0 pb-4">
          <SheetTitle className="flex items-center justify-between">
            <span>
              {t("navigation.cart")} ({itemCount})
            </span>
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart} className="cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2" />
                {t("actions.clearAll")}
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{t("empty.cartEmpty")}</h3>
                  <p className="text-sm text-muted-foreground">{t("empty.cartEmpty")}</p>
                </div>
                <Button asChild className="cursor-pointer">
                  <Link href="/catalog">{t("actions.continueShopping")}</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-2 space-y-3 min-h-0 px-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.color}-${item.size}`}
                    className="flex gap-3 p-3 bg-card rounded-lg border border-border"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={getProductPhotoUrl(item.image)}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {item.color} • {item.size}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="h-6 w-6 p-0 flex-shrink-0 cursor-pointer hover:bg-red-500/10 hover:text-red-500"
                          aria-label={t("product.removeItem")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                            className="h-7 w-7 p-0 cursor-pointer hover:bg-red-500/10 hover:border-red-500"
                            aria-label={t("product.decreaseQuantity")}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                            className="h-7 w-7 p-0 cursor-pointer hover:bg-red-500/10 hover:border-red-500"
                            aria-label={t("product.increaseQuantity")}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-semibold text-primary">${((item.discountedPrice ? item.discountedPrice : item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0 border-t border-border pt-6 mt-4 space-y-6 bg-background/50 backdrop-blur-sm rounded-t-lg px-6 pb-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-base font-medium text-muted-foreground">Subtotal</span>
                    <span className="text-base font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-border/50">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full h-12 text-base font-semibold cursor-pointer bg-primary hover:bg-primary/90 transition-colors"
                    asChild
                  >
                    <Link href="/checkout">{t("actions.checkout")}</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-10 bg-transparent border-border hover:bg-muted/50 cursor-pointer transition-colors"
                    asChild
                  >
                    <Link href="/catalog">{t("actions.continueShopping")}</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
