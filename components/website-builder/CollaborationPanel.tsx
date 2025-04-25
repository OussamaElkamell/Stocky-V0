"use client"

import React from "react"
import { useWebsiteBuilder } from "@/contexts/WebsiteBuilderContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { X, Users, MessageSquare } from "lucide-react"

// Mock active collaborators data
const activeCollaborators = [
  {
    id: 1,
    name: "John Doe",
    role: "Editor",
    active: true,
    avatar: "/placeholder.svg?height=40&width=40&query=user+avatar+1",
    editing: "Header Section",
    lastActive: "2 min ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Viewer",
    active: true,
    avatar: "/placeholder.svg?height=40&width=40&query=user+avatar+2",
    editing: null,
    lastActive: "Just now",
  },
  {
    id: 3,
    name: "Bob Johnson",
    role: "Admin",
    active: false,
    avatar: "/placeholder.svg?height=40&width=40&query=user+avatar+3",
    editing: null,
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    name: "Alice Williams",
    role: "Editor",
    active: false,
    avatar: "/placeholder.svg?height=40&width=40&query=user+avatar+4",
    editing: null,
    lastActive: "Yesterday",
  },
]

// Mock comments data
const comments = [
  {
    id: 1,
    user: {
      name: "Sophie Martin",
      avatar: "/placeholder.svg?height=24&width=24&query=user+avatar+5",
    },
    time: "10 minutes ago",
    text: "Can we make the hero section text larger on mobile?",
  },
  {
    id: 2,
    user: {
      name: "Thomas Dubois",
      avatar: "/placeholder.svg?height=24&width=24&query=user+avatar+6",
    },
    time: "Yesterday",
    text: "The product grid needs to be 4 columns on desktop.",
  },
]

export const CollaborationPanel = () => {
  const { showCollaborationPanel, setShowCollaborationPanel } = useWebsiteBuilder()
  const [newComment, setNewComment] = React.useState("")

  // Handle add comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, you would add the comment to the database
      // For now, we'll just clear the input
      setNewComment("")
    }
  }
  if (!showCollaborationPanel) return null

  return (
    <div className="fixed right-0 top-[9.5rem] w-80 h-[calc(100vh-9.5rem)] bg-white border-l shadow-lg z-40 animate-in slide-in-from-right">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Users className="h-4 w-4" />
          Collaboration
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setShowCollaborationPanel(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Active Users</h4>
          {activeCollaborators.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.active && (
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-white"></span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {user.editing ? (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Editing {user.editing}
                  </Badge>
                ) : (
                  user.lastActive
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Comments</h4>
          {comments.map((comment) => (
            <div key={comment.id} className="border rounded-md p-3">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium">{comment.user.name}</p>
                  <p className="text-xs text-muted-foreground">{comment.time}</p>
                </div>
              </div>
              <p className="text-sm">{comment.text}</p>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Reply
                </Button>
              </div>
            </div>
          ))}

          <div className="mt-2">
            <Textarea
              placeholder="Add a comment..."
              className="text-sm min-h-[80px]"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleAddComment}>
                <MessageSquare className="h-4 w-4 mr-1" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
