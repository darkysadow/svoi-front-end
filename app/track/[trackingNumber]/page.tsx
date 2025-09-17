"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Truck, Package, MapPin, Clock, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getTrackingInfo, type TrackingInfo } from "@/lib/shipping-service"

export default function TrackingPage() {
  const params = useParams()
  const trackingNumber = params.trackingNumber as string

  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        setLoading(true)
        // In a real app, you'd determine carrier from the tracking number format
        const info = await getTrackingInfo(trackingNumber, "DHL")
        setTrackingInfo(info)
      } catch (err) {
        setError("Unable to fetch tracking information")
        console.error("Tracking fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (trackingNumber) {
      fetchTracking()
    }
  }, [trackingNumber])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: { label: "⏳ Processing", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
      shipped: { label: "📦 Shipped", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
      in_transit: { label: "🚚 In Transit", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
      out_for_delivery: {
        label: "🚛 Out for Delivery",
        color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      },
      delivered: { label: "✅ Delivered", color: "bg-green-500/10 text-green-600 border-green-500/20" },
      exception: { label: "⚠️ Exception", color: "bg-red-500/10 text-red-600 border-red-500/20" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.processing
    return (
      <Badge variant="outline" className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const getBrandedMessage = (status: string) => {
    const messages = {
      processing: "🔧 Твой дроп готовится к отправке",
      shipped: "🚀 Дроп запущен в космос!",
      in_transit: "🌍 Твой сет путешествует по миру",
      out_for_delivery: "🏃‍♂️ Курьер уже бежит к тебе!",
      delivered: "🎉 Дроп доставлен! Время распаковки",
      exception: "🤔 Что-то пошло не так, но мы разберемся",
    }

    return messages[status as keyof typeof messages] || "📦 Отслеживаем твой дроп"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Link
              href="/account/orders"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
            <div>
              <h1 className="text-3xl font-bold font-serif">Package Tracking</h1>
              <p className="text-muted-foreground">Track your SVOI™ drop in real-time</p>
            </div>
          </div>

          {loading && (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Truck className="h-12 w-12 mx-auto text-muted-foreground animate-pulse" />
                  <p className="text-muted-foreground">Loading tracking information...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold mb-2">Tracking Not Found</h3>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button asChild>
                      <Link href="/account/orders">View All Orders</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {trackingInfo && (
            <>
              {/* Tracking Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-3">
                        <Truck className="h-5 w-5" />
                        Tracking #{trackingInfo.trackingNumber}
                      </CardTitle>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(trackingInfo.status)}
                        <span className="text-sm text-muted-foreground">via {trackingInfo.carrier}</span>
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={trackingInfo.trackingUrl} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Carrier Site
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-2">{getBrandedMessage(trackingInfo.status)}</h3>
                    {trackingInfo.estimatedDelivery && (
                      <p className="text-muted-foreground">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Estimated delivery: {trackingInfo.estimatedDelivery}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Tracking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingInfo.updates.map((update, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-primary" : "bg-muted"}`} />
                          {index < trackingInfo.updates.length - 1 && <div className="w-px h-12 bg-border mt-2" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{update.status}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(update.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <MapPin className="h-3 w-3" />
                            {update.location}
                          </div>
                          <p className="text-sm text-muted-foreground">{update.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Carrier</h4>
                      <p className="text-muted-foreground">{trackingInfo.carrier}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Service</h4>
                      <p className="text-muted-foreground">Express Delivery</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      📱 Псс! Друг! Видел, сколько кони берут за переправу? Может, апнем ещё дроп — а я подгоню промо в
                      ЛС 😉
                    </p>
                    <p>🔄 Tracking updates automatically every few hours</p>
                    <p>📞 Questions? Hit us up on Telegram or Instagram</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
