"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"
import { UpsellEngine } from "@/components/upsell/upsell-engine"
import { useTranslation } from "react-i18next"

export function CheckoutSuccess() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [showUpsells, setShowUpsells] = useState(true)
  const { t } = useTranslation()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-serif">🔥 Твой сет ушёл в продакшн!</h1>
            <p className="text-muted-foreground">💳 Мамонтизация завершена. Спасибо!</p>
          </div>

          {orderId && (
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-mono font-semibold">#{orderId}</p>
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("checkout.whatHappensNext")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t("checkout.orderConfirmation")}</h3>
                <p className="text-sm text-muted-foreground">{t("checkout.orderConfirmationDesc")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t("status.processing")}</h3>
                <p className="text-sm text-muted-foreground">{t("checkout.processingDesc")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t("checkout.shipping")}</h3>
                <p className="text-sm text-muted-foreground">{t("checkout.shippingDesc")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>{t("checkout.questionsAboutOrder")}</p>
            <p>{t("checkout.contactSupport")}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/account/orders">{t("checkout.viewOrderStatus")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/catalog">{t("actions.backToCatalog")}</Link>
            </Button>
          </div>
        </div>
      </div>

      {showUpsells && <UpsellEngine placement="thankyou" onClose={() => setShowUpsells(false)} />}
    </div>
  )
}
