"use client"

import React from "react"
import { useWebsiteBuilder } from "@/contexts/WebsiteBuilderContext"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Grip } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Bookmark, FolderPlus } from "lucide-react"
import type { ElementType } from "@/contexts/WebsiteBuilderContext"

// Component categories with their components
const componentCategories = [
  {
    name: "Basic",
    components: [
      { id: "heading", name: "Heading", icon: <Heading className="h-4 w-4" /> },
      { id: "text", name: "Text", icon: <Type className="h-4 w-4" /> },
      { id: "button", name: "Button", icon: <Square className="h-4 w-4" /> },
      { id: "image", name: "Image", icon: <ImageIcon className="h-4 w-4" /> },
      { id: "container", name: "Container", icon: <LayoutGrid className="h-4 w-4" /> },
      { id: "divider", name: "Divider", icon: <Minus className="h-4 w-4" /> },
    ],
  },
  {
    name: "Advanced",
    components: [
      { id: "list", name: "List", icon: <ListOrdered className="h-4 w-4" /> },
      { id: "video", name: "Video", icon: <Video className="h-4 w-4" /> },
      { id: "form", name: "Form", icon: <FormInput className="h-4 w-4" /> },
      { id: "icon", name: "Icon", icon: <Star className="h-4 w-4" /> },
    ],
  },
]

// Template data
const templates = [
  {
    id: "1",
    name: "Business Homepage",
    category: "business",
    image: "/modern-business-website-mockup.png",
    rating: 4.8,
    downloads: 1250,
  },
  {
    id: "2",
    name: "E-commerce Store",
    category: "e-commerce",
    image: "/modern-apparel-storefront.png",
    rating: 4.9,
    downloads: 2100,
  },
  {
    id: "3",
    name: "Portfolio",
    category: "personal",
    image: "/clean-minimalist-portfolio.png",
    rating: 4.7,
    downloads: 980,
  },
  {
    id: "4",
    name: "Blog",
    category: "content",
    image: "/clean-minimalist-blog.png",
    rating: 4.6,
    downloads: 1500,
  },
  {
    id: "5",
    name: "Restaurant Menu",
    category: "food",
    image: "/placeholder.svg?height=150&width=250&query=restaurant+website+template",
    rating: 4.5,
    downloads: 850,
  },
  {
    id: "6",
    name: "Landing Page",
    category: "business",
    image: "/placeholder.svg?height=150&width=250&query=landing+page+template",
    rating: 4.7,
    downloads: 1800,
  },
]

export const ComponentSidebar = () => {
  const {
    showLeftSidebar,
    isDragging,
    setIsDragging,
    draggedComponent,
    setDraggedComponent,
    showTemplateModal,
    setShowTemplateModal,
  } = useWebsiteBuilder()
  const [templateCategory, setTemplateCategory] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  // Filter templates based on category and search query
  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = templateCategory === "all" || template.category === templateCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, type: ElementType) => {
    e.dataTransfer.setData("componentType", type)
    setIsDragging(true)
    setDraggedComponent(type)
  }

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false)
    setDraggedComponent(null)
  }

  // Handle template modal change
  const handleTemplateModalChange = (open: boolean) => {
    setShowTemplateModal(open)
  }

  // Apply template
  const applyTemplate = (templateId: string) => {
    // In a real app, you would fetch the template data from an API
    // For now, we'll just close the modal
    setShowTemplateModal(false)
  }

  return (
    <div
      className={`border-r bg-white w-64 flex-shrink-0 transition-all duration-300 ${
        showLeftSidebar ? "translate-x-0" : "-translate-x-full w-0"
      }`}
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Components</h3>
          <Dialog open={showTemplateModal} onOpenChange={handleTemplateModalChange}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setShowTemplateModal(true)}>
                Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Choose a Template</DialogTitle>
                <DialogDescription>Start with a pre-built template or create from scratch.</DialogDescription>
              </DialogHeader>

              <div className="flex items-center gap-2 my-2">
                <Select value={templateCategory} onValueChange={setTemplateCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="e-commerce">E-commerce</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="food">Food & Restaurant</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Search templates..."
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="border rounded-md overflow-hidden hover:border-blue-500 cursor-pointer transition-colors"
                      onClick={() => applyTemplate(template.id)}
                    >
                      <img
                        src={template.image || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-auto object-cover"
                      />
                      <div className="p-2">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-sm">{template.name}</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs ml-1">{template.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-muted-foreground">{template.category}</p>
                          <p className="text-xs text-muted-foreground">{template.downloads} uses</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-1" />
                    My Templates
                  </Button>
                  <Button variant="outline" size="sm">
                    <FolderPlus className="h-4 w-4 mr-1" />
                    Save Current
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowTemplateModal(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Use Template</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-8.5rem)]">
        <div className="p-4 space-y-6">
          {componentCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">{category.name}</h4>
              <div className="space-y-1">
                {category.components.map((component) => (
                  <div
                    key={component.id}
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 cursor-grab ${
                      draggedComponent === component.id ? "bg-slate-100 border border-dashed border-slate-300" : ""
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, component.id as ElementType)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="flex-shrink-0 text-slate-500">{component.icon}</div>
                    <span className="text-sm">{component.name}</span>
                    <Grip className="h-4 w-4 ml-auto text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

// Import missing components
function Heading(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 12h12" />
      <path d="M6 20V4" />
      <path d="M18 20V4" />
    </svg>
  )
}

function Type(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  )
}

function Square(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  )
}

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

function LayoutGrid(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}

function Minus(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
    </svg>
  )
}

function ListOrdered(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}

function Video(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  )
}

function FormInput(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <path d="M12 12h.01" />
      <path d="M17 12h.01" />
      <path d="M7 12h.01" />
    </svg>
  )
}
