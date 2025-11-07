import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Star, ShoppingBag, Music, Settings } from "lucide-react"

export function UserProfile() {
  return (
    <Card className="p-6 mb-8 bg-card/80 backdrop-blur-sm border-border">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center pulse-glow">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-accent rounded-full p-2">
            <Star className="w-4 h-4 text-accent-foreground" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-foreground">Usuario Demo</h2>
            <div className="flex gap-2">
              <Badge className="bg-secondary text-secondary-foreground border border-border">
                <ShoppingBag className="w-3 h-3 mr-1" />
                Comprador
              </Badge>
              <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground pulse-glow">
                <Star className="w-3 h-3 mr-1" />
                Explorer
              </Badge>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">
            Apasionado por la música de videojuegos | Coleccionista de soundtracks épicos
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Compras:</span>
              <span className="font-semibold text-foreground">24</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Puntos:</span>
              <span className="font-semibold text-foreground">1,250</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-secondary-foreground" />
              <span className="text-muted-foreground">Miembro desde:</span>
              <span className="font-semibold text-foreground">Enero 2025</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          <Button className="bg-primary hover:bg-primary/90">Editar Perfil</Button>
        </div>
      </div>
    </Card>
  )
}
