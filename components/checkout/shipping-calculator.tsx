"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, Zap } from "lucide-react"
import { getShippingRates, type ShippingAddress, type ShippingRate } from "@/lib/shipping-service"
import { useTranslation } from "react-i18next"

interface ShippingCalculatorProps {
  address: ShippingAddress
  cartValue: number
  onRateSelect: (rate: ShippingRate) => void
  selectedRate?: ShippingRate
}

export function ShippingCalculator({ address, cartValue, onRateSelect, selectedRate }: ShippingCalculatorProps) {
  const [rates, setRates] = useState<ShippingRate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchRates = async () => {
      if (!address.country || !address.city) return

      try {
        setLoading(true)
        setError(null)
        const shippingRates = await getShippingRates(address, 1, cartValue)
        setRates(shippingRates)

        // Auto-select cheapest option if none selected
        if (!selectedRate && shippingRates.length > 0) {
          onRateSelect(shippingRates[0])
        }
      } catch (err) {
        setError(t("checkout.unableToCalculateShipping"))
        console.error("Shipping calculation error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [address, cartValue])

  const getCarrierIcon = (carrier: string) => {
    switch (carrier) {
      case "DHL":
        return <Zap className="h-4 w-4 text-yellow-500" />
      case "GLS":
      case "SEUR":
        return <Truck className="h-4 w-4 text-blue-500" />
      case "CORREOS":
        return <Truck className="h-4 w-4 text-green-500" />
      default:
        return <Truck className="h-4 w-4" />
    }
  }

  const getBrandedMessage = () => {
    if (cartValue >= 75) {
      return t("checkout.freeShippingActivated")
    }
    const remaining = 75 - cartValue
    return `${t("checkout.addMoreForFreeShipping", { remaining: remaining.toFixed(2) })}`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            {t("checkout.calculatingShipping")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            {t("checkout.shippingOptions")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive text-sm">{error}</p>
          <p className="text-muted-foreground text-sm mt-2">{t("checkout.shippingCalculatedAtCheckout")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          {t("checkout.shippingOptions")}
        </CardTitle>
        {cartValue < 75 && <p className="text-sm text-muted-foreground">{getBrandedMessage()}</p>}
      </CardHeader>
      <CardContent className="space-y-3">
        {rates.map((rate, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedRate?.carrier === rate.carrier && selectedRate?.service === rate.service
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground"
            }`}
            onClick={() => onRateSelect(rate)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getCarrierIcon(rate.carrier)}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{rate.carrier}</span>
                    {rate.carrier === "DHL" && (
                      <Badge variant="secondary" className="text-xs">
                        {t("checkout.express")}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{rate.service}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  {cartValue >= 75 && rate.price <= 15 ? t("checkout.free") : `$${rate.price.toFixed(2)}`}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {rate.estimatedDays}
                </div>
              </div>
            </div>
          </div>
        ))}

        {rates.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Truck className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">{t("checkout.noShippingOptions")}</p>
          </div>
        )}

        <div className="pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>{t("checkout.shippingCostCalculatedAtCheckout")}</p>
            <p>{t("checkout.allLogisticsRisksOnClient")}</p>
            <p>{t("checkout.ratesUpdatedWeekly")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
