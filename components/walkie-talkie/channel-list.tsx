"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"

export interface Channel {
  id: string
  name: string
  members: number
}

interface ChannelListProps {
  channels: Channel[]
  selectedChannel: string
  onChannelSelect: (channelId: string) => void
}

export function ChannelList({ channels, selectedChannel, onChannelSelect }: ChannelListProps) {
  return (
    <Tabs defaultValue="channels" className="w-full">
      <TabsContent value="channels" className="space-y-4 mt-2">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
              selectedChannel === channel.id
                ? "bg-emerald-50 border border-emerald-200"
                : "hover:bg-gray-50 border border-transparent"
            }`}
            onClick={() => onChannelSelect(channel.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${selectedChannel === channel.id ? "bg-emerald-500" : "bg-gray-300"}`}
              ></div>
              <div>
                <p className="font-medium">{channel.name}</p>
                <p className="text-xs text-gray-500">{channel.members} members</p>
              </div>
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  )
}
