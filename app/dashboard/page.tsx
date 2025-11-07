"use client"

import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { MembershipSelector } from "@/components/membership-selector"
import { Store } from "@/components/store"
import { useEffect } from "react"

export default function DashboardPage() {
  useEffect(() => {
    // Manejar navegación por hash cuando la página se carga
    if (typeof window !== "undefined") {
      const hash = window.location.hash
      if (hash) {
        // Actualizar la URL sin hash y luego hacer scroll
        window.history.replaceState(null, "", window.location.pathname)
        
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            const headerHeight = 80
            const elementTop = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
              top: elementTop - headerHeight,
              behavior: "smooth",
            })
          }
        }, 100) // Pequeño delay para asegurar que los elementos estén renderizados
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background starfield">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-12 pt-20">
        <section id="trending">
          <Dashboard />
        </section>
        <section id="membership">
          <MembershipSelector />
        </section>
        <section id="store">
          <Store />
        </section>
      </main>
    </div>
  )
}