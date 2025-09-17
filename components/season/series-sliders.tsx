"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useSeason } from "@/hooks/use-season"

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
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {season.isActive ? t("seasons.live") : t("seasons.ended")}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm max-w-md">{drop.description}</p>

              {drop.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {drop.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}

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
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {drop.products.map((product, productIndex) => (
              <div key={productIndex} className="flex-shrink-0 w-64">
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Product Image</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      {product.discountedPrice ? (
                        <>
                          <span className="text-lg font-bold">${product.discountedPrice}</span>
                          <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold">${product.price}</span>
                      )}
                    </div>
                    {product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
