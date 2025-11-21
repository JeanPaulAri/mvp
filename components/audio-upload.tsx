'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Upload, Music, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react'

interface AudioType {
  id: number
  name: string
  icon?: string
  description: string
}

export function AudioUpload() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [audioTypes, setAudioTypes] = useState<AudioType[]>([])
  const [user, setUser] = useState<any>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [audioPreview, setAudioPreview] = useState<string>('')
  const [coverPreview, setCoverPreview] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    audioTypeId: '',
    price: '0',
    duration: '',
  })
  const [uploadedAudio, setUploadedAudio] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      
      // Verificar que sea vendedor
      if (!userData.userType || userData.userType.name !== 'vendor') {
        toast({
          title: 'Error',
          description: 'Solo los vendedores pueden subir audios',
          variant: 'destructive',
        })
        return
      }
    }
    
    fetchAudioTypes()
  }, [])

  const fetchAudioTypes = async () => {
    try {
      const query = `
        query {
          audioTypes {
            id
            name
            icon
            description
          }
        }
      `

      const response = await fetch('http://127.0.0.1:8000/graphql/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      if (data.data?.audioTypes) {
        setAudioTypes(data.data.audioTypes)
      }
    } catch (error) {
      console.error('Error fetching audio types:', error)
    }
  }

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      
      // Crear preview URL
      const url = URL.createObjectURL(file)
      setAudioPreview(url)
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImage(file)
      
      // Crear preview URL
      const url = URL.createObjectURL(file)
      setCoverPreview(url)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      audioTypeId: value,
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'El título es requerido',
        variant: 'destructive',
      })
      return false
    }

    if (!audioFile) {
      toast({
        title: 'Error',
        description: 'Debes seleccionar un archivo de audio',
        variant: 'destructive',
      })
      return false
    }

    if (!formData.audioTypeId) {
      toast({
        title: 'Error',
        description: 'Debes seleccionar un tipo de audio',
        variant: 'destructive',
      })
      return false
    }

    const validExtensions = ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac']
    const fileExt = audioFile.name.split('.').pop()?.toLowerCase()
    if (!fileExt || !validExtensions.includes(fileExt)) {
      toast({
        title: 'Error',
        description: `Formato no válido. Soportados: ${validExtensions.join(', ')}`,
        variant: 'destructive',
      })
      return false
    }

    return true
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: 'Error',
        description: 'Usuario no identificado',
        variant: 'destructive',
      })
      return
    }

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('vendor_id', user.id)
      formDataObj.append('title', formData.title)
      formDataObj.append('description', formData.description)
      formDataObj.append('audio_type_id', formData.audioTypeId)
      formDataObj.append('price', formData.price || '0')
      if (formData.duration) {
        formDataObj.append('duration', formData.duration)
      }
      if (audioFile) {
        formDataObj.append('audio_file', audioFile)
      }
      if (coverImage) {
        formDataObj.append('cover_image', coverImage)
      }

      const response = await fetch('http://127.0.0.1:8000/api/upload-audio/', {
        method: 'POST',
        body: formDataObj,
      })

      const data = await response.json()

      if (data.success) {
        setUploadedAudio(data.audio)
        toast({
          title: 'Éxito',
          description: 'Audio cargado correctamente',
        })

        // Limpiar formulario
        setFormData({
          title: '',
          description: '',
          audioTypeId: '',
          price: '0',
          duration: '',
        })
        setAudioFile(null)
        setCoverImage(null)
        setAudioPreview('')
        setCoverPreview('')

        // Limpiar estado del audio subido después de 5 segundos
        setTimeout(() => setUploadedAudio(null), 5000)
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Error al cargar el audio',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: 'Ocurrió un error al cargar el audio',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user || !user.userType || user.userType.name !== 'vendor') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Subir Audio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-amber-600">
            <AlertCircle className="w-5 h-5" />
            <p>Solo los vendedores pueden subir audios. Cambia tu tipo de cuenta en el perfil.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="bg-card/80 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Subir Audio
          </CardTitle>
          <CardDescription>
            Comparte tus assets musicales con la comunidad
          </CardDescription>
        </CardHeader>

        <CardContent>
          {uploadedAudio ? (
            <div className="space-y-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 dark:text-green-100">
                    ¡Audio cargado correctamente!
                  </h3>
                  <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                    {uploadedAudio.title}
                  </p>
                  {uploadedAudio.audioFile && (
                    <div className="mt-2">
                      <audio 
                        controls 
                        className="w-full h-8"
                        src={uploadedAudio.audioFile}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpload} className="space-y-6">
              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Título del Audio *
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="ej. Galactic Battle Theme"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-background/50 border-border"
                />
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe tu audio..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-background/50 border-border"
                />
              </div>

              {/* Tipo de Audio */}
              <div className="space-y-2">
                <Label htmlFor="audioType" className="text-sm font-medium">
                  Tipo de Audio *
                </Label>
                <Select value={formData.audioTypeId} onValueChange={handleSelectChange}>
                  <SelectTrigger className="bg-background/50 border-border">
                    <SelectValue placeholder="Selecciona un tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    {audioTypes.map(type => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          <span>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Archivo de Audio */}
              <div className="space-y-2">
                <Label htmlFor="audioFile" className="text-sm font-medium">
                  Archivo de Audio * (MP3, WAV, OGG, FLAC, M4A, AAC)
                </Label>
                <div className="relative">
                  <input
                    id="audioFile"
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="audioFile"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Music className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {audioFile ? audioFile.name : 'Haz clic o arrastra un archivo de audio'}
                      </p>
                    </div>
                  </label>
                </div>
                {audioPreview && (
                  <div className="mt-2">
                    <audio controls className="w-full h-8" src={audioPreview} />
                  </div>
                )}
              </div>

              {/* Imagen de Portada */}
              <div className="space-y-2">
                <Label htmlFor="coverImage" className="text-sm font-medium">
                  Imagen de Portada (Opcional)
                </Label>
                <div className="relative">
                  <input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="coverImage"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {coverImage ? coverImage.name : 'Haz clic para subir una imagen'}
                      </p>
                    </div>
                  </label>
                </div>
                {coverPreview && (
                  <div className="mt-2">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Precio y Duración */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    Precio (USD)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm font-medium">
                    Duración (segundos)
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    placeholder="ej. 180"
                    min="0"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Cargando...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Audio
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
