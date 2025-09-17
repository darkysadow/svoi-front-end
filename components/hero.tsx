"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden noise-bg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"
        style={{
          backgroundImage: `url('/hero-banner.png')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <Badge variant="secondary" className="mb-6 text-sm">
          {t("hero.limitedDrop")}
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="glitch-text" data-text={t("hero.underground")}>
            {t("hero.underground")}
          </span>
          <br />
          <span className="text-primary">{t("hero.culture")}</span>
          <br />
          <span className="text-secondary">{t("hero.redefined")}</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t("hero.description")}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/catalog">
            <Button size="lg" className="text-lg px-8 py-6">
              {t("actions.grabTheDrop")}
            </Button>
          </Link>
          <Link href="/season/season-1">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              {t("actions.exploreCollections")}
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {t("hero.limitedQuantities")}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            {t("hero.exclusiveDesigns")}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            {t("hero.undergroundCulture")}
          </div>
        </div>
      </div>
    </section>
  )
}
