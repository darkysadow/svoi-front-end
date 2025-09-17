import { Suspense } from "react"
import { CheckoutSuccess } from "@/components/checkout/checkout-success"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <div className="h-8 w-8 bg-primary/20 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-primary/10 rounded animate-pulse" />
                <div className="h-4 bg-primary/5 rounded animate-pulse" />
              </div>
            </div>
          }
        >
          <CheckoutSuccess />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
