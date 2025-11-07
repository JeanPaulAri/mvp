import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Play, Package } from "lucide-react"

export function RecentPurchases() {
  const recentPurchase = {
    id: 1,
    title: "Epic Battle SFX Pack",
    type: "SFX",
    date: "Hace 2 días",
    price: "$29.99",
    items: 150,
    image: "/sound-effects-pack-icon.jpg",
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-foreground">Últimas Compras</h3>
        <Button variant="ghost" className="text-primary hover:text-primary/80">
          Ver todas
        </Button>
      </div>

      <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center">
            <Package className="w-16 h-16 text-primary pulse-glow" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Badge className="mb-2 bg-accent/20 text-accent border border-accent/50">{recentPurchase.type}</Badge>
                <h4 className="text-xl font-bold text-foreground mb-1">{recentPurchase.title}</h4>
                <p className="text-sm text-muted-foreground">{recentPurchase.items} archivos de audio incluidos</p>
              </div>
              <span className="text-2xl font-bold text-primary">{recentPurchase.price}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">Comprado {recentPurchase.date}</p>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
              <Button variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Vista Previa
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
