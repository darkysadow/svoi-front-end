import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Database, Mail } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="glitch-text" data-text="PRIVACY">
                PRIVACY
              </span>{" "}
              POLICY
            </h1>
            <p className="text-lg text-muted-foreground">How we collect, use, and protect your personal information</p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: December 2024</p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Name, email address, phone number</li>
                      <li>• Shipping and billing addresses</li>
                      <li>• Payment information (processed securely via Stripe)</li>
                      <li>• Account preferences and order history</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Automatic Information</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• IP address and browser information</li>
                      <li>• Device type and operating system</li>
                      <li>• Pages visited and time spent on site</li>
                      <li>• Referral sources and search terms</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Order Processing</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Process and fulfill orders</li>
                      <li>• Send order confirmations and updates</li>
                      <li>• Handle returns and exchanges</li>
                      <li>• Provide customer support</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Marketing & Analytics</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Send promotional emails (with consent)</li>
                      <li>• Analyze website usage and performance</li>
                      <li>• Personalize shopping experience</li>
                      <li>• Improve our products and services</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Data Protection & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <p className="font-semibold text-primary mb-2">Your Data is Secure</p>
                  <p className="text-sm">
                    We implement industry-standard security measures to protect your personal information and never
                    store payment details on our servers.
                  </p>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• SSL encryption for all data transmission</li>
                  <li>• Secure payment processing via Stripe</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Limited access to personal information</li>
                  <li>• Data backup and recovery procedures</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Your Rights & Choices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">GDPR Rights (EU Residents)</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Right to access your personal data</li>
                      <li>• Right to rectify inaccurate information</li>
                      <li>• Right to erase your data ("right to be forgotten")</li>
                      <li>• Right to restrict or object to processing</li>
                      <li>• Right to data portability</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Marketing Communications</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Unsubscribe from emails at any time</li>
                      <li>• Opt out of SMS notifications</li>
                      <li>• Control cookie preferences</li>
                      <li>• Manage account notification settings</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  We work with trusted third-party services to provide you with the best shopping experience:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Payment Processing</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Stripe (payment processing)</li>
                      <li>• PayPal (alternative payments)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Analytics & Marketing</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Google Analytics 4</li>
                      <li>• Meta Pixel (Facebook/Instagram)</li>
                      <li>• Tidio (customer support chat)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have questions about this Privacy Policy or want to exercise your rights, contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p>Email: privacy@svoi.com</p>
                  <p>Instagram: @svoi.official</p>
                  <p>Telegram: @svoi_support</p>
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
