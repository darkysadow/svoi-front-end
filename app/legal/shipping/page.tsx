import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, MapPin, CreditCard } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="glitch-text" data-text="SHIPPING">
                SHIPPING
              </span>{" "}
              INFO
            </h1>
            <p className="text-lg text-muted-foreground">
              Transparent delivery costs calculated in real-time through our logistics partners
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Delivery Partners
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">EU Delivery</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• DHL Parcel (3-5 business days)</li>
                      <li>• GLS (4-6 business days)</li>
                      <li>• SEUR (Spain: 2-3 business days)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">International</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• DHL Express (2-4 business days)</li>
                      <li>• Correos Express (backup option)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Pricing Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold text-primary mb-2">Honest & Transparent</p>
                  <p className="text-sm text-muted-foreground">
                    All shipping costs are calculated automatically at checkout through our carrier APIs. No hidden
                    fees, no subsidized shipping - just real carrier rates passed directly to you.
                  </p>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Real-time rate calculation at checkout</li>
                  <li>• No minimum order requirements</li>
                  <li>• Costs vary by destination and package weight</li>
                  <li>• Promotional codes don't apply to shipping</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Processing & Delivery Times
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <h3 className="font-semibold mb-2">Processing</h3>
                    <p className="text-2xl font-bold text-primary mb-1">1-2</p>
                    <p className="text-sm text-muted-foreground">business days</p>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <h3 className="font-semibold mb-2">EU Delivery</h3>
                    <p className="text-2xl font-bold text-primary mb-1">3-6</p>
                    <p className="text-sm text-muted-foreground">business days</p>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <h3 className="font-semibold mb-2">International</h3>
                    <p className="text-2xl font-bold text-primary mb-1">2-7</p>
                    <p className="text-sm text-muted-foreground">business days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Tracking & Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Once your order ships, you'll receive tracking information via email and can monitor your package
                  through our tracking system or directly with the carrier.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Automatic tracking number generation</li>
                  <li>• Email notifications for status updates</li>
                  <li>• Real-time tracking through carrier websites</li>
                  <li>• SMS notifications available for some carriers</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
