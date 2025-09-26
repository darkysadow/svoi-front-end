"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useAboutComponent } from "@/hooks/use-about-component"
import Preloader from "./ui/preloader"
import Markdown from 'react-markdown'
import clsx from "clsx"
import { sendGTMEvent } from "@next/third-parties/google"

export function AboutBrand() {
  const { t } = useLanguage()
  const { aboutSection, error, loading } = useAboutComponent()

  if (!aboutSection || loading) {
    return (
      <section className="min-h-[40rem] w-full relative">
        <Preloader />
      </section>
    )
  } 
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="glitch-text" data-text={aboutSection.title.split(" ")[0]}>
                {aboutSection.title.split(" ")[0]}
              </span>{" "}
              <span className="text-primary">{t("about.aboutSvoi").split(" ")[1]}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <Markdown>{aboutSection.description}</Markdown>
            </div>
            <Button className="mt-8" size="lg" onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'xyz' })}>
              {t("actions.learnMore")}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {aboutSection.aboutGrid.map((item, index) => (
              <Card className="border-border" key={index}>
                <CardContent className="p-6 text-center">
                  <div className={clsx("text-2xl font-bold mb-2", {
                    "text-primary": index < 1 || index > 2,
                    "text-secondary": index === 1,
                    "text-accent": index === 2
                  })}>{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
