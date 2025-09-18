"use client"

import { Badge } from "@/components/ui/badge"
import { Users, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useSeason } from "@/hooks/use-season"

interface SeasonHeaderProps {
  slug: string
}

export function SeasonHeader({ slug }: SeasonHeaderProps) {
  const { season, loading, error } = useSeason(slug)
  const { t } = useLanguage()

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-lg bg-card border border-border">
        <div className="h-80 md:h-96 bg-muted animate-pulse flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-8 w-48 bg-muted-foreground/20 rounded mx-auto"></div>
            <div className="h-4 w-64 bg-muted-foreground/20 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !season) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-muted-foreground">
          {error ? t("seasons.errorLoading") : t("seasons.dropNotFound")}
        </h1>
      </div>
    )
  }

  const formatDropDate = (dateString?: string) => {
    if (!dateString) return "TBA"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const bannerImage = season.banner?.url
    ? `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT?.replace("/graphql", "")}${season.banner.url}`
    : "/season-banner.jpg"

  return (
    <div className="relative overflow-hidden rounded-lg bg-card border border-border">
      <div
        className="relative h-80 md:h-96 bg-cover bg-center noise-bg"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/20" />

        <div className="absolute top-6 right-6 flex flex-col gap-2 text-right">
          {season.drops.length > 0 && (
            <div className="text-sm text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
              <Users className="inline w-4 h-4 mr-1" />
              {season.drops.length} {t("seasons.collections")}
            </div>
          )}
        </div>

        <div className="relative h-full flex items-center justify-center text-center p-6">
          <div className="space-y-6 max-w-4xl">
            {season.tags.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-1">
                {season.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="bg-green-500/20 text-sm text-green-400 border-green-500/30">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-7xl font-bold glitch-text font-serif" data-text={season.name}>
              {season.name}
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">{season.description}</p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
              {season.expiresOn && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {t("seasons.expires")} {formatDropDate(season.expiresOn)}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>
                  {season.drops.length} {t("seasons.collections")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>
                  {season.drops.reduce((total, drop) => total + drop.products.length, 0)} {t("seasons.totalPieces")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
