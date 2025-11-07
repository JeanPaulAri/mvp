import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"

export function MembershipSelector() {
  const plans = [
    {
      name: "Explorer",
      icon: Star,
      price: "Gratis",
      period: "",
      description: "Perfecto para comenzar tu aventura musical",
      features: ["5 descargas por mes", "Calidad estándar (MP3)", "Acceso a biblioteca básica", "Soporte por email"],
      popular: false,
      buttonText: "Comenzar Gratis",
      buttonVariant: "outline" as const,
    },
    {
      name: "Creator",
      icon: Zap,
      price: "$19",
      period: "/mes",
      description: "Para desarrolladores indie y creadores de contenido",
      features: [
        "50 descargas por mes",
        "Calidad premium (WAV/FLAC)",
        "Acceso completo a la biblioteca",
        "Licencias comerciales incluidas",
        "Soporte prioritario",
        "Herramientas de edición básicas",
      ],
      popular: true,
      buttonText: "Elegir Creator",
      buttonVariant: "default" as const,
    },
    {
      name: "Studio",
      icon: Crown,
      price: "$49",
      period: "/mes",
      description: "Para estudios profesionales y equipos grandes",
      features: [
        "Descargas ilimitadas",
        "Calidad master (WAV/FLAC)",
        "Acceso exclusivo a contenido premium",
        "Licencias comerciales extendidas",
        "Soporte 24/7",
        "Herramientas de edición avanzadas",
        "API para integración",
        "Colaboración en equipo",
      ],
      popular: false,
      buttonText: "Elegir Studio",
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <section id="membership" className="space-y-8 scroll-mt-20">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">
          Elige tu{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Membresía Espacial
          </span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
          Desbloquea el poder de la música para videojuegos con nuestros planes diseñados para cada tipo de creador.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const IconComponent = plan.icon
          return (
            <Card
              key={plan.name}
              className={`relative bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 ${
                plan.popular ? "ring-2 ring-primary/50 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">Más Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    plan.popular ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">{plan.description}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className={`w-full ${plan.popular ? "pulse-glow" : ""}`} variant={plan.buttonVariant} size="lg">
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          ¿Necesitas algo personalizado?{" "}
          <Button variant="link" className="p-0 h-auto text-primary">
            Contáctanos para planes empresariales
          </Button>
        </p>
      </div>
    </section>
  )
}
