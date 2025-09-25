"use client"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useFilteredProducts } from "@/hooks/use-filtered-products"

export function ProductGrid() {
  const { products, loading, currentPage, setCurrentPage, totalPages, viewMode } = useFilteredProducts()

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
        {/* {<p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
        </p>} */}
      </div>

      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}
      >
        {products.map((product) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </div>

      {products.length === 0 && (
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
