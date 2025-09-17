"use client"

import { ProductCard } from "@/components/product-card"

interface ProductRecommendationsProps {
  currentProductId: string
  season: string
}

// Mock recommendations data
const mockRecommendations = [
  {
    id: "3",
    name: "Urban Decay Jacket",
    price: 150,
    image: "/placeholder.svg?height=400&width=400&text=Urban+Decay+Jacket",
    badges: ["Exclusive"],
    season: "Season 1",
    series: "Urban Decay",
    colors: ["Black", "Gray"],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "4",
    name: "Digital Void Pants",
    price: 75,
    image: "/placeholder.svg?height=400&width=400&text=Digital+Void+Pants",
    badges: ["Bestseller"],
    season: "Season 2",
    series: "Digital Void",
    colors: ["Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "5",
    name: "Glitch Cap",
    price: 35,
    image: "/placeholder.svg?height=400&width=400&text=Glitch+Cap",
    badges: ["New"],
    season: "Season 1",
    series: "Genesis",
    colors: ["Black", "White"],
    sizes: ["One Size"],
  },
  {
    id: "6",
    name: "Neon Backpack",
    price: 95,
    image: "/placeholder.svg?height=400&width=400&text=Neon+Backpack",
    badges: ["Limited Drop"],
    season: "Season 2",
    series: "Neon Dreams",
    colors: ["Black", "Neon Green"],
    sizes: ["One Size"],
  },
]

export function ProductRecommendations({ currentProductId, season }: ProductRecommendationsProps) {
  // Filter out current product and get recommendations from same season
  const recommendations = mockRecommendations.filter((product) => product.id !== currentProductId).slice(0, 4)

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-serif">You Might Also Like</h2>
        <p className="text-muted-foreground">Discover more from our {season} collection</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
