import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SeasonsSection } from "@/components/seasons-section"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutBrand } from "@/components/about-brand"
import { Footer } from "@/components/footer"
import { OnboardingQuest } from "@/components/quest/onboarding-quest"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <OnboardingQuest />
      <Header />
      <main>
        <Hero />
        <SeasonsSection />
        <FeaturedProducts />
        <AboutBrand />
      </main>
      <Footer />
    </div>
  )
}
