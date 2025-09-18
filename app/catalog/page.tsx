import { CatalogHeader } from "@/components/catalog/catalog-header"
import { ProductFilters } from "@/components/catalog/product-filters"
import { ProductGrid } from "@/components/catalog/product-grid"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CatalogHeader />
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <aside className="lg:w-64 flex-shrink-0">
            <Suspense fallback={<div>Loading...</div>}>
              <ProductFilters />
            </Suspense>
          </aside>
          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
