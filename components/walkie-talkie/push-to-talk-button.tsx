"use client"

import { useRef, useEffect } from "react"
import { Mic } from "lucide-react"

interface PushToTalkButtonProps {
  isTransmitting: boolean
  onPushToTalk: (isPressed: boolean) => void
}

export function PushToTalkButton({ isTransmitting, onPushToTalk }: PushToTalkButtonProps) {
  const waveformRef = useRef<HTMLDivElement>(null)

  // Animation effect for waveform when transmitting
  useEffect(() => {
    if (isTransmitting && waveformRef.current) {
      const bars = waveformRef.current.querySelectorAll(".waveform-bar")
      bars.forEach((bar) => {
        const height = Math.random() * 100
        ;(bar as HTMLElement).style.height = `${height}%`
      })

      const interval = setInterval(() => {
        bars.forEach((bar) => {
          const height = Math.random() * 100
          ;(bar as HTMLElement).style.height = `${height}%`
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isTransmitting])

  return (
    <div className="relative">
      {/* Waveform visualization */}
      <div
        className={`absolute -top-32 left-1/2 transform -translate-x-1/2 w-64 h-24 flex items-end justify-center gap-1 ${
          isTransmitting ? "opacity-100" : "opacity-0"
        } transition-opacity`}
        ref={waveformRef}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="waveform-bar w-1 bg-emerald-500 rounded-t-sm transition-all duration-100"
            style={{ height: "0%" }}
          ></div>
        ))}
      </div>

      {/* Push-to-Talk Button */}
      <button
        className={`h-40 w-40 rounded-full flex items-center justify-center focus:outline-none transition-all ${
          isTransmitting
            ? "bg-emerald-500 text-white shadow-lg"
            : "bg-white text-emerald-600 border-2 border-emerald-500 hover:bg-emerald-50"
        }`}
        onMouseDown={() => onPushToTalk(true)}
        onMouseUp={() => onPushToTalk(false)}
        onTouchStart={() => onPushToTalk(true)}
        onTouchEnd={() => onPushToTalk(false)}
      >
        <div className="text-center">
          <Mic className={`h-12 w-12 mx-auto ${isTransmitting ? "animate-pulse" : ""}`} />
          <p className="mt-2 font-medium">Hold to Speak</p>
          {isTransmitting && (
            <div className="mt-2 flex items-center justify-center gap-1">
              <span className="animate-ping h-2 w-2 rounded-full bg-red-500 opacity-75"></span>
              <span className="text-sm">Live</span>
            </div>
          )}
        </div>
      </button>
    </div>
  )
}
