import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Inter } from "next/font/google"
import { Rubik_80s_Fade } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
// @ts-ignore: ignore missing type declarations for scss modules
import "./globals.scss"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/cart-context"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

const rubik80sFade = Rubik_80s_Fade({
  subsets: ["latin"],
  variable: "--font-rubik-80s-fade",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Taki-Kapchiy - Marketplace Musical para Videojuegos",
  description: "El marketplace definitivo para música y efectos de sonido para videojuegos",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`font-sans ${montserrat.variable} ${inter.variable} ${rubik80sFade.variable} starfield`}>
        <CartProvider>
          <Suspense>
            {children}
            <Analytics />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  )
}
