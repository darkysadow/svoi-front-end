"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, Eye, Download, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

// Mock order data with enhanced tracking info
const mockOrders = [
  {
    id: "1234567890",
    date: "2024-01-15",
    status: "delivered",
    total: 134.99,
    items: [
      {
        id: "1",
        name: "Glitch Hoodie",
        color: "Black",
        size: "L",
        quantity: 1,
        price: 89,
        image: "/placeholder.svg?height=80&width=80&text=Glitch+Hoodie",
      },
      {
        id: "2",
        name: "Neon Dreams Tee",
        color: "White",
        size: "M",
        quantity: 1,
        price: 45,
        image: "/placeholder.svg?height=80&width=80&text=Neon+Dreams+Tee",
      },
    ],
    shipping: {
      method: "DHL Express",
      tracking: "1Z999AA1234567890",
      carrier: "DHL",
      estimatedDelivery: "2024-01-17",
      actualDelivery: "2024-01-17",
    },
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "1234567891",
    date: "2024-01-10",
    status: "shipped",
    total: 95.99,
    items: [
      {
        id: "6",
        name: "Neon Backpack",
        color: "Black",
        size: "One Size",
        quantity: 1,
        price: 95,
        image: "/placeholder.svg?height=80&width=80&text=Neon+Backpack",
      },
    ],
    shipping: {
      method: "GLS Standard",
      tracking: "GLS999AA1234567891",
      carrier: "GLS",
      estimatedDelivery: "2024-01-15",
    },
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "1234567892",
    date: "2024-01-05",
    status: "processing",
    total: 150.0,
    items: [
      {
        id: "3",
        name: "Urban Decay Jacket",
        color: "Black",
        size: "L",
        quantity: 1,
        price: 150,
        image: "/placeholder.svg?height=80&width=80&text=Urban+Decay+Jacket",
      },
    ],
    shipping: {
      method: "SEUR 24H",
      tracking: null,
      carrier: null,
    },
    address: "123 Main St, New York, NY 10001",
  },
]

const statusConfig = {
  processing: {
    label: "⏳ Обработка",
    icon: Clock,
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    message: "🔧 Твой дроп готовится к отправке",
  },
  shipped: {
    label: "🚚 Отправлено",
    icon: Truck,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    message: "🚀 Дроп запущен в космос!",
  },
  delivered: {
    label: "✅ Доставлено",
    icon: CheckCircle,
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    message: "🎉 Дроп доставлен! Время распаковки",
  },
}

export function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const { t } = useLanguage()

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  if (mockOrders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t("empty.noOrders")}</h3>
          <p className="text-muted-foreground text-center mb-6">
            When you place your first order, it will appear here.
          </p>
          <Button asChild>
            <Link href="/catalog">{t("actions.continueShopping")}</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-serif">Order History</h2>
        <p className="text-muted-foreground mt-1">Track and manage your orders</p>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => {
          const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
          const StatusIcon = statusInfo.icon
          const isExpanded = expandedOrder === order.id

          return (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <Badge variant="outline" className={statusInfo.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on{" "}
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-primary font-medium">{statusInfo.message}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                    {order.shipping.estimatedDelivery && (
                      <p className="text-xs text-muted-foreground">
                        Est: {new Date(order.shipping.estimatedDelivery).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Order Items Preview */}
                <div className="flex items-center gap-4 overflow-x-auto">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex-shrink-0">
                      <div className="relative w-16 h-16">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                        {item.quantity > 1 && (
                          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex-shrink-0 w-16 h-16 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleOrderDetails(order.id)}>
                    <Eye className="h-3 w-3 mr-2" />
                    {isExpanded ? "Hide Details" : "View Details"}
                  </Button>
                  {order.shipping.tracking && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/track/${order.shipping.tracking}`}>
                        <Truck className="h-3 w-3 mr-2" />🔍 Отследить дроп
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-2" />
                    Invoice
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-3 w-3 mr-2" />
                    Support
                  </Button>
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      {/* Items List */}
                      <div>
                        <h4 className="font-semibold mb-3">Items Ordered</h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={`${item.id}-${item.color}-${item.size}`}
                              className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                            >
                              <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium">{item.name}</h5>
                                <p className="text-sm text-muted-foreground">
                                  {item.color} • {item.size} • Qty: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">${item.price} each</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Shipping Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Shipping Address</h4>
                          <p className="text-sm text-muted-foreground">{order.address}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Shipping Details</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Method: {order.shipping.method}</p>
                            {order.shipping.carrier && <p>Carrier: {order.shipping.carrier}</p>}
                            {order.shipping.tracking && <p>Tracking: {order.shipping.tracking}</p>}
                            {order.shipping.estimatedDelivery && (
                              <p>Est. Delivery: {new Date(order.shipping.estimatedDelivery).toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Branded Delivery Message */}
                      {order.status === "shipped" && (
                        <div className="p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/20">
                          <p className="text-sm text-muted-foreground">
                            📱 Псс! Друг! Видел, сколько кони берут за переправу? Может, апнем ещё дроп — а я подгоню
                            промо в ЛС 😉
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
