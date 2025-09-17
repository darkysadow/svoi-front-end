"use client"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useMemo } from "react"
import { products } from "@/lib/product-data"
import { useFilterStore } from "@/lib/stores/filter-store"

export function ProductGrid() {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  const { seasons, series, sizes, colors, tags, priceRange, searchQuery, sortBy, viewMode } = useFilterStore()

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Apply filters
    if (seasons.length > 0) {
      filtered = filtered.filter((product) => seasons.includes(product.season))
    }
    if (series.length > 0) {
      filtered = filtered.filter((product) => series.includes(product.series))
    }
    if (colors.length > 0) {
      filtered = filtered.filter((product) => product.variants.colors.some((color) => colors.includes(color.name)))
    }
    if (sizes.length > 0) {
      filtered = filtered.filter((product) => product.variants.sizes.some((size) => sizes.includes(size)))
    }
    if (tags.length > 0) {
      filtered = filtered.filter((product) => product.badges?.some((badge) => tags.includes(badge)) || false)
    }
    if (priceRange[0] > 0 || priceRange[1] < 500) {
      filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "popular":
        filtered.sort((a, b) => b.quantity - a.quantity)
        break
      case "newest":
      default:
        // Keep original order for newest
        break
    }

    return filtered
  }, [seasons, series, sizes, colors, tags, priceRange, searchQuery, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  if (loading) {
    return (
      <div className="space-y-6">
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
        </p>
      </div>

      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}
      >
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your filters.</p>
          <Button variant="outline" className="mt-4 bg-transparent" onClick={() => (window.location.href = "/catalog")}>
            Clear Filters
          </Button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
