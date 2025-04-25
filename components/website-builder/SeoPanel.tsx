"use client"

import type React from "react"
import { useWebsiteBuilder } from "@/contexts/WebsiteBuilderContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X, AlertTriangle, CheckCircle, Info, Sparkles } from "lucide-react"
import { calculateSeoScore } from "@/utils/element-utils"

// SEO suggestions data
const seoSuggestions = [
  {
    id: 1,
    type: "error",
    message: "Meta description is missing",
    fixed: false,
    fixAction: "addMetaDescription",
  },
  {
    id: 2,
    type: "warning",
    message: "Title is too short (less than 30 characters)",
    fixed: false,
    fixAction: "improveTitle",
  },
  {
    id: 3,
    type: "warning",
    message: "No image has alt text",
    fixed: false,
    fixAction: "addAltText",
  },
  {
    id: 4,
    type: "success",
    message: "Page has a heading structure",
    fixed: true,
    fixAction: null,
  },
  {
    id: 5,
    type: "info",
    message: "Consider adding Open Graph tags for social sharing",
    fixed: false,
    fixAction: "addOgTags",
  },
]

export const SeoPanel = () => {
  const { state, dispatch, showSeoPanel, setShowSeoPanel } = useWebsiteBuilder()

  // Get current page
  const currentPage = state.websiteStructure.pages.find((page) => page.id === state.websiteStructure.currentPageId)

  // Calculate SEO score
  const seoScore = currentPage ? calculateSeoScore(currentPage) : 0

  // Handle page settings update
  const handlePageSettingsUpdate = (settings: Record<string, any>) => {
    if (currentPage) {
      dispatch({
        type: "UPDATE_PAGE",
        payload: {
          pageId: currentPage.id,
          updates: {
            settings: {
              ...currentPage.settings,
              ...settings,
            },
          },
        },
      })
    }
  }

  // Handle fix action
  const handleFixAction = (action: string | null) => {
    if (!action || !currentPage) return

    switch (action) {
      case "addMetaDescription":
        handlePageSettingsUpdate({
          metaDescription: "This is an automatically generated meta description for your page.",
        })
        break
      case "improveTitle":
        handlePageSettingsUpdate({
          title: `${currentPage.name} | Comprehensive Guide - Your Website`,
        })
        break
      case "addAltText":
        // Find images without alt text and add it
        const updatedElements = currentPage.elements.map((element) => {
          if (element.type === "image" && (!element.settings || !element.settings.altText)) {
            return {
              ...element,
              settings: {
                ...element.settings,
                altText: "Descriptive image alt text",
              },
            }
          }
          return element
        })

        dispatch({
          type: "UPDATE_PAGE",
          payload: {
            pageId: currentPage.id,
            updates: {
              elements: updatedElements,
            },
          },
        })
        break
      case "addOgTags":
        handlePageSettingsUpdate({
          ogTitle: currentPage.settings.title,
          ogDescription: currentPage.settings.metaDescription,
          ogImage: "/placeholder.svg?height=1200&width=630&query=website+preview",
        })
        break
      default:
        break
    }
  }

  if (!showSeoPanel) return null

  return (
    <div className="fixed right-0 top-[9.5rem] w-80 h-[calc(100vh-9.5rem)] bg-white border-l shadow-lg z-40 animate-in slide-in-from-right">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <FileSearch className="h-4 w-4" />
          SEO Optimization
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setShowSeoPanel(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">SEO Score</h4>
            <Badge className={seoScore >= 80 ? "bg-emerald-500" : seoScore >= 60 ? "bg-amber-500" : "bg-rose-500"}>
              {seoScore}/100
            </Badge>
          </div>
          <Progress value={seoScore} className="h-2" />
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Page Settings</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Page Title</label>
              <Input
                value={currentPage?.settings.title || ""}
                onChange={(e) => handlePageSettingsUpdate({ title: e.target.value })}
                placeholder="Page Title"
              />
              <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Description</label>
              <Textarea
                value={currentPage?.settings.metaDescription || ""}
                onChange={(e) => handlePageSettingsUpdate({ metaDescription: e.target.value })}
                placeholder="Meta Description"
                className="h-20"
              />
              <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Keywords</label>
              <Input
                value={currentPage?.settings.metaKeywords || ""}
                onChange={(e) => handlePageSettingsUpdate({ metaKeywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Suggestions</h4>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {seoSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={`flex items-center justify-between p-2 rounded-md ${
                    suggestion.type === "error"
                      ? "bg-rose-50"
                      : suggestion.type === "warning"
                        ? "bg-amber-50"
                        : suggestion.type === "success"
                          ? "bg-emerald-50"
                          : "bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {suggestion.type === "error" && <AlertTriangle className="h-4 w-4 text-rose-500" />}
                    {suggestion.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                    {suggestion.type === "success" && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                    {suggestion.type === "info" && <Info className="h-4 w-4 text-blue-500" />}
                    <span className="text-sm">{suggestion.message}</span>
                  </div>
                  {!suggestion.fixed && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => handleFixAction(suggestion.fixAction)}
                    >
                      Fix
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Open Graph Settings</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">OG Title</label>
              <Input
                value={currentPage?.settings.ogTitle || ""}
                onChange={(e) => handlePageSettingsUpdate({ ogTitle: e.target.value })}
                placeholder="OG Title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">OG Description</label>
              <Textarea
                value={currentPage?.settings.ogDescription || ""}
                onChange={(e) => handlePageSettingsUpdate({ ogDescription: e.target.value })}
                placeholder="OG Description"
                className="h-20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">OG Image URL</label>
              <Input
                value={currentPage?.settings.ogImage || ""}
                onChange={(e) => handlePageSettingsUpdate({ ogImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <Sparkles className="h-4 w-4 mr-2" />
          Optimize Automatically
        </Button>
      </div>
    </div>
  )
}

// Import missing components
function FileSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <circle cx="11.5" cy="14.5" r="2.5" />
      <path d="M13.25 16.25 15 18" />
    </svg>
  )
}
