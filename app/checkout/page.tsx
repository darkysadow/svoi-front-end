import { CheckoutForm } from "@/components/checkout/checkout-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CheckoutForm />
      </main>
      <Footer />
    </div>
  )
}
