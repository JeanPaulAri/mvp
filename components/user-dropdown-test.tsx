"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings, CreditCard, LogOut, Gauge } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserDropdownTestProps {
  handleNavigation: (targetId: string) => void
}

export function UserDropdownTest({ handleNavigation }: UserDropdownTestProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <Button 
        variant="ghost" 
        className="relative h-10 w-10 rounded-full hover:bg-secondary hover:scale-105 transition-all duration-300 p-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
          JP
        </div>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[99998]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute right-0 top-12 w-56 z-[99999] bg-popover text-popover-foreground border border-border shadow-xl rounded-md animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="p-1">
              {/* User Info */}
              <div className="px-2 py-1.5 text-sm font-medium">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Jean Paul</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    jeanpaul@example.com
                  </p>
                </div>
              </div>
              
              <div className="bg-border -mx-1 my-1 h-px" />
              
              {/* Menu Items */}
              <button 
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  handleNavigation("trending")
                  setIsOpen(false)
                }}
              >
                <Gauge className="h-4 w-4" />
                <span>Tendencias</span>
              </button>
              
              <Link 
                href="/profile"
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent transition-colors duration-200 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4" />
                <span>Editar Perfil</span>
              </Link>
              
              <button 
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  router.push("/subscription")
                  setIsOpen(false)
                }}
              >
                <CreditCard className="h-4 w-4" />
                <span>Administrar Suscripción</span>
              </button>
              
              <div className="bg-border -mx-1 my-1 h-px" />
              
              <button 
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950 transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  console.log("Cerrando sesión...")
                  setIsOpen(false)
                  // Aquí puedes agregar la lógica de logout
                }}
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}