import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductRecommendations } from "@/components/product/product-recommendations"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/product-data"
import { useProduct } from "@/hooks/use-product"
import { SingleProduct } from "@/components/product/single-product"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  
  

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SingleProduct productSlug={params.id} />
      </main>
      <Footer />
    </div>
  )
}
