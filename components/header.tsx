"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { AuthDropdown } from "@/components/auth/auth-dropdown"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Menu, Search } from "lucide-react"
import { useSeasonLinks } from "@/hooks/use-season-links"

export function Header() {
  const [cartCount] = useState(0)
  const { seasonsLinks, loading, error } = useSeasonLinks()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="glitch-text text-2xl font-bold" data-text="SVOI™">
              SVOI™
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/catalog" className="text-sm font-medium text-foreground hover:text-red-500 transition-colors">
              Full Catalog
            </Link>
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading seasons...</div>
            ) : error ? (
              <div className="text-sm text-red-500">Error loading seasons</div>
            ) : (
              seasonsLinks.map((season) => (
                <Link
                  key={season.slug}
                  href={`/season/${season.slug}`}
                  className="relative text-sm font-medium text-foreground hover:text-red-500 transition-colors"
                >
                  {season.shortName}
                </Link>
              ))
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>

            <LanguageSwitcher />

            <AuthDropdown />

            <CartDrawer />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="glitch-text text-xl font-bold mb-4" data-text="SVOI™">
                    SVOI™
                  </div>

                  <div className="pb-4 border-b border-border">
                    <LanguageSwitcher />
                  </div>

                  <Link href="/catalog" className="text-lg font-medium hover:text-red-500 transition-colors">
                    Full Catalog
                  </Link>

                  {loading ? (
                    <div className="text-sm text-muted-foreground">Loading seasons...</div>
                  ) : error ? (
                    <div className="text-sm text-red-500">Error loading seasons</div>
                  ) : (
                    seasonsLinks.map((season) => (
                      <Link
                        key={season.slug}
                        href={`/season/${season.slug}`}
                        className="flex items-center justify-between text-lg font-medium hover:text-red-500 transition-colors"
                      >
                        {season.name}
                      </Link>
                    ))
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
