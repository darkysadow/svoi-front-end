"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Twitter, Youtube, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="glitch-text text-xl font-bold mb-4" data-text="SVOI™">
              SVOI™
            </div>
            <p className="text-sm text-muted-foreground mb-4">{t("footer.brandDescription")}</p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.collections")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/season/season-1" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.season1")}
                </Link>
              </li>
              <li>
                <Link href="/season/season-2" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.season2")}
                </Link>
              </li>
              <li>
                <Link href="/season/mix-life" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.mixLife")}
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.allProducts")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.support")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.shippingInfo")}
                </Link>
              </li>
              <li>
                <Link href="/legal/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.returns")}
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.termsOfService")}
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.stayUpdated")}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t("footer.newsletterDesc")}</p>
            <div className="flex space-x-2">
              <Input placeholder={t("footer.enterEmail")} className="flex-1" />
              <Button size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/legal/disclaimer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("footer.disclaimer")}
            </Link>
            <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
