"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Menu, Settings, CreditCard, LogOut, Gauge } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { CartDropdown } from "@/components/cart-dropdown"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("")

  // Detectar la sección activa basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["dashboard", "store"]
      const scrollPosition = window.scrollY + 100

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

    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll)
      handleScroll() // Check initial position
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const handleNavigation = (targetId: string) => {
    if (pathname === "/") {
      // Si estamos en la página principal, hacer scroll suave
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Si estamos en otra página, navegar y luego hacer scroll
      router.push(`/#${targetId}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                SoundHub
              </span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation("dashboard")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "dashboard" || pathname === "/profile" 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
            >
              Dashboard
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full hover:bg-secondary hover:scale-105 transition-all duration-300 p-0"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                    JP
                  </div>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                align="end" 
                className="w-56"
                sideOffset={5}
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Jean Paul</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      jeanpaul@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={() => {
                    if (pathname === "/") {
                      const dashboardElement = document.getElementById("dashboard")
                      if (dashboardElement) {
                        dashboardElement.scrollIntoView({ behavior: "smooth" })
                      }
                    } else {
                      router.push("/#dashboard")
                    }
                  }}
                >
                  <Gauge className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Editar Perfil</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => router.push("/subscription")}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Administrar Suscripción</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600"
                  onClick={() => {
                    console.log("Cerrando sesión...")
                    // Aquí puedes agregar la lógica de logout
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-secondary">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}