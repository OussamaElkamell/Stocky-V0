"use client"
import { Volume2, VolumeX, Radio, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { WalkieTalkieHeader } from "@/components/walkie-talkie/walkie-talkie-header"
import { UserList } from "@/components/walkie-talkie/user-list"
import { ChannelList } from "@/components/walkie-talkie/channel-list"
import { VoiceHistoryPanel } from "@/components/walkie-talkie/voice-history-panel"
import { PushToTalkButton } from "@/components/walkie-talkie/push-to-talk-button"
import { VolumeControl } from "@/components/walkie-talkie/volume-control"
import { UserProfile } from "@/components/walkie-talkie/user-profile"
import { useWalkieTalkie } from "@/hooks/use-walkie-talkie"

export default function WalkieTalkiePage() {
  const {
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
  } = useWalkieTalkie()

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 flex flex-col overflow-hidden">
        <WalkieTalkieHeader />

        <div className="p-4 border-b border-gray-200">
          <Tabs defaultValue="channels" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <ChannelList channels={channels} selectedChannel={selectedChannel} onChannelSelect={setSelectedChannel} />

            <UserList users={users} />
          </Tabs>
        </div>

        <UserProfile />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center">
              <Radio className="h-5 w-5 text-emerald-500 mr-2" />
              <span className="font-bold text-xl">Walkie-Talkie</span>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={toggleMute} className={isMuted ? "text-rose-500" : ""}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <ChannelSelector
                channels={channels}
                selectedChannel={selectedChannel}
                onChannelSelect={setSelectedChannel}
              />
            </div>
          </div>
        </header>

        {/* Main Communication Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Central Push-to-Talk Area */}
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {channels.find((c) => c.id === selectedChannel)?.name || "General"} Channel
              </h2>
              <p className="text-gray-500">{isTransmitting ? "Transmitting..." : "Ready to communicate"}</p>
            </div>

            <PushToTalkButton isTransmitting={isTransmitting} onPushToTalk={handlePushToTalk} />

            <VolumeControl volume={volume} isMuted={isMuted} onVolumeChange={setVolume} onToggleMute={toggleMute} />

            {/* User list */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                <Users className="h-3 w-3 mr-1" />
                {users.filter((u) => u.status === "available").length} Online
              </Badge>
            </div>
          </div>

          {/* Voice History Panel */}
          <VoiceHistoryPanel />
        </div>
      </div>
    </div>
  )
}

// Channel selector component
function ChannelSelector({ channels, selectedChannel, onChannelSelect }) {
  return (
    <Select defaultValue={selectedChannel} onValueChange={onChannelSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select channel" />
      </SelectTrigger>
      <SelectContent>
        {channels.map((channel) => (
          <SelectItem key={channel.id} value={channel.id}>
            {channel.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
