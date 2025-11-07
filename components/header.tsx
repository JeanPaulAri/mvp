"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { CartDropdown } from "@/components/cart-dropdown"
import { UserDropdownTest } from "@/components/user-dropdown-test"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("")

  // Detectar la sección activa basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["trending", "membership", "store"]
      const headerHeight = 80
      const scrollPosition = window.scrollY + headerHeight

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    if (pathname === "/dashboard") {
      window.addEventListener("scroll", handleScroll)
      handleScroll() // Check initial position
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const handleNavigation = (targetId: string) => {
    if (pathname === "/dashboard") {
      const element = document.getElementById(targetId)
      if (element) {
        const headerHeight = 80 // Altura del header + algo de padding
        const elementTop = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementTop - headerHeight,
          behavior: "smooth",
        })
      }
    } else {
      router.push(`/dashboard#${targetId}`)
    }
  }

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎵</span>
                </div>
              </div>
              <span className="font-rubik-80s-fade text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Taki-Kapchiy
              </span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation("trending")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "trending" 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
            >
              Tendencias
            </button>
            <button 
              onClick={() => handleNavigation("membership")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "membership" 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
            >
              Membresías
            </button>
            <Link 
              href="/profile" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/profile" 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
            >
              Perfil
            </Link>
            <button 
              onClick={() => handleNavigation("store")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "store" 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
            >
              Tienda
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Buscar assets musicales..."
                className="w-64 pl-10 bg-background/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <CartDropdown />
            
            {/* User Dropdown Menu */}
            <UserDropdownTest handleNavigation={handleNavigation} />
            
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-secondary">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
