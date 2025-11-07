import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Music2, Volume2 } from "lucide-react"

export function UserCatalog() {
  const catalogItems = [
    {
      id: 1,
      title: "Cyberpunk City Nights",
      artist: "NeonBeats",
      type: "BGM",
      duration: "3:45",
      genre: "Electronic",
      image: "/cyberpunk-music-cover.png",
    },
    {
      id: 2,
      title: "Fantasy Forest Theme",
      artist: "MysticSounds",
      type: "Music",
      duration: "4:20",
      genre: "Orchestral",
      image: "/fantasy-forest-music.jpg",
    },
    {
      id: 3,
      title: "Space Ambient Loop",
      artist: "CosmicAudio",
      type: "BGM",
      duration: "2:30",
      genre: "Ambient",
      image: "/space-ambient-music.jpg",
    },
    {
      id: 4,
      title: "Boss Battle Theme",
      artist: "EpicGameMusic",
      type: "Music",
      duration: "5:15",
      genre: "Orchestral",
      image: "/epic-boss-battle-music.jpg",
    },
    {
      id: 5,
      title: "Retro Arcade BGM",
      artist: "8BitMaster",
      type: "BGM",
      duration: "3:00",
      genre: "Chiptune",
      image: "/retro-arcade-game-music.jpg",
    },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-foreground">Mi Catálogo</h3>
        <Button variant="ghost" className="text-primary hover:text-primary/80">
          Ver todo ({catalogItems.length})
        </Button>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary/20">
          {catalogItems.map((item) => (
            <Card
              key={item.id}
              className="flex-shrink-0 w-64 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="icon" className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 pulse-glow">
                    <Play className="w-8 h-8 ml-1" />
                  </Button>
                </div>
                <Badge className="absolute top-3 right-3 bg-accent/90 text-accent-foreground">{item.type}</Badge>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-foreground mb-1 truncate">{item.title}</h4>
                <p className="text-sm text-muted-foreground mb-2 truncate">{item.artist}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Music2 className="w-3 h-3" />
                    {item.genre}
                  </span>
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    {item.duration}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
