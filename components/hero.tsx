"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { useHeroComponent } from "@/hooks/use-hero-component"
import Preloader from "./ui/preloader"
import clsx from "clsx"

export function Hero() {
  const { t } = useLanguage()
  const { error, hero, loading } = useHeroComponent()

  if (!hero || loading) {
    return (
      <section className="bg-card/30 min-h-[80vh] noise-bg w-full relative">
        <Preloader />
      </section>
    )
  } 

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden noise-bg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"
        style={{
          backgroundImage: `url(${hero.bg || "/hero-banner.png"})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="flex flex-row gap-2 items-center justify-center">
          {hero.tags?.map((item, index) => (
            <Badge key={index} variant="secondary" className="mb-6 text-sm">
              {item.name}
            </Badge>
          ))}
        </div>
        

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="glitch-text" data-text={hero.title.split(" ")[0]}>
            {hero.title.split(" ")[0]}
          </span>
          <br />
          <span className="text-primary">{hero.title.split(" ")[1]}</span>
          <br />
          <span className="text-secondary">{hero.title.split(" ")[2]}</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{hero.description}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {hero.links.map((item, index) => (
            <Link key={index} href={item.link || "/catalog"}>
              <Button size="lg" variant={item.variant as any || 'default'} 
                className={clsx("text-lg px-8 py-6", {
                  'bg-transparent': item.variant === "outline"
                })}
              >
                {item.title}
              </Button>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">

          {hero.bullets?.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={clsx("w-2 h-2 rounded-full animate-pulse", {
                "bg-accent": index === 1 || index % 3 === 0,
                "bg-secondary": index % 2 === 0,
              })} />
              {item.feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
