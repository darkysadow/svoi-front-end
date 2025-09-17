import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, CreditCard, AlertTriangle } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="glitch-text" data-text="TERMS">
                TERMS
              </span>{" "}
              OF SERVICE
            </h1>
            <p className="text-lg text-muted-foreground">Legal terms and conditions for using SVOI services</p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: December 2024</p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  By accessing and using the SVOI website and services, you agree to be bound by these Terms of Service
                  and all applicable laws and regulations. If you do not agree with any of these terms, you are
                  prohibited from using or accessing this site.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Important Notice</p>
                  <p className="text-sm text-muted-foreground">
                    These terms may be updated periodically. Continued use of our services constitutes acceptance of any
                    changes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Orders & Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Order Acceptance</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• All orders are subject to acceptance and availability</li>
                      <li>• We reserve the right to refuse or cancel orders</li>
                      <li>• Prices are subject to change without notice</li>
                      <li>• Limited edition items are sold on first-come, first-served basis</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Payment Terms</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Payment is required at time of order</li>
                      <li>• We accept major credit cards and alternative payment methods</li>
                      <li>• All prices include applicable VAT for EU customers</li>
                      <li>• Currency conversion fees may apply for international orders</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary mb-2">SVOI™ Brand Protection</p>
                  <p className="text-sm">
                    All content, designs, logos, and trademarks on this site are the exclusive property of SVOI™ and are
                    protected by international copyright and trademark laws.
                  </p>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Unauthorized use of SVOI designs or logos is prohibited</li>
                  <li>• Product images and descriptions are copyrighted</li>
                  <li>• Reproduction or distribution requires written permission</li>
                  <li>• Violation may result in legal action</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Service Availability</h3>
                    <p className="text-sm text-muted-foreground">
                      While we strive to maintain continuous service, we cannot guarantee uninterrupted access to our
                      website or services. We reserve the right to modify or discontinue services without notice.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Product Information</h3>
                    <p className="text-sm text-muted-foreground">
                      We make every effort to ensure product information is accurate, but colors, materials, and
                      specifications may vary slightly from what appears on your screen due to monitor settings and
                      manufacturing variations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prohibited Uses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  You may not use our services for any unlawful purpose or to solicit others to perform unlawful acts.
                  Prohibited activities include but are not limited to:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Fraudulent or unauthorized transactions</li>
                    <li>• Harassment or abuse of other users</li>
                    <li>• Violation of intellectual property rights</li>
                    <li>• Distribution of malware or harmful code</li>
                  </ul>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automated data collection or scraping</li>
                    <li>• Impersonation of SVOI or its representatives</li>
                    <li>• Resale of products for commercial purposes</li>
                    <li>• Any activity that disrupts our services</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  These Terms of Service are governed by and construed in accordance with the laws of Spain. Any
                  disputes arising from these terms or your use of our services will be subject to the exclusive
                  jurisdiction of Spanish courts.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Contact for Legal Matters:</strong>
                  </p>
                  <p>Email: legal@svoi.com</p>
                  <p>Address: [Business Address], Spain</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
