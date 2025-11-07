"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, ListMusic } from "lucide-react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState([30])

  const currentTrack = {
    title: "Cyberpunk City Nights",
    artist: "NeonBeats",
    duration: "3:45",
    currentTime: "1:23",
    image: "/cyberpunk-music-cover.png",
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Progress Bar */}
        <div className="mb-3">
          <Slider value={progress} onValueChange={setProgress} max={100} step={1} className="cursor-pointer" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{currentTrack.currentTime}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img
              src={currentTrack.image || "/placeholder.svg"}
              alt={currentTrack.title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-foreground truncate">{currentTrack.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-secondary">
              <Shuffle className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 pulse-glow"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </Button>

            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <SkipForward className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-secondary">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          {/* Volume & Queue */}
          <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
            <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="hover:bg-secondary">
              {isMuted || volume[0] === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-24 cursor-pointer"
            />

            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <ListMusic className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
