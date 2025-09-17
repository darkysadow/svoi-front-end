"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/lib/stores/cart-store"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useLanguageStore } from "@/lib/stores/language-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Truck, Shield, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { sendOrderWorkflow } from "@/lib/email-service"
import { toast } from "sonner"

interface CheckoutData {
  contact: {
    email: string
    phone: string
  }
  shipping: {
    firstName: string
    lastName: string
    address: string
    apartment?: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  payment: {
    method: "card" | "paypal"
    cardNumber: string
    expiryDate: string
    cvv: string
    cardName: string
  }
  saveInfo: boolean
}

const countries = [
  { code: "US", name: "United States", tax: 0 },
  { code: "ES", name: "Spain", tax: 21 },
  { code: "FR", name: "France", tax: 20 },
  { code: "DE", name: "Germany", tax: 19 },
  { code: "IT", name: "Italy", tax: 22 },
  { code: "CH", name: "Switzerland", tax: 0 },
]

export function CheckoutForm() {
  const { items, total, clearCart } = useCartStore()
  const { user, isAuthenticated, updateUser } = useAuthStore()
  const { t } = useLanguageStore()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    contact: {
      email: user?.email || "",
      phone: user?.phone || "",
    },
    shipping: {
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ").slice(1).join(" ") || "",
      address: user?.address?.street || "",
      apartment: "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
      country: user?.address?.country || "US",
    },
    payment: {
      method: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    },
    saveInfo: isAuthenticated,
  })

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router])

  const selectedCountry = countries.find((c) => c.code === checkoutData.shipping.country)
  const taxRate = selectedCountry?.tax || 0
  const subtotal = total
  const taxAmount = subtotal * (taxRate / 100)
  const shippingCost = subtotal >= 75 ? 0 : 9.99
  const totalAmount = subtotal + taxAmount + shippingCost

  const updateCheckoutData = (section: keyof CheckoutData, data: any) => {
    setCheckoutData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(checkoutData.contact.email && checkoutData.contact.phone)
      case 2:
        return !!(
          checkoutData.shipping.firstName &&
          checkoutData.shipping.lastName &&
          checkoutData.shipping.address &&
          checkoutData.shipping.city &&
          checkoutData.shipping.state &&
          checkoutData.shipping.zipCode &&
          checkoutData.shipping.country
        )
      case 3:
        if (checkoutData.payment.method === "card") {
          return !!(
            checkoutData.payment.cardNumber &&
            checkoutData.payment.expiryDate &&
            checkoutData.payment.cvv &&
            checkoutData.payment.cardName
          )
        }
        return true
      default:
        return false
    }
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmitOrder = async () => {
    if (!validateStep(3)) return

    setIsProcessing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (checkoutData.saveInfo && isAuthenticated) {
        updateUser({
          phone: checkoutData.contact.phone,
          address: {
            street: checkoutData.shipping.address,
            city: checkoutData.shipping.city,
            state: checkoutData.shipping.state,
            zipCode: checkoutData.shipping.zipCode,
            country: checkoutData.shipping.country,
          },
        })
      }

      const order = {
        id: Date.now().toString(),
        items: items,
        subtotal,
        tax: taxAmount,
        shipping: shippingCost,
        total: totalAmount,
        contact: checkoutData.contact,
        shipping: checkoutData.shipping,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      }

      await sendOrderWorkflow({
        orderId: order.id,
        customerName: `${checkoutData.shipping.firstName} ${checkoutData.shipping.lastName}`,
        customerEmail: checkoutData.contact.email,
        orderDate: new Date().toLocaleDateString(),
        items: items.map((item) => ({
          name: item.name,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        subtotal,
        tax: taxAmount,
        shipping: shippingCost,
        total: totalAmount,
        shippingAddress: `${checkoutData.shipping.address}, ${checkoutData.shipping.city}, ${checkoutData.shipping.state} ${checkoutData.shipping.zipCode}`,
        language: "ru",
      })

      clearCart()

      router.push(`/checkout/success?orderId=${order.id}`)
    } catch (error) {
      console.error("Order processing failed:", error)
      toast.error(t("status.paymentFailed"))
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("checkout.backToCart")}
        </Link>
        <h1 className="text-3xl font-bold font-serif mt-4">{t("checkout.checkout")}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-12 h-0.5 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>{t("checkout.contactInfo")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("checkout.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={checkoutData.contact.email}
                    onChange={(e) => updateCheckoutData("contact", { email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("checkout.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={checkoutData.contact.phone}
                    onChange={(e) => updateCheckoutData("contact", { phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <Button onClick={handleNextStep} className="w-full" disabled={!validateStep(1)}>
                  {t("checkout.continueToShipping")}
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>{t("checkout.shippingAddress")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("checkout.firstName")}</Label>
                    <Input
                      id="firstName"
                      value={checkoutData.shipping.firstName}
                      onChange={(e) => updateCheckoutData("shipping", { firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("checkout.lastName")}</Label>
                    <Input
                      id="lastName"
                      value={checkoutData.shipping.lastName}
                      onChange={(e) => updateCheckoutData("shipping", { lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{t("checkout.address")}</Label>
                  <Input
                    id="address"
                    value={checkoutData.shipping.address}
                    onChange={(e) => updateCheckoutData("shipping", { address: e.target.value })}
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apartment">{t("checkout.apartment")}</Label>
                  <Input
                    id="apartment"
                    value={checkoutData.shipping.apartment}
                    onChange={(e) => updateCheckoutData("shipping", { apartment: e.target.value })}
                    placeholder="Apt 4B"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">{t("checkout.city")}</Label>
                    <Input
                      id="city"
                      value={checkoutData.shipping.city}
                      onChange={(e) => updateCheckoutData("shipping", { city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">{t("checkout.state")}</Label>
                    <Input
                      id="state"
                      value={checkoutData.shipping.state}
                      onChange={(e) => updateCheckoutData("shipping", { state: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">{t("checkout.zipCode")}</Label>
                    <Input
                      id="zipCode"
                      value={checkoutData.shipping.zipCode}
                      onChange={(e) => updateCheckoutData("shipping", { zipCode: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">{t("checkout.country")}</Label>
                  <Select
                    value={checkoutData.shipping.country}
                    onValueChange={(value) => updateCheckoutData("shipping", { country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {isAuthenticated && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveInfo"
                      checked={checkoutData.saveInfo}
                      onCheckedChange={(checked) => setCheckoutData((prev) => ({ ...prev, saveInfo: !!checked }))}
                    />
                    <Label htmlFor="saveInfo" className="text-sm">
                      {t("checkout.saveInfo")}
                    </Label>
                  </div>
                )}
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handlePreviousStep} className="flex-1 bg-transparent">
                    {t("checkout.back")}
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1" disabled={!validateStep(2)}>
                    {t("checkout.continueToPayment")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>{t("checkout.paymentMethod")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={checkoutData.payment.method}
                  onValueChange={(value: "card" | "paypal") => updateCheckoutData("payment", { method: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {t("checkout.creditCard")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">{t("checkout.paypal")}</Label>
                  </div>
                </RadioGroup>

                {checkoutData.payment.method === "card" && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">{t("checkout.cardNumber")}</Label>
                      <Input
                        id="cardNumber"
                        value={checkoutData.payment.cardNumber}
                        onChange={(e) => updateCheckoutData("payment", { cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">{t("checkout.expiryDate")}</Label>
                        <Input
                          id="expiryDate"
                          value={checkoutData.payment.expiryDate}
                          onChange={(e) => updateCheckoutData("payment", { expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">{t("checkout.cvv")}</Label>
                        <Input
                          id="cvv"
                          value={checkoutData.payment.cvv}
                          onChange={(e) => updateCheckoutData("payment", { cvv: e.target.value })}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">{t("checkout.nameOnCard")}</Label>
                      <Input
                        id="cardName"
                        value={checkoutData.payment.cardName}
                        onChange={(e) => updateCheckoutData("payment", { cardName: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={handlePreviousStep} className="flex-1 bg-transparent">
                    {t("checkout.back")}
                  </Button>
                  <Button onClick={handleSubmitOrder} className="flex-1" disabled={!validateStep(3) || isProcessing}>
                    {isProcessing
                      ? t("checkout.processing")
                      : `${t("checkout.completeOrder")} - $${totalAmount.toFixed(2)}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle>{t("checkout.orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.color} • {item.size}
                      </p>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t("checkout.subtotal")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("checkout.shipping")}</span>
                  <span>{shippingCost === 0 ? t("checkout.free") : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                {taxAmount > 0 && (
                  <div className="flex justify-between">
                    <span>
                      {t("checkout.tax")} ({taxRate}%)
                    </span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>{t("checkout.total")}</span>
                <span className="text-primary">${totalAmount.toFixed(2)}</span>
              </div>

              <div className="space-y-2 pt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  <span>{t("checkout.secureCheckout")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-3 w-3" />
                  <span>{t("checkout.freeShippingOver75")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  <span>{t("checkout.sslEncrypted")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
