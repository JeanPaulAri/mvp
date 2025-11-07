"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Zap, Crown, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SubscriptionPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "Gratis para siempre",
      description: "Perfecto para empezar tu journey musical",
      features: [
        "5 descargas por mes",
        "Acceso a biblioteca básica",
        "Calidad estándar (128kbps)",
        "Soporte por email",
      ],
      current: false,
      popular: false,
      color: "from-gray-400 to-gray-600"
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "por mes",
      description: "Para creadores de contenido serios",
      features: [
        "50 descargas por mes",
        "Acceso completo a la biblioteca",
        "Calidad alta (320kbps)",
        "Licencias comerciales incluidas",
        "Soporte prioritario",
        "Sin marca de agua",
      ],
      current: true,
      popular: true,
      color: "from-primary to-accent"
    },
    {
      name: "Studio",
      price: "$24.99",
      period: "por mes",
      description: "Para estudios y empresas",
      features: [
        "Descargas ilimitadas",
        "Acceso a contenido exclusivo",
        "Calidad master (FLAC)",
        "Licencias extendidas",
        "Soporte 24/7",
        "API access",
        "Colaboración en equipo",
        "Analytics avanzados",
      ],
      current: false,
      popular: false,
      color: "from-amber-400 to-orange-600"
    },
  ]

  return (
    <div className="min-h-screen bg-background starfield">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-20 max-w-6xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </Button>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold font-rubik-80s-fade bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Planes de Suscripción
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Elige el plan perfecto para impulsar tu creatividad musical
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                plan.current ? "ring-2 ring-primary shadow-lg shadow-primary/25" : ""
              } ${
                plan.popular ? "border-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-gradient-to-r from-primary to-accent rounded-none rounded-bl-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Más Popular
                  </Badge>
                </div>
              )}
              
              {plan.current && (
                <div className="absolute top-0 left-0">
                  <Badge variant="secondary" className="rounded-none rounded-br-lg">
                    Plan Actual
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                  {plan.name === "Free" && <Zap className="w-8 h-8 text-white" />}
                  {plan.name === "Pro" && <Star className="w-8 h-8 text-white" />}
                  {plan.name === "Studio" && <Crown className="w-8 h-8 text-white" />}
                </div>
                
                <div>
                  <CardTitle className="text-2xl font-rubik-80s-fade">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                {plan.current ? (
                  <Button variant="outline" className="w-full" disabled>
                    Plan Actual
                  </Button>
                ) : (
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" 
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Free" ? "Cambiar a Free" : `Actualizar a ${plan.name}`}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">¿Necesitas algo personalizado?</h2>
          <p className="text-muted-foreground">
            Contáctanos para planes empresariales y soluciones a medida
          </p>
          <Button variant="outline" size="lg">
            Contactar Ventas
          </Button>
        </div>
      </main>
    </div>
  )
}