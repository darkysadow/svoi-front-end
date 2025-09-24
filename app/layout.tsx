import type React from "react"
import { Inter, Manrope } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { QuestProvider } from "@/contexts/quest-context"
import { LanguageProvider } from "@/contexts/language-context"
import { CustomCursor } from "@/components/custom-cursor"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata = {
  title: "SVOI™ - Limited Drops & Exclusive Collections",
  description:
    "Underground streetwear brand featuring glitch aesthetics, limited drops, and exclusive seasonal collections.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} dark`}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                <QuestProvider>
                  {children}
                  <CustomCursor />
                  <Toaster />
                </QuestProvider>
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Script src={process.env.NEXT_PUBLIC_TIDIO_SRC} async />
      </body>
    </html>
  )
}
