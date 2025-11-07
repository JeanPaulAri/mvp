"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Minus, Plus, Trash2, CreditCard } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function CartDropdown() {
  const { state, removeItem, updateQuantity } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevItemCount, setPrevItemCount] = useState(0)
  const router = useRouter()

  // Detectar cuando se agrega un item para animar
  useEffect(() => {
    if (state.itemCount > prevItemCount) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }
    setPrevItemCount(state.itemCount)
  }, [state.itemCount, prevItemCount])

  const formatPrice = (price: string) => {
    return price.replace('$', '$')
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`hover:bg-secondary relative transition-all duration-300 ${
            isAnimating ? "animate-bounce" : ""
          } ${
            state.itemCount > 0 ? "hover:scale-110" : ""
          }`}
        >
          <ShoppingCart className={`w-5 h-5 transition-all duration-300 ${
            isAnimating ? "rotate-12 scale-125" : ""
          } ${
            state.itemCount > 0 ? "text-primary" : ""
          }`} />
          {state.itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className={`absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center transition-all duration-500 ${
                isAnimating ? "animate-pulse scale-125" : "animate-none"
              }`}
            >
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-[400px] sm:w-[540px] z-[9999]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-rubik-80s-fade">
            <ShoppingCart className="w-5 h-5" />
            Carrito de Compras
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
              <p className="text-muted-foreground text-center mb-4">
                Explora nuestra tienda y agrega música increíble a tu carrito
              </p>
              <Button asChild>
                <Link href="/#store">
                  Ir a la Tienda
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Items del carrito */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {state.items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex gap-3 p-3 rounded-lg border bg-card/50 animate-in slide-in-from-right-5 fade-in duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted transform transition-transform duration-300 hover:scale-105">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-xs font-medium">{item.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                      <p className="text-muted-foreground text-xs">{item.artist}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <span className="font-semibold text-primary">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      
                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 hover:scale-110 transition-all duration-200 hover:bg-red-50 hover:border-red-200"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3 hover:text-red-600" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center animate-in zoom-in duration-200">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 hover:scale-110 transition-all duration-200 hover:bg-green-50 hover:border-green-200"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3 hover:text-green-600" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:scale-110 hover:bg-red-50 transition-all duration-200 group"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4 group-hover:animate-pulse" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Total */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Items ({state.itemCount})
                  </span>
                  <span className="font-semibold">
                    ${state.total.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    ${state.total.toFixed(2)}
                  </span>
                </div>

                {/* Botón de checkout */}
                <Button 
                  asChild 
                  className="w-full mt-4 hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" 
                  size="lg"
                >
                  <Link href="/checkout" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 animate-pulse" />
                    Proceder al Pago
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full hover:scale-105 transition-all duration-300 hover:bg-secondary/50"
                  onClick={() => {
                    setIsOpen(false)
                    // Navegamos a la página principal y luego hacemos scroll a la tienda
                    router.push("/")
                    setTimeout(() => {
                      const storeElement = document.getElementById("store")
                      if (storeElement) {
                        storeElement.scrollIntoView({ behavior: "smooth" })
                      }
                    }, 100)
                  }}
                >
                  Continuar Comprando
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}