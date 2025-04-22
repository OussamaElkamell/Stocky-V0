"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Eye, Save, Undo2, Redo2, Upload, ChevronDown, Laptop, Smartphone, Tablet, Type, ImageIcon, ShoppingBag, Grid3X3, Square, Heading, ListOrdered, AlignLeft, PanelLeft, PanelRight, X, Plus, Move, Copy, Trash2, LayoutGrid, FileText, FormInput, Mail, Grip, Clock, Search, Users, FileCode, Sparkles, Layers, SmartphoneIcon, Monitor, TabletIcon, ArrowRight, MessageSquare, History, Globe, FileSearch, Share2, Bookmark, Star, FolderPlus, CreditCard, LayersIcon } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, CheckCircleIcon, InfoIcon, PencilIcon } from 'lucide-react'

export default function WebsiteBuilder() {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showLeftSidebar, setShowLeftSidebar] = useState(true)
  const [showRightSidebar, setShowRightSidebar] = useState(true)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date())
  const [currentPage, setCurrentPage] = useState("Home")
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null)
  const [dropIndicator, setDropIndicator] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  })
  const [showCollaborationPanel, setShowCollaborationPanel] = useState(false)
  const [showSeoPanel, setShowSeoPanel] = useState(false)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [showPageManager, setShowPageManager] = useState(false)
  const [seoScore, setSeoScore] = useState(72)
  const [templateCategory, setTemplateCategory] = useState("all")
  const [breakpoints, setBreakpoints] = useState([
    { name: "Mobile", width: 375, active: true },
    { name: "Tablet", width: 768, active: true },
    { name: "Desktop", width: 1200, active: true },
  ])
  const workspaceRef = useRef<HTMLDivElement>(null)

  // Add a new state for storing the actual website structure
  const [websiteStructure, setWebsiteStructure] = useState<{
    pages: {
      id: string
      name: string
      url: string
      elements: any[]
      settings: {
        title: string
        metaDescription: string
        backgroundColor: string
        customCSS: string
        customJS: string
      }
    }[]
    currentPageId: string
  }>({
    pages: [
      {
        id: "home-page",
        name: "Home",
        url: "/",
        elements: [],
        settings: {
          title: "Home | Storei",
          metaDescription: "Welcome to Storei - Your one-stop shop for all your needs.",
          backgroundColor: "#FFFFFF",
          customCSS: "",
          customJS: "",
        },
      },
    ],
    currentPageId: "home-page",
  })

  // Add a function to get the current page
  const getCurrentPage = () => {
    return (
      websiteStructure.pages.find((page) => page.id === websiteStructure.currentPageId) || websiteStructure.pages[0]
    )
  }

  // Mock function to simulate saving
  const handleSave = () => {
    setLastSaved(new Date())
  }

  // Add a function to handle element selection
  const handleElementSelect = (elementId: string) => {
    setSelectedElement(elementId)
    setShowRightSidebar(true)
  }

  // Mock function to handle drag start
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("componentType", type)
    setIsDragging(true)
    setDraggedComponent(type)
  }

  // Mock function to handle drag end
  const handleDragEnd = () => {
    setIsDragging(false)
    setDraggedComponent(null)
    setDropIndicator({ x: 0, y: 0, visible: false })
  }

  // Mock function to handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined' && workspaceRef.current) {
      const rect = workspaceRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setDropIndicator({ x, y, visible: true })
    }
  }

  // Mock function to handle drag leave
  const handleDragLeave = () => {
    setDropIndicator({ x: 0, y: 0, visible: false })
  }

  // Modify the handleDrop function to actually add elements to the page
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const componentType = e.dataTransfer.getData("componentType")

    // Get drop position relative to the workspace
    if (workspaceRef.current) {
      const rect = workspaceRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      console.log(`Dropped ${componentType} at position x: ${x}, y: ${y}`)

      // Create a new element with a unique ID
      const newElement = {
        id: `element-${Date.now()}`,
        type: componentType,
        position: { x, y },
        content: getDefaultContentForType(componentType),
        style: getDefaultStyleForType(componentType),
      }

      // Add the element to the current page
      const updatedPages = websiteStructure.pages.map((page) => {
        if (page.id === websiteStructure.currentPageId) {
          return {
            ...page,
            elements: [...page.elements, newElement],
          }
        }
        return page
      })

      setWebsiteStructure({
        ...websiteStructure,
        pages: updatedPages,
      })

      // Select the newly added element
      setSelectedElement(newElement.id)
    }

    setIsDragging(false)
    setDraggedComponent(null)
    setDropIndicator({ x: 0, y: 0, visible: false })
  }

  // Add helper functions for default content and styles
  const getDefaultContentForType = (type: string) => {
    switch (type) {
      case "heading":
        return "Welcome to Storei"
      case "text":
        return "This is a text block. Click to edit the content and styling."
      case "button":
        return "Shop Now"
      case "image":
        return "/placeholder.svg?height=200&width=300"
      default:
        return ""
    }
  }

  const getDefaultStyleForType = (type: string) => {
    const baseStyle = {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.5",
      color: "#000000",
      backgroundColor: "transparent",
      padding: "16px",
      margin: "0px",
      borderWidth: "0px",
      borderRadius: "4px",
      borderColor: "#e2e8f0",
      textAlign: "left" as const,
    }

    switch (type) {
      case "heading":
        return {
          ...baseStyle,
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "16px",
        }
      case "button":
        return {
          ...baseStyle,
          backgroundColor: "#10b981",
          color: "#ffffff",
          padding: "8px 16px",
          borderRadius: "4px",
          fontWeight: "500",
          textAlign: "center" as const,
        }
      case "image":
        return {
          ...baseStyle,
          padding: "0px",
        }
      default:
        return baseStyle
    }
  }

  // Add a function to update element content
  const updateElementContent = (elementId: string, content: string) => {
    const updatedPages = websiteStructure.pages.map((page) => {
      if (page.id === websiteStructure.currentPageId) {
        return {
          ...page,
          elements: page.elements.map((element) => {
            if (element.id === elementId) {
              return {
                ...element,
                content,
              }
            }
            return element
          }),
        }
      }
      return page
    })

    setWebsiteStructure({
      ...websiteStructure,
      pages: updatedPages,
    })
  }

  // Add a function to update element style
  const updateElementStyle = (elementId: string, style: any) => {
    const updatedPages = websiteStructure.pages.map((page) => {
      if (page.id === websiteStructure.currentPageId) {
        return {
          ...page,
          elements: page.elements.map((element) => {
            if (element.id === elementId) {
              return {
                ...element,
                style: {
                  ...element.style,
                  ...style,
                },
              }
            }
            return element
          }),
        }
      }
      return page
    })

    setWebsiteStructure({
      ...websiteStructure,
      pages: updatedPages,
    })
  }

  // Add a function to delete an element
  const deleteElement = (elementId: string) => {
    const updatedPages = websiteStructure.pages.map((page) => {
      if (page.id === websiteStructure.currentPageId) {
        return {
          ...page,
          elements: page.elements.filter((element) => element.id !== elementId),
        }
      }
      return page
    })

    setWebsiteStructure({
      ...websiteStructure,
      pages: updatedPages,
    })

    setSelectedElement(null)
  }

  // Add a function to add a new page
  const addNewPage = (name: string, url: string) => {
    const newPage = {
      id: `page-${Date.now()}`,
      name,
      url,
      elements: [],
      settings: {
        title: `${name} | Storei`,
        metaDescription: `${name} page for Storei website.`,
        backgroundColor: "#FFFFFF",
        customCSS: "",
        customJS: "",
      },
    }

    setWebsiteStructure({
      ...websiteStructure,
      pages: [...websiteStructure.pages, newPage],
      currentPageId: newPage.id,
    })

    setCurrentPage(name)
  }

  // Add a function to switch pages
  const switchPage = (pageId: string) => {
    setWebsiteStructure({
      ...websiteStructure,
      currentPageId: pageId,
    })

    const page = websiteStructure.pages.find((p) => p.id === pageId)
    if (page) {
      setCurrentPage(page.name)
    }
  }

  // Add a function to update page settings
  const updatePageSettings = (settings: any) => {
    const updatedPages = websiteStructure.pages.map((page) => {
      if (page.id === websiteStructure.currentPageId) {
        return {
          ...page,
          settings: {
            ...page.settings,
            ...settings,
          },
        }
      }
      return page
    })

    setWebsiteStructure({
      ...websiteStructure,
      pages: updatedPages,
    })
  }

  // Add a function to generate HTML for the website
  const generateWebsiteHTML = () => {
    let html = ""

    websiteStructure.pages.forEach((page) => {
      let pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.settings.title}</title>
  <meta name="description" content="${page.settings.metaDescription}">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      background-color: ${page.settings.backgroundColor};
    }
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    ${page.settings.customCSS}
  </style>
</head>
<body>
  <div class="page-container">
`

      // Add elements
      page.elements.forEach((element) => {
        switch (element.type) {
          case "heading":
            pageHtml += `<h1 style="${styleObjectToString(element.style)}">${element.content}</h1>\n`
            break
          case "text":
            pageHtml += `<p style="${styleObjectToString(element.style)}">${element.content}</p>\n`
            break
          case "button":
            pageHtml += `<button style="${styleObjectToString(element.style)}">${element.content}</button>\n`
            break
          case "image":
            pageHtml += `<img src="${element.content}" alt="Image" style="${styleObjectToString(element.style)}" />\n`
            break
          default:
            break
        }
      })

      pageHtml += `  </div>
  <script>
    ${page.settings.customJS}
  </script>
</body>
</html>`

      html += pageHtml
    })

    return html
  }

  // Helper function to convert style object to string
  const styleObjectToString = (style: any) => {
    return Object.entries(style)
      .map(([key, value]) => `${kebabCase(key)}: ${value}`)
      .join("; ")
  }

  // Helper function to convert camelCase to kebab-case
  const kebabCase = (str: string) => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase()
  }

  // Add a function to export the website
  const exportWebsite = () => {
    const html = generateWebsiteHTML()
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "storei-website.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Add a function to preview the website
  const previewWebsite = () => {
    const currentPage = getCurrentPage()
    if (!currentPage) return

    // Generate HTML for the current page
    let pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${currentPage.settings.title}</title>
  <meta name="description" content="${currentPage.settings.metaDescription}">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      background-color: ${currentPage.settings.backgroundColor};
    }
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    ${currentPage.settings.customCSS}
  </style>
</head>
<body>
  <div class="page-container">
`

    // Add elements
    currentPage.elements.forEach((element) => {
      switch (element.type) {
        case "heading":
          pageHtml += `<h1 style="${styleObjectToString(element.style)}">${element.content}</h1>\n`
          break
        case "text":
          pageHtml += `<p style="${styleObjectToString(element.style)}">${element.content}</p>\n`
          break
        case "button":
          pageHtml += `<button style="${styleObjectToString(element.style)}">${element.content}</button>\n`
          break
        case "image":
          pageHtml += `<img src="${element.content}" alt="Image" style="${styleObjectToString(element.style)}" />\n`
          break
        default:
          break
      }
    })

    pageHtml += `  </div>
  <script>
    ${currentPage.settings.customJS}
  </script>
</body>
</html>`

    // Open preview in a new window
    const previewWindow = window.open("", "_blank")
    if (previewWindow) {
      previewWindow.document.write(pageHtml)
      previewWindow.document.close()
    }
  }

  // Add a save function that actually saves the website structure
  const saveWebsite = () => {
    // In a real application, this would save to a database or file system
    // For this demo, we'll just save to localStorage
    localStorage.setItem("storei-website", JSON.stringify(websiteStructure))
    setLastSaved(new Date())
    alert("Website saved successfully!")
  }

  // Add code to load saved website on component mount
  useEffect(() => {
    const savedWebsite = localStorage.getItem("storei-website")
    if (savedWebsite) {
      try {
        const parsed = JSON.parse(savedWebsite)
        setWebsiteStructure(parsed)

        const currentPage = parsed.pages.find((p) => p.id === parsed.currentPageId)
        if (currentPage) {
          setCurrentPage(currentPage.name)
        }
      } catch (error) {
        console.error("Error loading saved website:", error)
      }
    }
  }, [])

  // Format the last saved time
  const formatLastSaved = () => {
    if (!lastSaved) return "Not saved yet"

    const now = new Date()
    const diffMs = now.getTime() - lastSaved.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins === 1) return "1 minute ago"
    if (diffMins < 60) return `${diffMins} minutes ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours === 1) return "1 hour ago"
    return `${diffHours} hours ago`
  }

  // Active collaborators
  const activeCollaborators = [
    {
      id: 1,
      name: "Sophie Martin",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Editor",
      active: true,
      lastActive: "Just now",
      editing: "Header",
    },
    {
      id: 2,
      name: "Thomas Dubois",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Viewer",
      active: true,
      lastActive: "2 min ago",
      editing: null,
    },
    {
      id: 3,
      name: "Emma Petit",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Editor",
      active: false,
      lastActive: "Yesterday",
      editing: null,
    },
  ]

  // Template options
  const templates = [
    {
      id: 1,
      name: "E-commerce Homepage",
      category: "e-commerce",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.8,
      downloads: 1250,
    },
    {
      id: 2,
      name: "Product Landing Page",
      category: "e-commerce",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.6,
      downloads: 980,
    },
    {
      id: 3,
      name: "Blog Layout",
      category: "content",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.5,
      downloads: 1540,
    },
    {
      id: 4,
      name: "Portfolio",
      category: "personal",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.9,
      downloads: 2100,
    },
    {
      id: 5,
      name: "Contact Page",
      category: "business",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.3,
      downloads: 760,
    },
    {
      id: 6,
      name: "About Us",
      category: "business",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.7,
      downloads: 890,
    },
    {
      id: 7,
      name: "Services Page",
      category: "business",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.4,
      downloads: 650,
    },
    {
      id: 8,
      name: "Restaurant Menu",
      category: "food",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.8,
      downloads: 1120,
    },
  ]

  // Filter templates by category
  const filteredTemplates =
    templateCategory === "all" ? templates : templates.filter((template) => template.category === templateCategory)

  // Pages structure
  const pages = [
    { id: 1, name: "Home", url: "/", status: "published", lastEdited: "Today, 10:23" },
    { id: 2, name: "About", url: "/about", status: "published", lastEdited: "Yesterday" },
    { id: 3, name: "Products", url: "/products", status: "draft", lastEdited: "2 days ago" },
    { id: 4, name: "Contact", url: "/contact", status: "published", lastEdited: "Last week" },
    { id: 5, name: "Blog", url: "/blog", status: "draft", lastEdited: "3 days ago" },
  ]

  // Component categories
  const componentCategories = [
    {
      name: "Basic",
      components: [
        { id: "text", name: "Text Block", icon: <Type className="h-5 w-5" /> },
        { id: "heading", name: "Heading", icon: <Heading className="h-5 w-5" /> },
        { id: "image", name: "Image", icon: <ImageIcon className="h-5 w-5" /> },
        { id: "button", name: "Button", icon: <Square className="h-5 w-5" /> },
        { id: "list", name: "List", icon: <ListOrdered className="h-5 w-5" /> },
      ],
    },
    {
      name: "E-commerce",
      components: [
        { id: "product-card", name: "Product Card", icon: <ShoppingBag className="h-5 w-5" /> },
        { id: "product-grid", name: "Product Grid", icon: <Grid3X3 className="h-5 w-5" /> },
        { id: "add-to-cart", name: "Add to Cart", icon: <ShoppingBag className="h-5 w-5" /> },
        { id: "product-filter", name: "Product Filter", icon: <Search className="h-5 w-5" /> },
        { id: "checkout", name: "Checkout Form", icon: <CreditCard className="h-5 w-5" /> },
      ],
    },
    {
      name: "Layout",
      components: [
        { id: "container", name: "Container", icon: <LayoutGrid className="h-5 w-5" /> },
        { id: "section", name: "Section", icon: <LayersIcon className="h-5 w-5" /> },
        { id: "columns", name: "Columns", icon: <LayoutGrid className="h-5 w-5" /> },
        { id: "header", name: "Header", icon: <AlignLeft className="h-5 w-5" /> },
        { id: "footer", name: "Footer", icon: <AlignLeft className="h-5 w-5" /> },
      ],
    },
    {
      name: "Forms",
      components: [
        { id: "form", name: "Form", icon: <FileText className="h-5 w-5" /> },
        { id: "input", name: "Input", icon: <FormInput className="h-5 w-5" /> },
        { id: "contact-form", name: "Contact Form", icon: <Mail className="h-5 w-5" /> },
        { id: "checkbox", name: "Checkbox", icon: <Checkbox className="h-4 w-4" /> },
        { id: "select", name: "Select", icon: <ChevronDown className="h-4 w-4" /> },
      ],
    },
    {
      name: "Advanced",
      components: [
        { id: "slider", name: "Image Slider", icon: <ImageIcon className="h-5 w-5" /> },
        { id: "tabs", name: "Tabs", icon: <Layers className="h-5 w-5" /> },
        { id: "accordion", name: "Accordion", icon: <Layers className="h-5 w-5" /> },
        { id: "map", name: "Map", icon: <Globe className="h-5 w-5" /> },
        { id: "video", name: "Video", icon: <Play className="h-5 w-5" /> },
      ],
    },
  ]

  // SEO suggestions
  const seoSuggestions = [
    { id: 1, type: "warning", message: "Add meta description to improve search visibility", fixed: false },
    { id: 2, type: "error", message: "H1 tag is missing on the page", fixed: false },
    { id: 3, type: "success", message: "Page title is well optimized", fixed: true },
    { id: 4, type: "warning", message: "Some images are missing alt text", fixed: false },
    { id: 5, type: "info", message: "Consider adding more content to this page", fixed: false },
  ]

  // Custom code snippets
  const codeSnippets = [
    {
      id: 1,
      name: "Google Analytics",
      language: "javascript",
      code: "// Google Analytics Tracking Code\n(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\nm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n\nga('create', 'UA-XXXXX-Y', 'auto');\nga('send', 'pageview');",
    },
    {
      id: 2,
      name: "Custom CSS Animation",
      language: "css",
      code: "@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.animate-fade-in {\n  animation: fadeIn 0.5s ease-in-out;\n}",
    },
    {
      id: 3,
      name: "Responsive Menu",
      language: "javascript",
      code: "document.querySelector('.menu-toggle').addEventListener('click', function() {\n  document.querySelector('.mobile-menu').classList.toggle('active');\n});",
    },
  ]

  // Effect to update SEO score when suggestions are fixed
  useEffect(() => {
    const fixedCount = seoSuggestions.filter((s) => s.fixed).length
    const newScore = Math.round(60 + (fixedCount / seoSuggestions.length) * 40)
    setSeoScore(newScore)
  }, [seoSuggestions])

  const handleTemplateModalChange = useCallback((open: boolean) => {
    setShowTemplateModal(open)
    if (open) {
      // Load templates if needed
      console.log("Template modal opened")
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-background">
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
                  <Button variant="ghost" size="icon">
                    <Undo2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
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
                  {currentPage}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {websiteStructure.pages.map((page) => (
                  <DropdownMenuItem key={page.id} onClick={() => switchPage(page.id)}>
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

            <Button className="bg-emerald-600 hover:bg-emerald-700" size="sm" onClick={exportWebsite}>
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
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Components */}
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

                    <Input placeholder="Search templates..." className="flex-1" />
                  </div>

                  <ScrollArea className="h-[400px] pr-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                      {filteredTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="border rounded-md overflow-hidden hover:border-emerald-500 cursor-pointer transition-colors"
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
                      <Button variant="outline">Start from Scratch</Button>
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Use Template</Button>
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
                        onDragStart={(e) => handleDragStart(e, component.id)}
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

        {/* Central Workspace */}
        <div
          className="flex-1 bg-slate-100 overflow-auto relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          ref={workspaceRef}
        >
          <div
            className={`
            mx-auto my-6 bg-white shadow-sm border transition-all duration-300
            ${activeDevice === "desktop" ? "w-[1200px] max-w-[calc(100%-2rem)]" : ""}
            ${activeDevice === "tablet" ? "w-[768px]" : ""}
            ${activeDevice === "mobile" ? "w-[375px]" : ""}
            min-h-[calc(100vh-10rem)]
          `}
          >
            {/* Drop indicator */}
            {dropIndicator.visible && (
              <div
                className="absolute border-2 border-emerald-500 rounded-md bg-emerald-50 bg-opacity-30 z-10"
                style={{
                  left: dropIndicator.x - 50,
                  top: dropIndicator.y - 25,
                  width: "100px",
                  height: "50px",
                  pointerEvents: "none",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
            )}

            {getCurrentPage().elements.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center p-6">
                <LayoutGrid className="h-16 w-16 text-slate-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">Start Building Your Page</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Drag components from the left sidebar into this area or choose a template to get started quickly.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowTemplateModal(true)}>
                    Choose Template
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                {getCurrentPage().elements.map((element) => {
                  const isSelected = selectedElement === element.id

                  return (
                    <div
                      key={element.id}
                      className={`relative mb-4 ${isSelected ? "border-2 border-emerald-500" : "border border-slate-200 hover:border-slate-300"}`}
                      onClick={() => handleElementSelect(element.id)}
                    >
                      {isSelected && (
                        <div className="absolute -top-3 -left-3 bg-emerald-500 text-white rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1">
                          {element.type === "heading" && <Heading className="h-3 w-3" />}
                          {element.type === "text" && <Type className="h-3 w-3" />}
                          {element.type === "button" && <Square className="h-3 w-3" />}
                          {element.type === "image" && <ImageIcon className="h-3 w-3" />}
                          {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
                        </div>
                      )}

                      <div style={element.style}>
                        {element.type === "heading" && <h1>{element.content}</h1>}
                        {element.type === "text" && <p>{element.content}</p>}
                        {element.type === "button" && (
                          <button className="px-4 py-2 rounded-md">{element.content}</button>
                        )}
                        {element.type === "image" && (
                          <img src={element.content || "/placeholder.svg"} alt="Image" className="max-w-full" />
                        )}
                      </div>

                      {isSelected && (
                        <div className="absolute -top-3 -right-3 flex gap-1">
                          <Button size="icon" variant="secondary" className="h-6 w-6 rounded-md">
                            <Move className="h-3 w-3" />
                          </Button>
                          <Button size="icon" variant="secondary" className="h-6 w-6 rounded-md">
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-6 w-6 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteElement(element.id)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div
          className={`border-l bg-white w-80 flex-shrink-0 transition-all duration-300 ${
            showRightSidebar ? "translate-x-0" : "translate-x-full w-0"
          }`}
        >
          {selectedElement ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">Element Properties</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedElement(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="style" className="flex-1">
                <TabsList className="grid grid-cols-3 mx-4 mt-4">
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <TabsContent value="style" className="p-4 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Typography</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="font-family">Font</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Inter" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Inter">Inter</SelectItem>
                              <SelectItem value="Arial">Arial</SelectItem>
                              <SelectItem value="Helvetica">Helvetica</SelectItem>
                              <SelectItem value="Roboto">Roboto</SelectItem>
                              <SelectItem value="Montserrat">Montserrat</SelectItem>
                              <SelectItem value="OpenSans">Open Sans</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="font-size">Size</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="16px" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12px">12px</SelectItem>
                              <SelectItem value="14px">14px</SelectItem>
                              <SelectItem value="16px">16px</SelectItem>
                              <SelectItem value="18px">18px</SelectItem>
                              <SelectItem value="20px">20px</SelectItem>
                              <SelectItem value="24px">24px</SelectItem>
                              <SelectItem value="32px">32px</SelectItem>
                              <SelectItem value="48px">48px</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="font-weight">Weight</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Regular" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="300">Light</SelectItem>
                              <SelectItem value="400">Regular</SelectItem>
                              <SelectItem value="500">Medium</SelectItem>
                              <SelectItem value="600">Semi Bold</SelectItem>
                              <SelectItem value="700">Bold</SelectItem>
                              <SelectItem value="800">Extra Bold</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="line-height">Line Height</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="1.5" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="1.2">1.2</SelectItem>
                              <SelectItem value="1.5">1.5</SelectItem>
                              <SelectItem value="1.8">1.8</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <AlignLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <AlignCenter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <AlignRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <AlignJustify className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Colors</h4>
                      <div className="space-y-2">
                        <Label htmlFor="text-color">Text Color</Label>
                        <div className="flex gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-10 p-0 h-8">
                                <div className="h-full w-full bg-black rounded-sm" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                              <div className="grid grid-cols-6 gap-2">
                                {[
                                  "#000000",
                                  "#ffffff",
                                  "#f44336",
                                  "#e91e63",
                                  "#9c27b0",
                                  "#673ab7",
                                  "#3f51b5",
                                  "#2196f3",
                                  "#03a9f4",
                                  "#00bcd4",
                                  "#009688",
                                  "#4caf50",
                                  "#8bc34a",
                                  "#cddc39",
                                  "#ffeb3b",
                                  "#ffc107",
                                  "#ff9800",
                                  "#ff5722",
                                  "#795548",
                                  "#9e9e9e",
                                  "#607d8b",
                                  "#f1f1f1",
                                  "#d9d9d9",
                                  "#c4c4c4",
                                ].map((color) => (
                                  <Button
                                    key={color}
                                    variant="outline"
                                    className="w-8 h-8 p-0"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Input id="text-color" defaultValue="#000000" className="flex-1" />
                                <Button variant="outline" size="sm">
                                  Apply
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Input id="text-color" defaultValue="#000000" className="flex-1" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bg-color">Background Color</Label>
                        <div className="flex gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-10 p-0 h-8">
                                <div className="h-full w-full bg-white border rounded-sm" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                              <div className="grid grid-cols-6 gap-2">
                                {[
                                  "#000000",
                                  "#ffffff",
                                  "#f44336",
                                  "#e91e63",
                                  "#9c27b0",
                                  "#673ab7",
                                  "#3f51b5",
                                  "#2196f3",
                                  "#03a9f4",
                                  "#00bcd4",
                                  "#009688",
                                  "#4caf50",
                                  "#8bc34a",
                                  "#cddc39",
                                  "#ffeb3b",
                                  "#ffc107",
                                  "#ff9800",
                                  "#ff5722",
                                  "#795548",
                                  "#9e9e9e",
                                  "#607d8b",
                                  "#f1f1f1",
                                  "#d9d9d9",
                                  "#c4c4c4",
                                ].map((color) => (
                                  <Button
                                    key={color}
                                    variant="outline"
                                    className="w-8 h-8 p-0"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Input id="bg-color" defaultValue="#FFFFFF" className="flex-1" />
                                <Button variant="outline" size="sm">
                                  Apply
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Input id="bg-color" defaultValue="#FFFFFF" className="flex-1" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Spacing</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="padding">Padding</Label>
                          <span className="text-xs text-muted-foreground">16px</span>
                        </div>
                        <Slider defaultValue={[16]} max={100} step={1} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="margin">Margin</Label>
                          <span className="text-xs text-muted-foreground">16px</span>
                        </div>
                        <Slider defaultValue={[16]} max={100} step={1} />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Border</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="border-width">Width</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="1px" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0px</SelectItem>
                              <SelectItem value="1">1px</SelectItem>
                              <SelectItem value="2">2px</SelectItem>
                              <SelectItem value="4">4px</SelectItem>
                              <SelectItem value="8">8px</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="border-radius">Radius</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="4px" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0px</SelectItem>
                              <SelectItem value="2">2px</SelectItem>
                              <SelectItem value="4">4px</SelectItem>
                              <SelectItem value="8">8px</SelectItem>
                              <SelectItem value="16">16px</SelectItem>
                              <SelectItem value="9999">Full</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="border-color">Color</Label>
                        <div className="flex gap-2">
                          <div className="h-8 w-8 rounded-md border"></div>
                          <Input id="border-color" defaultValue="#E2E8F0" className="flex-1" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="p-4 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Text Content</h4>
                      {selectedElement && getCurrentPage().elements.find((el) => el.id === selectedElement) && (
                        <Textarea
                          placeholder="Enter text content here..."
                          value={getCurrentPage().elements.find((el) => el.id === selectedElement)?.content || ""}
                          onChange={(e) => updateElementContent(selectedElement, e.target.value)}
                          className="min-h-[100px]"
                        />
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Link</h4>
                      <div className="space-y-2">
                        <Label htmlFor="link-url">URL</Label>
                        <Input id="link-url" placeholder="https://example.com" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="open-new-tab" />
                        <Label htmlFor="open-new-tab">Open in new tab</Label>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Accessibility</h4>
                      <div className="space-y-2">
                        <Label htmlFor="aria-label">ARIA Label</Label>
                        <Input id="aria-label" placeholder="Description for screen readers" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alt-text">Alt Text (for images)</Label>
                        <Input id="alt-text" placeholder="Alternative text" />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="p-4 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Custom CSS</h4>
                      <Textarea
                        placeholder=".element { /* custom styles */ }"
                        className="font-mono text-sm min-h-[150px]"
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Animations</h4>
                      <div className="space-y-2">
                        <Label htmlFor="animation-type">Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="fade">Fade</SelectItem>
                            <SelectItem value="slide">Slide</SelectItem>
                            <SelectItem value="zoom">Zoom</SelectItem>
                            <SelectItem value="bounce">Bounce</SelectItem>
                            <SelectItem value="flip">Flip</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="animation-duration">Duration</Label>
                          <span className="text-xs text-muted-foreground">0.3s</span>
                        </div>
                        <Slider defaultValue={[0.3]} min={0.1} max={2} step={0.1} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="animation-delay">Delay</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="0s" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0s</SelectItem>
                            <SelectItem value="0.2">0.2s</SelectItem>
                            <SelectItem value="0.5">0.5s</SelectItem>
                            <SelectItem value="1">1s</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Responsive Visibility</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            <Label htmlFor="visible-desktop">Desktop</Label>
                          </div>
                          <Switch id="visible-desktop" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TabletIcon className="h-4 w-4" />
                            <Label htmlFor="visible-tablet">Tablet</Label>
                          </div>
                          <Switch id="visible-tablet" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <SmartphoneIcon className="h-4 w-4" />
                            <Label htmlFor="visible-mobile">Mobile</Label>
                          </div>
                          <Switch id="visible-mobile" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Page Settings</h3>
              </div>

              <Tabs defaultValue="general" className="flex-1">
                <TabsList className="grid grid-cols-3 mx-4 mt-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <TabsContent value="general" className="p-4 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Page Information</h4>
                      <div className="space-y-2">
                        <Label htmlFor="page-title">Page Title</Label>
                        <Input id="page-title" defaultValue="Home" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="page-url">URL Slug</Label>
                        <div className="flex">
                          <div className="bg-slate-100 border border-r-0 rounded-l-md px-3 py-2 text-sm text-muted-foreground">
                            storei.com/
                          </div>
                          <Input id="page-url" defaultValue="home" className="rounded-l-none" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Page Background</h4>
                      <div className="space-y-2">
                        <Label htmlFor="bg-color">Background Color</Label>
                        <div className="flex gap-2">
                          <div className="h-8 w-8 rounded-md bg-white border"></div>
                          <Input id="bg-color" defaultValue="#FFFFFF" className="flex-1" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bg-image">Background Image</Label>
                        <div className="border border-dashed rounded-md p-4 text-center">
                          <Button variant="outline" size="sm">
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Responsive Breakpoints</h4>
                      {breakpoints.map((breakpoint, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{breakpoint.name}</p>
                            <p className="text-sm text-muted-foreground">{breakpoint.width}px</p>
                          </div>
                          <Switch
                            checked={breakpoint.active}
                            onCheckedChange={(checked) => {
                              const newBreakpoints = [...breakpoints]
                              newBreakpoints[index].active = checked
                              setBreakpoints(newBreakpoints)
                            }}
                          />
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Custom Breakpoint
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="p-4 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">SEO Score</h4>
                        <Badge
                          className={
                            seoScore >= 80 ? "bg-emerald-500" : seoScore >= 60 ? "bg-amber-500" : "bg-rose-500"
                          }
                        >
                          {seoScore}/100
                        </Badge>
                      </div>
                      <Progress value={seoScore} className="h-2" />

                      <div className="space-y-2 mt-4">
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
                              {suggestion.type === "success" && (
                                <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                              )}
                              {suggestion.type === "info" && <InfoIcon className="h-4 w-4 text-blue-500" />}
                              <span className="text-sm">{suggestion.message}</span>
                            </div>
                            {!suggestion.fixed && (
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                Fix
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">SEO Settings</h4>
                      <div className="space-y-2">
                        <Label htmlFor="meta-title">Meta Title</Label>
                        <Input id="meta-title" defaultValue="Home | Storei" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="meta-description">Meta Description</Label>
                        <Textarea
                          id="meta-description"
                          placeholder="Enter a description for search engines..."
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="meta-keywords">Meta Keywords</Label>
                        <Input id="meta-keywords" placeholder="e-commerce, shop, products" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Social Sharing</h4>
                      <div className="space-y-2">
                        <Label htmlFor="og-title">Open Graph Title</Label>
                        <Input id="og-title" defaultValue="Home | Storei" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="og-description">Open Graph Description</Label>
                        <Textarea
                          id="og-description"
                          placeholder="Enter a description for social media..."
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="og-image">Open Graph Image</Label>
                        <div className="border border-dashed rounded-md p-4 text-center">
                          <Button variant="outline" size="sm">
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="p-4 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Page Settings</h4>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="page-visibility">Page Visibility</Label>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Published" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="password-protection" className="block">
                            Password Protection
                          </Label>
                          <p className="text-xs text-muted-foreground">Require a password to view this page</p>
                        </div>
                        <Switch id="password-protection" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Advanced</h4>
                      <div className="space-y-2">
                        <Label htmlFor="custom-css">Custom CSS</Label>
                        <Textarea
                          id="custom-css"
                          placeholder="Add custom CSS for this page..."
                          className="font-mono text-sm min-h-[150px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="custom-js">Custom JavaScript</Label>
                        <Textarea
                          id="custom-js"
                          placeholder="Add custom JavaScript for this page..."
                          className="font-mono text-sm min-h-[150px]"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="border-t bg-white h-8 px-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Page:</span>
            <span className="font-medium">{currentPage}</span>
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

      {/* Collaboration Panel */}
      {showCollaborationPanel && (
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
              <div className="border rounded-md p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Sophie Martin" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium">Sophie Martin</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </div>
                <p className="text-sm">Can we make the hero section text larger on mobile?</p>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Reply
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Thomas Dubois" />
                    <AvatarFallback>TD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium">Thomas Dubois</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                <p className="text-sm">The product grid needs to be 4 columns on desktop.</p>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Reply
                  </Button>
                </div>
              </div>

              <div className="mt-2">
                <Textarea placeholder="Add a comment..." className="text-sm min-h-[80px]" />
                <div className="flex justify-end mt-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO Panel */}
      {showSeoPanel && (
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
                        {suggestion.type === "success" && <CheckCircleIcon className="h-4 w-4 text-emerald-500" />}
                        {suggestion.type === "info" && <InfoIcon className="h-4 w-4 text-blue-500" />}
                        <span className="text-sm">{suggestion.message}</span>
                      </div>
                      {!suggestion.fixed && (
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
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
              <h4 className="text-sm font-medium">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-slate-50">
                  e-commerce
                </Badge>
                <Badge variant="outline" className="bg-slate-50">
                  online store
                </Badge>
                <Badge variant="outline" className="bg-slate-50">
                  products
                </Badge>
                <Badge variant="outline" className="bg-slate-50">
                  shopping
                </Badge>
                <Badge variant="outline" className="bg-slate-50 flex items-center gap-1">
                  <Plus className="h-3 w-3" />
                  Add
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Preview</h4>
              <div className="border rounded-md p-3 bg-slate-50">
                <p className="text-blue-600 text-sm font-medium">Home | Storei</p>
                <p className="text-green-700 text-xs">https://storei.com/</p>
                <p className="text-sm text-slate-700 mt-1">
                  Storei - Your one-stop shop for all your needs. Browse our wide selection of products.
                </p>
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Optimize Automatically
            </Button>
          </div>
        </div>
      )}

      {/* Code Editor Panel */}
      {showCodeEditor && (
        <div className="fixed right-0 top-[9.5rem] w-[500px] h-[calc(100vh-9.5rem)] bg-white border-l shadow-lg z-40 animate-in slide-in-from-right">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              Custom Code
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setShowCodeEditor(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <Tabs defaultValue="html">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="mt-4">
                <div className="space-y-2">
                  <Label>Custom HTML</Label>
                  <Textarea className="font-mono text-sm min-h-[300px]" placeholder="<!-- Add custom HTML here -->" />
                  <p className="text-xs text-muted-foreground">
                    This HTML will be added to the &lt;head&gt; section of your page.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="css" className="mt-4">
                <div className="space-y-2">
                  <Label>Custom CSS</Label>
                  <Textarea className="font-mono text-sm min-h-[300px]" placeholder="/* Add custom CSS here */" />
                  <p className="text-xs text-muted-foreground">
                    This CSS will override the default styles of your page.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="js" className="mt-4">
                <div className="space-y-2">
                  <Label>Custom JavaScript</Label>
                  <Textarea className="font-mono text-sm min-h-[300px]" placeholder="// Add custom JavaScript here" />
                  <p className="text-xs text-muted-foreground">This JavaScript will be executed when the page loads.</p>
                </div>
              </TabsContent>
            </Tabs>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Code Snippets</h4>
              <Accordion type="single" collapsible className="w-full">
                {codeSnippets.map((snippet) => (
                  <AccordionItem key={snippet.id} value={`snippet-${snippet.id}`}>
                    <AccordionTrigger className="text-sm">{snippet.name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-slate-50 p-2 rounded-md font-mono text-xs overflow-x-auto">
                        <pre>{snippet.code}</pre>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        Insert Snippet
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Validate Code</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Apply Changes</Button>
            </div>
          </div>
        </div>
      )}

      {/* Page Manager Dialog */}
      <Dialog open={showPageManager} onOpenChange={setShowPageManager}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Page Manager</DialogTitle>
            <DialogDescription>Manage your website pages and navigation structure.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <Input placeholder="Search pages..." className="w-[300px]" />
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  const pageName = prompt("Enter page name:")
                  const pageUrl = prompt("Enter page URL (e.g., /about):")
                  if (pageName && pageUrl) {
                    addNewPage(pageName, pageUrl)
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Page
              </Button>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Elements</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {websiteStructure.pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.name}</TableCell>
                      <TableCell>{page.url}</TableCell>
                      <TableCell>{page.elements.length}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => switchPage(page.id)}>
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-rose-500"
                            onClick={() => {
                              if (websiteStructure.pages.length > 1) {
                                const updatedPages = websiteStructure.pages.filter((p) => p.id !== page.id)
                                setWebsiteStructure({
                                  ...websiteStructure,
                                  pages: updatedPages,
                                  currentPageId: updatedPages[0].id,
                                })
                                setCurrentPage(updatedPages[0].name)
                              } else {
                                alert("You cannot delete the last page.")
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Navigation Structure</h4>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Grip className="h-4 w-4 text-slate-400" />
                        <span>Home</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Grip className="h-4 w-4 text-slate-400" />
                        <span>About</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Grip className="h-4 w-4 text-slate-400" />
                        <span>Products</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="ml-6">
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <Grip className="h-4 w-4 text-slate-400" />
                          <span>Category 1</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Grip className="h-4 w-4 text-slate-400" />
                        <span>Contact</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Menu Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPageManager(false)}>
              Cancel
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowPageManager(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Import missing components
function Play(props) {
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
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function AlignCenter(props) {
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
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="17" x2="7" y1="12" y2="12" />
      <line x1="19" x2="5" y1="18" y2="18" />
    </svg>
  )
}

function AlignRight(props) {
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
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="21" x2="9" y1="12" y2="12" />
      <line x1="21" x2="7" y1="18" y2="18" />
    </svg>
  )
}

function AlignJustify(props) {
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
      <line x1="3" x2="21" y1="6" y2="6" />
      <line x1="3" x2="21" y1="12" y2="12" />
      <line x1="3" x2="21" y1="18" y2="18" />
    </svg>
  )
}
