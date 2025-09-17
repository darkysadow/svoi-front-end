"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function AboutBrand() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="glitch-text" data-text={t("about.aboutSvoi").split(" ")[0]}>
                {t("about.aboutSvoi").split(" ")[0]}
              </span>{" "}
              <span className="text-primary">{t("about.aboutSvoi").split(" ")[1]}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("about.description1")}</p>
              <p>{t("about.description2")}</p>
              <p>{t("about.description3")}</p>
            </div>
            <Button className="mt-8" size="lg">
              {t("actions.learnMore")}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">{t("about.limitedPieces")}</div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-secondary mb-2">3</div>
                <div className="text-sm text-muted-foreground">{t("about.activeSeasons")}</div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-2">24h</div>
                <div className="text-sm text-muted-foreground">{t("about.dropWindow")}</div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">{t("about.exclusive")}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
