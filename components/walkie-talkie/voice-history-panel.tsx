"use client"

import { useState } from "react"
import { Clock, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VoiceHistoryPanel() {
  const [activeVoiceMessage, setActiveVoiceMessage] = useState<number | null>(null)

  // Sample voice message history
  const voiceHistory = [
    {
      id: 1,
      sender: "Sophie Martin",
      timestamp: "10:23 AM",
      duration: "0:12",
      isPlaying: false,
    },
    {
      id: 2,
      sender: "Thomas Dubois",
      timestamp: "10:15 AM",
      duration: "0:08",
      isPlaying: false,
    },
    {
      id: 3,
      sender: "Emma Petit",
      timestamp: "10:02 AM",
      duration: "0:15",
      isPlaying: false,
    },
  ]

  // Toggle voice message playback
  const toggleVoiceMessage = (id: number) => {
    if (activeVoiceMessage === id) {
      setActiveVoiceMessage(null)
    } else {
      setActiveVoiceMessage(id)
    }
  }

  return (
    <div className="h-80 md:h-auto md:w-80 border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-500" />
            Recent Messages
          </h3>
          <Button variant="ghost" size="sm" className="text-xs">
            Clear All
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {voiceHistory.map((message) => (
          <div key={message.id} className="border border-gray-200 rounded-lg p-3 hover:bg-white">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">{message.sender}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {message.timestamp}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => toggleVoiceMessage(message.id)}
                >
                  {activeVoiceMessage === message.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-emerald-200 rounded-full relative ${
                      activeVoiceMessage === message.id ? "animate-progress" : ""
                    }`}
                    style={{
                      width: activeVoiceMessage === message.id ? "100%" : "0%",
                      transition: "width 10s linear",
                    }}
                  ></div>
                </div>
              </div>
              <span className="text-xs text-gray-500">{message.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
