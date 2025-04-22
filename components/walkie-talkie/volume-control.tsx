"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VolumeControlProps {
  volume: number
  isMuted: boolean
  onVolumeChange: (value: number) => void
  onToggleMute: () => void
}

export function VolumeControl({ volume, isMuted, onVolumeChange, onToggleMute }: VolumeControlProps) {
  return (
    <div className="mt-12 w-full max-w-md">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onToggleMute} className={isMuted ? "text-rose-500" : ""}>
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Slider
          value={[volume]}
          max={100}
          step={1}
          className="flex-1"
          onValueChange={(value) => onVolumeChange(value[0])}
          disabled={isMuted}
        />
        <span className="text-sm font-medium w-8">{volume}%</span>
      </div>
    </div>
  )
}
