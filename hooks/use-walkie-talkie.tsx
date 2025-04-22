"use client"

import { useState } from "react"

export function useWalkieTalkie() {
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [selectedChannel, setSelectedChannel] = useState("general")

  // Sample user data
  const users = [
    {
      id: 1,
      name: "Sophie Martin",
      avatar: "/confident-woman.png",
      status: "available",
      lastActive: "Just now",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      avatar: "/thoughtful-coder.png",
      status: "busy",
      lastActive: "2 min ago",
    },
    {
      id: 3,
      name: "Emma Petit",
      avatar: "/flowing-locks.png",
      status: "available",
      lastActive: "5 min ago",
    },
    {
      id: 4,
      name: "Lucas Bernard",
      avatar: "/bearded-man-portrait.png",
      status: "offline",
      lastActive: "1 hour ago",
    },
    {
      id: 5,
      name: "Chloé Moreau",
      avatar: "/curly-haired-avatar.png",
      status: "available",
      lastActive: "Just now",
    },
  ]

  // Sample channels
  const channels = [
    { id: "general", name: "General", members: 12 },
    { id: "team-alpha", name: "Team Alpha", members: 5 },
    { id: "support", name: "Support", members: 8 },
    { id: "emergency", name: "Emergency", members: 15 },
  ]

  // Handle push-to-talk
  const handlePushToTalk = (isPressed: boolean) => {
    setIsTransmitting(isPressed)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return {
    isTransmitting,
    isMuted,
    volume,
    selectedChannel,
    handlePushToTalk,
    toggleMute,
    setVolume,
    setSelectedChannel,
    users,
    channels,
  }
}
