import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Volume2, Headphones, Disc3, Package, Play, Download, Star, Filter, Search, ShoppingCart, CheckCircle2, Plus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

export function Store() {
  const { addItem, isItemInCart } = useCart()
  const [animatingItems, setAnimatingItems] = useState<Set<number>>(new Set())

  const handleAddToCart = (track: any) => {
    // Solo agregar si no está ya en el carrito
    if (!isItemInCart(track.id)) {
      // Agregar animación
      setAnimatingItems(prev => new Set(prev).add(track.id))
      
      // Agregar al carrito
      addItem({
        id: track.id,
        title: track.title,
        artist: track.artist,
        type: track.type,
        price: track.price,
        image: track.image,
      })
      
      // Quitar animación después de un tiempo
      setTimeout(() => {
        setAnimatingItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(track.id)
          return newSet
        })
      }, 600)
    }
  }
  const categories = [
    { id: "bgm", name: "BGM", icon: Music, count: "12.5K" },
    { id: "sfx", name: "SFX", icon: Volume2, count: "8.2K" },
    { id: "music", name: "Música", icon: Headphones, count: "15.1K" },
    { id: "ost", name: "OST", icon: Disc3, count: "6.8K" },
    { id: "compilations", name: "Compilaciones", icon: Package, count: "2.1K" },
  ]

  const genres = [
    "Electronic",
    "Orchestral",
    "Ambient",
    "Rock",
    "Jazz",
    "Cinematic",
    "Chiptune",
    "Synthwave",
    "Classical",
    "Hip-Hop",
  ]

  const featuredTracks = [
    {
      id: 1,
      title: "Galactic Warfare",
      artist: "CosmicBeats",
      genre: "Electronic",
      type: "BGM",
      price: "$18",
      rating: 4.9,
      plays: "25.3K",
      image: "/space-battle-music.jpg",
      tags: ["Epic", "Battle", "Sci-Fi"],
    },
    {
      id: 2,
      title: "Mystical Forest Pack",
      artist: "NatureSound",
      genre: "Ambient",
      type: "SFX",
      price: "$12",
      rating: 4.8,
      plays: "18.7K",
      image: "/forest-sounds-pack.jpg",
      tags: ["Nature", "Peaceful", "Fantasy"],
    },
    {
      id: 3,
      title: "Retro Arcade Suite",
      artist: "PixelTunes",
      genre: "Chiptune",
      type: "OST",
      price: "$22",
      rating: 4.7,
      plays: "31.2K",
      image: "/retro-arcade-music.jpg",
      tags: ["Retro", "8-bit", "Nostalgic"],
    },
    {
      id: 4,
      title: "Horror Atmosphere",
      artist: "DarkAudio",
      genre: "Cinematic",
      type: "BGM",
      price: "$15",
      rating: 4.6,
      plays: "12.9K",
      image: "/horror-game-music.jpg",
      tags: ["Dark", "Scary", "Tension"],
    },
    {
      id: 5,
      title: "Victory Fanfares",
      artist: "EpicOrchestra",
      genre: "Orchestral",
      type: "Music",
      price: "$20",
      rating: 4.9,
      plays: "22.1K",
      image: "/victory-orchestral-music.jpg",
      tags: ["Epic", "Triumph", "Orchestral"],
    },
    {
      id: 6,
      title: "Cyberpunk Collection",
      artist: "NeonWave",
      genre: "Synthwave",
      type: "Compilations",
      price: "$35",
      rating: 4.8,
      plays: "19.5K",
      image: "/cyberpunk-music-collection.jpg",
      tags: ["Futuristic", "Neon", "Collection"],
    },
  ]

  return (
    <section id="store" className="space-y-8 scroll-mt-20">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">
          Explora la{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Galaxia Musical</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
          Descubre miles de tracks organizados por géneros y tipos de assets musicales.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Card
              key={category.id}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} tracks</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters and Search */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por título, artista o etiquetas..."
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <select className="px-3 py-2 bg-secondary border border-border rounded-md text-sm">
                <option>Todos los géneros</option>
                {genres.map((genre) => (
                  <option key={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Tracks */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-secondary/50">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="bgm">BGM</TabsTrigger>
          <TabsTrigger value="sfx">SFX</TabsTrigger>
          <TabsTrigger value="music">Música</TabsTrigger>
          <TabsTrigger value="ost">OST</TabsTrigger>
          <TabsTrigger value="compilations">Packs</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTracks.map((track) => (
              <Card
                key={track.id}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={track.image || "/placeholder.svg"}
                    alt={track.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="sm" className="bg-primary/90 hover:bg-primary">
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">{track.type}</Badge>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {track.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {track.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {track.plays}
                      </div>
                    </div>
                    <p className="font-semibold text-primary text-lg">{track.price}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Play className="w-3 h-3 mr-1" />
                      Play
                    </Button>
                    <Button 
                      size="sm" 
                      className={`relative overflow-hidden transition-all duration-300 ${
                        isItemInCart(track.id) 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "bg-primary hover:bg-primary/90 hover:scale-105"
                      } ${
                        animatingItems.has(track.id) 
                          ? "animate-pulse scale-110" 
                          : ""
                      }`}
                      onClick={() => handleAddToCart(track)}
                      disabled={animatingItems.has(track.id) || isItemInCart(track.id)}
                    >
                      <div className={`flex items-center transition-all duration-300 ${
                        isItemInCart(track.id) ? "transform translate-y-0" : ""
                      }`}>
                        {isItemInCart(track.id) ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Agregado
                          </>
                        ) : (
                          <>
                            <ShoppingCart className={`w-3 h-3 mr-1 transition-transform duration-300 ${
                              animatingItems.has(track.id) ? "rotate-12 scale-125" : ""
                            }`} />
                            Agregar
                          </>
                        )}
                      </div>
                      
                      {/* Efecto de ondas al hacer click */}
                      {animatingItems.has(track.id) && (
                        <div className="absolute inset-0 bg-white/20 rounded-md animate-ping" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Cargar Más Tracks
            </Button>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar but filtered */}
        <TabsContent value="bgm">
          <p className="text-center text-muted-foreground py-8">Contenido filtrado para BGM aparecería aquí...</p>
        </TabsContent>

        <TabsContent value="sfx">
          <p className="text-center text-muted-foreground py-8">Contenido filtrado para SFX aparecería aquí...</p>
        </TabsContent>
      </Tabs>
    </section>
  )
}
