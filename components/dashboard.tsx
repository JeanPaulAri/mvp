"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Star, Download, ShoppingCart, TrendingUp, Rocket, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useCart } from "@/contexts/cart-context"

export function Dashboard() {
  const { addItem, isItemInCart } = useCart()
  const [animatingItems, setAnimatingItems] = useState<Set<number>>(new Set())
  const [shootingStars, setShootingStars] = useState<Array<{ id: number; left: string; top: string; delay: number }>>(
    [],
  )

  /* Generar estrellas fugaces al montar el componente */
  useEffect(() => {
    const generateShootingStars = () => {
      const stars = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: Math.random() * 100 + "%",
        top: Math.random() * 50 + "%",
        delay: Math.random() * 3,
      }))
      setShootingStars(stars)
    }

    generateShootingStars()
    const interval = setInterval(generateShootingStars, 4000)
    return () => clearInterval(interval)
  }, [])

  const galacticTop5 = [
    {
      rank: 1,
      title: "Cosmic Battle Anthem",
      artist: "StarForge Studios",
      type: "BGM",
      stars: 5.0,
      downloads: 25400,
      price: "$24.99",
      image: "/cyberpunk-music-cover.png",
    },
    {
      rank: 2,
      title: "Nebula Dreams OST",
      artist: "VoidComposer",
      type: "OST",
      stars: 4.9,
      downloads: 18200,
      price: "$19.99",
      image: "/fantasy-forest-music.jpg",
    },
    {
      rank: 3,
      title: "Laser Arsenal SFX Pack",
      artist: "SpaceEffects Pro",
      type: "SFX",
      stars: 4.8,
      downloads: 32100,
      price: "$15.99",
      image: "/laser-sound-effects.jpg",
    },
    {
      rank: 4,
      title: "Galactic Exploration Suite",
      artist: "OrbitSounds",
      type: "Compilación",
      stars: 4.9,
      downloads: 14800,
      price: "$29.99",
      image: "/space-ambient-music.jpg",
    },
    {
      rank: 5,
      title: "Epic Boss Battle Theme",
      artist: "ThunderAudio",
      type: "Música",
      stars: 4.7,
      downloads: 21500,
      price: "$12.99",
      image: "/epic-boss-battle-music.jpg",
    },
  ]

  const barChartData = [
    { name: "BGM", descargas: 45000 },
    { name: "SFX", descargas: 62000 },
    { name: "OST", descargas: 38000 },
    { name: "Música", descargas: 51000 },
    { name: "Compilaciones", descargas: 28000 },
  ]

  const barColors = [
    "oklch(0.65 0.25 280)", // Púrpura primario
    "oklch(0.60 0.24 290)", // Púrpura azulado
    "oklch(0.70 0.22 270)", // Púrpura magenta
    "oklch(0.55 0.26 300)", // Cian/Azul
    "oklch(0.75 0.20 260)", // Púrpura claro
  ]

  const pieChartData = [
    { name: "BGM", value: 45000, color: "oklch(0.65 0.25 280)" },
    { name: "SFX", value: 62000, color: "oklch(0.60 0.24 290)" },
    { name: "OST", value: 38000, color: "oklch(0.70 0.22 270)" },
    { name: "Música", value: 51000, color: "oklch(0.55 0.26 300)" },
    { name: "Compilaciones", value: 28000, color: "oklch(0.75 0.20 260)" },
  ]

  const officialRanking = [
    {
      position: 1,
      name: "Cosmic Battle Anthem",
      image: "/cyberpunk-music-cover.png",
      type: "BGM",
      stars: 5.0,
      downloads: 25400,
      price: "$24.99",
    },
    {
      position: 2,
      name: "Nebula Dreams OST",
      image: "/fantasy-forest-music.jpg",
      type: "OST",
      stars: 4.9,
      downloads: 18200,
      price: "$19.99",
    },
    {
      position: 3,
      name: "Laser Arsenal SFX Pack",
      image: "/laser-sound-effects.jpg",
      type: "SFX",
      stars: 4.8,
      downloads: 32100,
      price: "$15.99",
    },
    {
      position: 4,
      name: "Galactic Exploration Suite",
      image: "/space-ambient-music.jpg",
      type: "Compilación",
      stars: 4.9,
      downloads: 14800,
      price: "$29.99",
    },
    {
      position: 5,
      name: "Epic Boss Battle Theme",
      image: "/epic-boss-battle-music.jpg",
      type: "Música",
      stars: 4.7,
      downloads: 21500,
      price: "$12.99",
    },
    {
      position: 6,
      name: "Retro Arcade Collection",
      image: "/retro-arcade-game-music.jpg",
      type: "Compilación",
      stars: 4.6,
      downloads: 16300,
      price: "$22.99",
    },
    {
      position: 7,
      name: "Alien Ambience Pack",
      image: "/alien-ambience.jpg",
      type: "SFX",
      stars: 4.8,
      downloads: 19700,
      price: "$13.99",
    },
    {
      position: 8,
      name: "Victory Fanfare Suite",
      image: "/victory-fanfare.jpg",
      type: "Música",
      stars: 4.5,
      downloads: 12400,
      price: "$9.99",
    },
  ]

  const upcomingReleases = [
    {
      title: "Cyberpunk 2099 OST",
      image: "/cyberpunk-2099-soundtrack.jpg",
      releaseDate: "15 Dic 2024",
    },
    {
      title: "Medieval Fantasy Pack",
      image: "/medieval-fantasy-music.jpg",
      releaseDate: "20 Dic 2024",
    },
    {
      title: "Sci-Fi UI Sounds",
      image: "/scifi-ui-sounds.jpg",
      releaseDate: "28 Dic 2024",
    },
    {
      title: "Horror Atmosphere Bundle",
      image: "/horror-atmosphere.jpg",
      releaseDate: "5 Ene 2025",
    },
  ]

  // Función para manejar agregar al carrito
  const handleAddToCart = (item: any) => {
    // Solo agregar si no está ya en el carrito
    if (!isItemInCart(item.position)) {
      // Agregar animación
      setAnimatingItems(prev => new Set(prev).add(item.position))
      
      // Agregar al carrito
      addItem({
        id: item.position, // Usamos la posición como ID único
        title: item.name,
        artist: "Oficial", // Podríamos agregar artista a los datos si es necesario
        type: item.type,
        price: item.price,
        image: item.image || "/placeholder.svg",
      })
      
      // Quitar animación después de un tiempo
      setTimeout(() => {
        setAnimatingItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(item.position)
          return newSet
        })
      }, 600)
    }
  }

  return (
    <section id="trending" className="space-y-12 relative z-10 scroll-mt-20">
      <div className="shooting-stars-layer absolute inset-0 -z-10">
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="shooting-star"
            style={{
              left: star.left,
              top: star.top,
              animation: `shooting-star 3s ease-in-out ${star.delay}s forwards`,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Trophy className="w-10 h-10 text-yellow-400" />
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Galácticos del Mes
          </h2>
          <Trophy className="w-10 h-10 text-yellow-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {galacticTop5.map((item) => (
            <Card
              key={item.rank}
              className={`bg-card/60 backdrop-blur-sm border-2 hover:border-primary transition-all hover:scale-105 ${
                item.rank === 1 ? "border-yellow-400 shadow-lg shadow-yellow-400/20" : "border-border"
              }`}
            >
              <CardContent className="p-4 space-y-3">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-lg z-10">
                    {item.rank}
                  </div>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{item.artist}</p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="secondary">{item.type}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{item.stars}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Rocket className="w-8 h-8 text-accent" />
            <h2 className="text-4xl font-bold text-foreground">Los Esenciales para el Despegue</h2>
          </div>
          <p className="text-muted-foreground">Análisis de tendencias y categorías más populares</p>
        </div>

        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="bar">Gráfica de Barras</TabsTrigger>
            <TabsTrigger value="pie">Gráfica Circular</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="mt-6">
            <Card className="bg-card/60 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 30, bottom: 60 }} layout="vertical">
                    <CartesianGrid strokeDasharray="0" stroke="oklch(0.15 0.02 280)" horizontal={false} />
                    <XAxis type="number" stroke="oklch(0.65 0.02 280)" style={{ fontSize: "12px" }} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="oklch(0.65 0.02 280)"
                      style={{ fontSize: "12px" }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.08 0.03 280)",
                        border: "1px solid oklch(0.55 0.26 300)",
                        borderRadius: "8px",
                        boxShadow: "0 0 20px oklch(0.55 0.26 300 / 0.3)",
                      }}
                      cursor={false}
                    />
                    {barChartData.map((item, index) => (
                      <Bar
                        key={item.name}
                        dataKey="descargas"
                        fill={barColors[index]}
                        radius={[0, 8, 8, 0]}
                        isAnimationActive={false}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pie" className="mt-6">
            <Card className="bg-card/60 backdrop-blur-sm border-border">
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) => `${props.name}: ${(props.percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.08 0.03 280)",
                        border: "1px solid oklch(0.55 0.26 300)",
                        borderRadius: "8px",
                      }}
                      cursor={false}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ranking Oficial
          </h2>
          <p className="text-muted-foreground mt-2">Los assets más descargados y mejor valorados</p>
        </div>

        <Card className="bg-card/60 backdrop-blur-sm border-border">
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-16 text-center">#</TableHead>
                  <TableHead>Nombre del Asset</TableHead>
                  <TableHead className="text-center">Tipo</TableHead>
                  <TableHead className="text-center">Estrellas</TableHead>
                  <TableHead className="text-center">Descargas</TableHead>
                  <TableHead className="text-center">Precio</TableHead>
                  <TableHead className="text-center">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {officialRanking.map((item) => (
                  <TableRow key={item.position} className="border-border hover:bg-secondary/30">
                    <TableCell className="text-center font-bold text-primary">{item.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{item.type}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{item.stars}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Download className="w-4 h-4 text-muted-foreground" />
                        <span>{item.downloads.toLocaleString('es-ES')}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-primary">{item.price}</TableCell>
                    <TableCell className="text-center">
                      <Button 
                        size="sm" 
                        className={`relative overflow-hidden transition-all duration-300 ${
                          isItemInCart(item.position) 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "bg-primary hover:bg-primary/90 hover:scale-105"
                        } ${
                          animatingItems.has(item.position) 
                            ? "animate-pulse scale-110" 
                            : ""
                        }`}
                        onClick={() => handleAddToCart(item)}
                        disabled={animatingItems.has(item.position) || isItemInCart(item.position)}
                      >
                        <div className={`flex items-center transition-all duration-300 ${
                          isItemInCart(item.position) ? "transform translate-y-0" : ""
                        }`}>
                          {isItemInCart(item.position) ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Agregado
                            </>
                          ) : (
                            <>
                              <ShoppingCart className={`w-3 h-3 mr-1 transition-transform duration-300 ${
                                animatingItems.has(item.position) ? "rotate-12 scale-125" : ""
                              }`} />
                              Comprar
                            </>
                          )}
                        </div>
                        
                        {/* Efecto de ondas al hacer click */}
                        {animatingItems.has(item.position) && (
                          <div className="absolute inset-0 bg-white/20 rounded-md animate-ping" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-foreground">Próximos Estrenos</h2>
          <p className="text-xl text-accent font-semibold">Lo que se viene</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingReleases.map((release, index) => (
            <Card
              key={index}
              className="bg-card/60 backdrop-blur-sm border-border hover:border-accent transition-all hover:scale-105 group"
            >
              <CardContent className="p-4 space-y-3">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={release.image || "/placeholder.svg"}
                    alt={release.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Próximamente
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{release.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    {release.releaseDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
