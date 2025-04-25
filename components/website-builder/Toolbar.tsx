"use client"
import { useWebsiteBuilder } from "@/contexts/WebsiteBuilderContext"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import {
  PanelLeft,
  PanelRight,
  Undo2,
  Redo2,
  Save,
  Eye,
  Upload,
  ChevronDown,
  Laptop,
  Tablet,
  Smartphone,
  Users,
  FileSearch,
  FileCode,
  History,
  Share2,
  Plus,
} from "lucide-react"
import { generateHtmlForPage, calculateSeoScore } from "@/utils/element-utils"

export const Toolbar = () => {
  const {
    state,
    dispatch,
    showLeftSidebar,
    setShowLeftSidebar,
    showRightSidebar,
    setShowRightSidebar,
    activeDevice,
    setActiveDevice,
    showCollaborationPanel,
    setShowCollaborationPanel,
    showSeoPanel,
    setShowSeoPanel,
    showCodeEditor,
    setShowCodeEditor,
    showPageManager,
    setShowPageManager,
    lastSaved,
    setLastSaved,
  } = useWebsiteBuilder()

  // Get current page
  const currentPage = state.websiteStructure.pages.find((page) => page.id === state.websiteStructure.currentPageId)

  // Calculate SEO score
  const seoScore = currentPage ? calculateSeoScore(currentPage) : 0

  // Mock active collaborators
  const activeCollaborators = [
    { id: 1, name: "John Doe", role: "Editor", active: true, avatar: null },
    { id: 2, name: "Jane Smith", role: "Viewer", active: true, avatar: null },
    { id: 3, name: "Bob Johnson", role: "Admin", active: false, avatar: null },
  ]

  // Save website
  const saveWebsite = () => {
    localStorage.setItem("websiteBuilder", JSON.stringify(state.websiteStructure))
    setLastSaved(new Date())
  }

  // Preview website
  const previewWebsite = () => {
    if (!currentPage) return

    const html = generateHtmlForPage(currentPage)
    const previewWindow = window.open("", "_blank")
    if (previewWindow) {
      previewWindow.document.write(html)
      previewWindow.document.close()
    }
  }

  // Export website
  const exportWebsite = () => {
    if (!currentPage) return

    const html = generateHtmlForPage(currentPage)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentPage.name.toLowerCase().replace(/\s+/g, "-")}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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

  return (
    <>
      {/* Top Toolbar */}
      <div className="border-b bg-white shadow-sm">
        <div className="flex h-14 items-center px-4 gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowLeftSidebar(!showLeftSidebar)}>
              <PanelLeft className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch({ type: "UNDO" })}
                    disabled={state.historyIndex === 0}
                  >
                    <Undo2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch({ type: "REDO" })}
                    disabled={state.historyIndex === state.history.length - 1}
                  >
                    <Redo2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator orientation="vertical" className="h-6" />
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  {currentPage?.name || "Home"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {state.websiteStructure.pages.map((page) => (
                  <DropdownMenuItem key={page.id} onClick={() => dispatch({ type: "SWITCH_PAGE", payload: page.id })}>
                    {page.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => setShowPageManager(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Pages
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center border rounded-md p-0.5 bg-slate-50">
              <Button
                variant={activeDevice === "desktop" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setActiveDevice("desktop")}
              >
                <Laptop className="h-4 w-4" />
              </Button>
              <Button
                variant={activeDevice === "tablet" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setActiveDevice("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={activeDevice === "mobile" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-2"
                onClick={() => setActiveDevice("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <Button variant="outline" size="sm" onClick={saveWebsite}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>

            <Button variant="outline" size="sm" onClick={previewWebsite}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>

            <Button className="bg-blue-600 hover:bg-blue-700" size="sm" onClick={exportWebsite}>
              <Upload className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setShowRightSidebar(!showRightSidebar)}>
              <PanelRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Secondary Toolbar */}
        <div className="flex h-10 items-center px-4 gap-4 bg-slate-50 border-t">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 text-xs ${showCollaborationPanel ? "bg-slate-200" : ""}`}
              onClick={() => setShowCollaborationPanel(!showCollaborationPanel)}
            >
              <Users className="h-4 w-4 mr-1" />
              Collaboration
              {activeCollaborators.filter((c) => c.active).length > 0 && (
                <Badge className="ml-1 bg-emerald-500 text-white h-5 min-w-5 flex items-center justify-center p-0 text-xs">
                  {activeCollaborators.filter((c) => c.active).length}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`h-8 text-xs ${showSeoPanel ? "bg-slate-200" : ""}`}
              onClick={() => setShowSeoPanel(!showSeoPanel)}
            >
              <FileSearch className="h-4 w-4 mr-1" />
              SEO
              <Badge
                className={`ml-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs ${
                  seoScore >= 80
                    ? "bg-emerald-500 text-white"
                    : seoScore >= 60
                      ? "bg-amber-500 text-white"
                      : "bg-rose-500 text-white"
                }`}
              >
                {seoScore}
              </Badge>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`h-8 text-xs ${showCodeEditor ? "bg-slate-200" : ""}`}
              onClick={() => setShowCodeEditor(!showCodeEditor)}
            >
              <FileCode className="h-4 w-4 mr-1" />
              Custom Code
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <History className="h-4 w-4 mr-1" />
              History
            </Button>

            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
