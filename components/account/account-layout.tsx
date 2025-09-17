"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Package, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

interface AccountLayoutProps {
  children: React.ReactNode
}

export function AccountLayout({ children }: AccountLayoutProps) {
  const { state, logout } = useAuth()
  const { t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      router.push("/")
    }
  }, [state.isLoading, state.isAuthenticated, router])

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">{t("status.loading")}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!state.isAuthenticated) {
    return null // Will redirect
  }

  const userInitials =
    state.user?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U"

  const navigationItems = [
    {
      href: "/account",
      label: t("account.profile"),
      icon: User,
      active: pathname === "/account",
    },
    {
      href: "/account/orders",
      label: t("account.orders"),
      icon: Package,
      active: pathname === "/account/orders",
    },
    {
      href: "/account/settings",
      label: t("account.settings"),
      icon: Settings,
      active: pathname === "/account/settings",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-serif">{t("account.myAccount")}</h1>
            <p className="text-muted-foreground mt-2">{t("account.manageProfile")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{state.user?.name}</h3>
                      <p className="text-sm text-muted-foreground">{state.user?.email}</p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                            item.active
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Logout Button */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button
                      variant="ghost"
                      onClick={logout}
                      className="w-full justify-start text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      {t("account.signOut")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
