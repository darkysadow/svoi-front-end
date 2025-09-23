"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useSeasons } from "@/hooks/use-seasons"

const seasons = [
  {
    id: 1,
    name: "Season 1",
    slug: "season-1",
    descriptionKey: "season1Desc",
    image: "/season-1-banner.png",
    status: "active",
    isNew: true,
    itemCount: 24,
    dropDate: "2024-01-15",
    limitedQuantity: 100,
    claimed: 67,
    viewingNow: 23,
    isLimited: true,
  },
  {
    id: 2,
    name: "Season 2",
    slug: "season-2",
    descriptionKey: "season2Desc",
    image: "/season-2-banner.png",
    status: "active",
    isNew: false,
    itemCount: 18,
    dropDate: "2024-02-20",
    limitedQuantity: 150,
    claimed: 89,
    viewingNow: 15,
    isLimited: true,
  },
  {
    id: 3,
    name: "Mix Life",
    slug: "mix-life",
    descriptionKey: "mixLifeDesc",
    image: "/placeholder.svg",
    status: "dropping-soon",
    isNew: true,
    itemCount: 12,
    dropDate: "2024-03-10",
    limitedQuantity: 75,
    claimed: 0,
    viewingNow: 45,
    isLimited: true,
  },
]

export function SeasonsSection() {
  const { t } = useLanguage()
  const  { seasons, loading, error } = useSeasons()


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{t("status.liveNow")}</Badge>
      case "dropping-soon":
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">{t("status.droppingSoon")}</Badge>
        )
      case "sold-out":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{t("status.soldOut")}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getBrandedBadge = (badge: string) => {
    switch (badge) {
      case "Limited":
        return t("limitedDrop")
      case "New":
        return t("newBadge")
      case "Custom":
        return t("customBadge")
      default:
        return badge
    }
  }

  const getClaimedPercentage = (claimed: number, total: number) => {
    return Math.round((claimed / total) * 100)
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="glitch-text" data-text={t("seasons.limitedDrops").split(" ")[0]}>
              {t("seasons.limitedDrops").split(" ")[0]}
            </span>{" "}
            <span className="text-primary">{t("seasons.drops")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("seasons.exclusiveCollections")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seasons.map((season) => (
            <Card
              key={season.documentId}
              className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 relative"
            >
              <div className="relative overflow-hidden">
                <img
                  src={season.banner?.url || "/placeholder.svg"}
                  alt={season.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {season.tags?.map((badge) => (
                      <Badge key={badge.name + 1} variant={badge.name === "Limited" ? "destructive" : "secondary"} className="text-xs">
                        {getBrandedBadge(badge.name)}
                      </Badge>
                    ))}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{season.name}</h3>
                </div>

                <Link href={`/season/${season.slug}`}>
                  <Button
                    className="w-full"
                    disabled={!season.isActive}
                    variant="default"
                  >
                    {t("actions.grabTheDrop")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
