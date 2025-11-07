"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Wallet, Shield, ArrowLeft, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simular proceso de pago
    setTimeout(() => {
      clearCart()
      setIsProcessing(false)
      alert("¡Pago procesado exitosamente! 🎉\nGracias por tu compra. Los archivos se han enviado a tu correo.")
      router.push("/")
    }, 3000)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background starfield">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-20">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4 font-rubik-80s-fade">Carrito Vacío</h1>
            <p className="text-muted-foreground mb-6">
              No tienes productos en tu carrito para proceder al pago.
            </p>
            <Button asChild>
              <Link href="/#store">
                Ir a la Tienda
              </Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background starfield">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-20 max-w-6xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver a la tienda
            </Link>
          </Button>
          <h1 className="text-3xl font-bold font-rubik-80s-fade bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Finalizar Compra
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de pago */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Información de Pago
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Método de pago */}
                  <div>
                    <Label className="text-base font-semibold">Método de Pago</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                      <div className="flex items-center space-x-2 p-3 rounded-lg border">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="w-4 h-4" />
                          Tarjeta de Crédito/Débito
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Wallet className="w-4 h-4" />
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "card" && (
                    <>
                      {/* Información de la tarjeta */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiryDate">Fecha de Expiración</Label>
                          <Input
                            id="expiryDate"
                            type="text"
                            placeholder="MM/AA"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="text"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>

                      {/* Información de facturación */}
                      <Separator />
                      <div className="space-y-4">
                        <h3 className="font-semibold">Información de Facturación</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">Nombre</Label>
                            <Input id="firstName" required />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Apellido</Label>
                            <Input id="lastName" required />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input id="email" type="email" required />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Términos y condiciones */}
                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      Acepto los <span className="text-primary underline">términos y condiciones</span> y la{" "}
                      <span className="text-primary underline">política de privacidad</span>
                    </Label>
                  </div>

                  {/* Botón de pago */}
                  <Button
                    type="submit"
                    className="w-full mt-6"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      "Procesando pago..."
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Pagar ${state.total.toFixed(2)}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resumen del pedido */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-lg border bg-muted/20">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
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
                          <span className="text-xs">Cant: {item.quantity}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-primary">{item.price}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive mt-1"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({state.itemCount} items)</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Descarga digital</span>
                      <span>Gratis</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${state.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-muted/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>Pago seguro y protegido</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}