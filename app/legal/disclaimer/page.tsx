import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Info, Shield } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="glitch-text" data-text="DISCLAIMER">
                DISCLAIMER
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">Important information about SVOI products and services</p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  General Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Use at Your Own Risk</p>
                  <p className="text-sm text-muted-foreground">
                    The information on this website is provided on an "as is" basis. To the fullest extent permitted by
                    law, SVOI excludes all representations, warranties, obligations, and liabilities arising out of or
                    in connection with this website and its contents.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm space-y-2">
                  <li>• Product colors may vary due to monitor settings and lighting conditions</li>
                  <li>• Sizing may vary between different product lines and manufacturers</li>
                  <li>• Limited edition items are subject to availability and may sell out quickly</li>
                  <li>• Product descriptions are provided for informational purposes only</li>
                  <li>• We reserve the right to modify product specifications without notice</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  SVOI will not be liable for any damages arising from the use of this website or our products,
                  including:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Direct or indirect damages</li>
                    <li>• Loss of profits or revenue</li>
                    <li>• Business interruption</li>
                    <li>• Data loss or corruption</li>
                  </ul>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Personal injury or property damage</li>
                    <li>• Third-party claims</li>
                    <li>• Service interruptions</li>
                    <li>• Technical malfunctions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>External Links</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our website may contain links to external sites. SVOI is not responsible for the content, privacy
                  policies, or practices of any third-party websites. We encourage you to review the terms and privacy
                  policies of any external sites you visit.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• External links are provided for convenience only</li>
                  <li>• We do not endorse third-party content or services</li>
                  <li>• Use external links at your own discretion and risk</li>
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
