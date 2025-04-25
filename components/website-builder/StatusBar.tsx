"use client"
import { useWebsiteBuilder } from "@/contexts/WebsiteBuilderContext"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export const StatusBar = () => {
  const { state, lastSaved, setLastSaved } = useWebsiteBuilder()

  // Get current page
  const currentPage = state.websiteStructure.pages.find((page) => page.id === state.websiteStructure.currentPageId)

  // Format last saved date
  const formatLastSaved = () => {
    if (!lastSaved) return "Never"

    const now = new Date()
    const diff = now.getTime() - lastSaved.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (seconds < 60) {
      return "Just now"
    } else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
    } else if (hours < 24) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
    } else {
      return lastSaved.toLocaleDateString()
    }
  }

  // Save website
  const handleSave = () => {
    localStorage.setItem("websiteBuilder", JSON.stringify(state.websiteStructure))
    setLastSaved(new Date())
  }

  return (
    <div className="border-t bg-white h-8 px-4 flex items-center justify-between text-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Page:</span>
          <span className="font-medium">{currentPage?.name || "Home"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Status:</span>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
            Draft
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Last saved: {formatLastSaved()}</span>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={handleSave}>
          Save now
        </Button>
      </div>
    </div>
  )
}
