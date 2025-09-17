import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Clock, Package, AlertCircle } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="glitch-text" data-text="RETURNS">
                RETURNS
              </span>{" "}
              & EXCHANGES
            </h1>
            <p className="text-lg text-muted-foreground">
              We want you to love your SVOI pieces. Here's how returns work.
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Return Window
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary mb-2">30-Day Return Policy</p>
                  <p className="text-sm">
                    You have 30 days from delivery to initiate a return. Items must be unworn, unwashed, and in original
                    condition with all tags attached.
                  </p>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Return window starts from delivery date</li>
                  <li>• Original packaging not required but recommended</li>
                  <li>• All original tags must be attached</li>
                  <li>• Items must be in sellable condition</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Return Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      1
                    </div>
                    <h3 className="font-semibold mb-2">Contact Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Reach out via Instagram, Telegram, or email to initiate your return
                    </p>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      2
                    </div>
                    <h3 className="font-semibold mb-2">Get Label</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll provide a prepaid return label and instructions
                    </p>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      3
                    </div>
                    <h3 className="font-semibold mb-2">Ship Back</h3>
                    <p className="text-sm text-muted-foreground">Package securely and ship using our provided label</p>
                  </div>
                </div>
                <div className="text-center">
                  <Button className="mt-4">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Start Return Process
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Return Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-green-400 mb-2">✓ Returnable Items</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Unworn clothing with tags</li>
                      <li>• Accessories in original condition</li>
                      <li>• Items within 30-day window</li>
                      <li>• Non-personalized products</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-400 mb-2">✗ Non-Returnable Items</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Worn or washed items</li>
                      <li>• Items without tags</li>
                      <li>• Custom/personalized pieces</li>
                      <li>• Sale items (case by case)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Refund Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Processing Time: 5-10 business days</p>
                  <p className="text-sm text-muted-foreground">
                    Refunds are processed to your original payment method once we receive and inspect your return.
                    Original shipping costs are non-refundable unless the return is due to our error.
                  </p>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Refunds processed to original payment method</li>
                  <li>• Bank processing may take additional 3-5 days</li>
                  <li>• Return shipping costs deducted from refund</li>
                  <li>• Exchanges processed as new orders</li>
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
