"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useSeason } from "@/hooks/use-season"
import { ProductCard } from "../product-card"

interface SeriesSlidersProps {
  seasonSlug: string
}

export function SeriesSliders({ seasonSlug }: SeriesSlidersProps) {
  const { season, loading, error } = useSeason(seasonSlug)
  const { t } = useLanguage()

  const scrollLeft = (containerId: string) => {
    const container = document.getElementById(containerId)
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = (containerId: string) => {
    const container = document.getElementById(containerId)
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  if (loading) {
    return (
      <div className="space-y-12 mt-12">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-6">
            <div className="h-8 w-64 bg-muted animate-pulse rounded"></div>
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex-shrink-0 w-64 h-80 bg-muted animate-pulse rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error || !season) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {error ? t("seasons.errorLoadingCollections") : t("seasons.noCollectionsAvailable")}
        </p>
      </div>
    )
  }

  const drops = season.drops || []

  if (drops.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t("seasons.noCollectionsAvailable")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 mt-12">
      {drops.map((drop, index) => (
        <div key={drop.name} className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold font-serif">{drop.name}</h2>
                {drop.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {drop.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-sm max-w-md">{drop.description}</p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  {drop.products.length} {t("seasons.products")}
                </span>
              </div>
            </div>

            {drop.products.length > 3 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => scrollLeft(`drop-${index}`)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => scrollRight(`drop-${index}`)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div
            id={`drop-${index}`}
            className="flex gap-6 overflow-x-auto scrollbar-hide pt-1 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {drop.products.map((product, productIndex) => (
              <div key={product.documentId} className="flex-shrink-0 w-64">
                <ProductCard key={productIndex} product={product} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
