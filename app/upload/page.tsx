import { AudioUpload } from "@/components/audio-upload"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sube tus Audios
          </h1>
          <p className="text-muted-foreground">
            Comparte tus assets musicales con la comunidad y gana dinero
          </p>
        </div>
        
        <AudioUpload />
      </div>
    </div>
  )
}
