"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Music } from "lucide-react"
import { useRouter } from "next/navigation"

export function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [currentWelcome, setCurrentWelcome] = useState(0)

  // Mensajes de bienvenida en diferentes idiomas
  const welcomeMessages = [
    { text: "Bienvenido", language: "Español", color: "from-blue-400 to-blue-600" },
    { text: "Sum sartañani", language: "Aymara", color: "from-orange-400 to-red-500" },
    { text: "Allinllachu", language: "Quechua", color: "from-green-400 to-emerald-600" },
    { text: "Welcome", language: "English", color: "from-purple-400 to-violet-600" },
  ]

  // Cambiar idioma cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWelcome((prev) => (prev + 1) % welcomeMessages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleLogin = () => {
    // Por ahora, simplemente redirige a la página principal
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen starfield flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo y Bienvenida Animada */}
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl logo-glow">
              <Music className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Título */}
          <div className="welcome-fade-in">
            <h1 className="font-rubik-80s-fade text-4xl bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent neon-text">
              Taki-Kapchiy
            </h1>
            <p className="text-muted-foreground mt-2">
              La plataforma galáctica de assets musicales
            </p>
          </div>

          {/* Bienvenida Animada */}
          <div className="space-y-4">
            {/* Contenedor del texto principal */}
            <div className="h-20 flex items-center justify-center">
              <h2 
                className={`text-6xl font-bold bg-gradient-to-r ${welcomeMessages[currentWelcome].color} bg-clip-text text-transparent transition-all duration-500 animate-pulse`}
                key={currentWelcome}
              >
                {welcomeMessages[currentWelcome].text}
              </h2>
            </div>
            
            {/* Indicador de idioma - completamente separado */}
            <div className="flex justify-center">
              <span className="text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded-full border border-border/50 backdrop-blur-sm">
                {welcomeMessages[currentWelcome].language}
              </span>
            </div>
          </div>
        </div>

        {/* Formulario de Login */}
        <Card className="bg-card/60 backdrop-blur-sm border-border shadow-2xl login-card-slide">
          <CardHeader className="text-center pb-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Iniciar Sesión
            </h3>
            <p className="text-muted-foreground">
              Accede a tu cuenta para explorar la galaxia musical
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="bg-background/50 border-border focus:border-primary transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-background/50 border-border focus:border-primary transition-colors pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-border focus:ring-primary"
                />
                <Label htmlFor="remember" className="text-muted-foreground">
                  Recordarme
                </Label>
              </div>
              <Button variant="link" className="text-primary p-0 h-auto">
                ¿Olvidaste tu contraseña?
              </Button>
            </div>

            {/* Login Button */}
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Iniciar Sesión
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  o continúa con
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="bg-background/50 border-border hover:bg-secondary/50"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button 
                variant="outline"
                className="bg-background/50 border-border hover:bg-secondary/50"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd"/>
                </svg>
                Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-muted-foreground text-sm">
                ¿No tienes una cuenta?{" "}
              </span>
              <Button variant="link" className="text-primary p-0 h-auto text-sm">
                Regístrate aquí
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground space-y-2">
          <p>Al iniciar sesión, aceptas nuestros términos de servicio</p>
          <div className="flex justify-center space-x-4">
            <Button variant="link" className="text-muted-foreground p-0 h-auto text-xs">
              Términos
            </Button>
            <Button variant="link" className="text-muted-foreground p-0 h-auto text-xs">
              Privacidad
            </Button>
            <Button variant="link" className="text-muted-foreground p-0 h-auto text-xs">
              Soporte
            </Button>
          </div>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full animate-pulse float-slow" />
      <div className="absolute bottom-32 right-16 w-6 h-6 bg-accent/40 rounded-full animate-bounce" />
      <div className="absolute top-1/3 right-10 w-3 h-3 bg-primary/50 rounded-full animate-ping" />
      <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-accent/30 rounded-full float-slow" />
    </div>
  )
}