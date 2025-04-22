"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Radio, X, Mic, Volume2, VolumeX, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useWalkieTalkie } from "@/hooks/use-walkie-talkie"
import React from "react"

// Refactor the component to make it more modular
export function FloatingWalkieTalkieButton() {
  const [isActive, setIsActive] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const pathname = usePathname()
  const [showButton, setShowButton] = useState(true)

  // Hooks
  const { isTransmitting, isMuted, volume, selectedChannel, handlePushToTalk, toggleMute, setVolume, users, channels } =
    useWalkieTalkie()
  const [showUserList, setShowUserList] = useState(false)

  useEffect(() => {
    setShowButton(pathname !== "/walkie-talkie")
  }, [pathname])

  // Simulate random activity on the walkie-talkie
  useEffect(() => {
    if (!showButton) return

    const interval = setInterval(() => {
      const shouldAnimate = Math.random() > 0.7
      if (shouldAnimate) {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 3000)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [showButton])

  if (!showButton) {
    return null
  }

  return (
    <>
      {isActive && (
        <FloatingWalkieTalkiePopup
          isTransmitting={isTransmitting}
          isMuted={isMuted}
          volume={volume}
          selectedChannel={selectedChannel}
          handlePushToTalk={handlePushToTalk}
          toggleMute={toggleMute}
          setVolume={setVolume}
          showUserList={showUserList}
          setShowUserList={setShowUserList}
          channels={channels}
          users={users}
          onClose={() => setIsActive(false)}
        />
      )}

      <FloatingButton isActive={isActive} isAnimating={isAnimating} onClick={() => setIsActive(!isActive)} />
    </>
  )
}

// Extracted component for the floating button
function FloatingButton({ isActive, isAnimating, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 h-14 w-14 rounded-full flex items-center justify-center shadow-lg z-50 transition-all ${
        isActive ? "bg-slate-700 text-white" : "bg-emerald-500 hover:bg-emerald-600 text-white"
      } ${isAnimating ? "animate-pulse" : ""}`}
    >
      <Radio className="h-6 w-6" />
      {isAnimating && <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-ping"></span>}
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
    </button>
  )
}

// Extracted component for the popup content
function FloatingWalkieTalkiePopup({
  isTransmitting,
  isMuted,
  volume,
  selectedChannel,
  handlePushToTalk,
  toggleMute,
  setVolume,
  showUserList,
  setShowUserList,
  channels,
  users,
  onClose,
}) {
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
    <div
      className="fixed bottom-24 right-6 w-[300px] bg-white rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 flex flex-col overflow-hidden"
      style={{ maxWidth: "calc(100vw - 48px)", maxHeight: "400px" }}
    >
      {/* Header */}
      <div className="p-3 border-b bg-slate-50 flex justify-between items-center">
        <h3 className="font-semibold flex items-center gap-2">
          <Radio className="h-4 w-4 text-emerald-500" />
          {channels.find((c) => c.id === selectedChannel)?.name || "General"} Channel
        </h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowUserList(!showUserList)}>
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Push to talk area */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="relative">
              {/* Waveform visualization */}
              <MiniWaveform isTransmitting={isTransmitting} ref={waveformRef} />

              {/* Push-to-Talk Button */}
              <MiniPushToTalkButton isTransmitting={isTransmitting} onPushToTalk={handlePushToTalk} />
            </div>

            {/* Volume Control */}
            <MiniVolumeControl isMuted={isMuted} volume={volume} toggleMute={toggleMute} setVolume={setVolume} />
          </div>

          {/* Footer with full page link */}
          <MiniUserFooter />
        </div>

        {/* User list sidebar */}
        {showUserList && <MiniUserList users={users} />}
      </div>
    </div>
  )
}

// Mini components for the popup
const MiniWaveform = React.forwardRef(({ isTransmitting }, ref) => (
  <div
    className={`absolute -top-16 left-1/2 transform -translate-x-1/2 w-40 h-12 flex items-end justify-center gap-1 ${
      isTransmitting ? "opacity-100" : "opacity-0"
    } transition-opacity`}
    ref={ref}
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="waveform-bar w-1 bg-emerald-500 rounded-t-sm transition-all duration-100"
        style={{ height: "0%" }}
      ></div>
    ))}
  </div>
))
MiniWaveform.displayName = "MiniWaveform"

function MiniPushToTalkButton({ isTransmitting, onPushToTalk }) {
  return (
    <button
      className={`h-24 w-24 rounded-full flex items-center justify-center focus:outline-none transition-all ${
        isTransmitting
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-95"
          : "bg-white text-emerald-600 border-2 border-emerald-500 hover:bg-emerald-50"
      }`}
      onMouseDown={() => onPushToTalk(true)}
      onMouseUp={() => onPushToTalk(false)}
      onTouchStart={() => onPushToTalk(true)}
      onTouchEnd={() => onPushToTalk(false)}
    >
      <div className="text-center">
        <Mic className={`h-8 w-8 mx-auto ${isTransmitting ? "animate-pulse" : ""}`} />
        <p className="mt-1 font-medium text-xs">Hold to Talk</p>
      </div>
    </button>
  )
}

function MiniVolumeControl({ isMuted, volume, toggleMute, setVolume }) {
  return (
    <div className="mt-4 w-full max-w-[200px]">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className={`h-7 w-7 ${isMuted ? "text-rose-500" : ""}`}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Slider
          value={[volume]}
          max={100}
          step={1}
          className="flex-1"
          onValueChange={(value) => setVolume(value[0])}
          disabled={isMuted}
        />
        <span className="text-xs font-medium w-6">{volume}%</span>
      </div>
    </div>
  )
}

function MiniUserFooter() {
  return (
    <div className="p-2 border-t bg-slate-50 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
          <p className="text-xs">Available</p>
        </div>
      </div>
      <Link href="/walkie-talkie" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
        Open Full View
      </Link>
    </div>
  )
}

function MiniUserList({ users }) {
  return (
    <div className="w-[120px] border-l bg-white overflow-y-auto">
      <div className="p-2 border-b sticky top-0 bg-white">
        <h4 className="text-xs font-medium">Online Users</h4>
      </div>
      <div className="p-2 space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div
                className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white ${getStatusColor(user.status)}`}
              ></div>
            </div>
            <p className="text-xs mt-1 truncate w-full">{user.name.split(" ")[0]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper function for status colors
function getStatusColor(status: string) {
  switch (status) {
    case "available":
      return "bg-emerald-500"
    case "busy":
      return "bg-amber-500"
    case "offline":
      return "bg-slate-300"
    default:
      return "bg-slate-300"
  }
}
