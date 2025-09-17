"use client"

import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Minus, Plus, X, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { UpsellEngine } from "@/components/upsell/upsell-engine"

export function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart()
  const { t } = useLanguage()

  if (state.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
        <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground" />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-serif">{t("cart.cartEmpty")}</h1>
          <p className="text-muted-foreground">{t("cart.cartEmptyDesc")}</p>
        </div>
        <Button asChild size="lg" className="cursor-pointer">
          <Link href="/catalog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("actions.continueShopping")}
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-serif">
          {t("cart.shoppingCart")} ({state.itemCount})
        </h1>
        <Button variant="outline" onClick={clearCart} className="cursor-pointer bg-transparent">
          {t("cart.clearAll")}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Cart Items */}
          <div className="space-y-4">
            {state.items.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className="flex gap-4 p-6 bg-card rounded-lg border border-border hover:border-primary/20 transition-colors"
              >
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
                </div>

                <div className="flex-1 space-y-3 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.season} • {item.series}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t("cart.color")}: {item.color} • {t("cart.size")}: {item.size}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id, item.color, item.size)}
                      className="cursor-pointer flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                        className="cursor-pointer"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                        className="cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">
                        ${item.price} {t("cart.each")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <UpsellEngine placement="cart" cartItems={state.items} />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-lg border border-border space-y-4 sticky top-24">
            <h2 className="text-xl font-semibold">{t("cart.orderSummary")}</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>
                  {t("checkout.subtotal")} ({state.itemCount} {t("cart.items")})
                </span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("checkout.shipping")}</span>
                <span className="text-sm text-muted-foreground">{t("cart.calculatedAtCheckout")}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-semibold">
              <span>{t("checkout.total")}</span>
              <span className="text-primary">${state.total.toFixed(2)}</span>
            </div>

            <div className="space-y-3">
              <Button className="w-full cursor-pointer" size="lg" asChild>
                <Link href="/checkout">{t("actions.checkout")}</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent cursor-pointer" asChild>
                <Link href="/catalog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t("actions.continueShopping")}
                </Link>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• {t("cart.freeShippingOver75")}</p>
              <p>• {t("cart.returnPolicy")}</p>
              <p>• {t("cart.secureCheckout")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
