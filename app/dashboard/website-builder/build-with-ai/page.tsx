"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Sparkles,
  Plus,
  Layout,
  ImageIcon,
  Type,
  MessageSquare,
  Layers,
  ShoppingBag,
  Users,
  Mail,
  ExternalLink,
  Code,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function BuildWithAI() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false)
      setShowSuggestions(true)
    }, 1500)
  }

  // Sample section suggestions
  const sectionSuggestions = [
    {
      id: 1,
      title: "Hero Section",
      description:
        "A bold, attention-grabbing hero section with a compelling headline, subtext, and call-to-action buttons.",
      icon: <Layout className="h-10 w-10 text-emerald-500" />,
    },
    {
      id: 2,
      title: "Product Showcase",
      description:
        "Display your featured products in an elegant grid with images, titles, prices, and quick-add buttons.",
      icon: <ShoppingBag className="h-10 w-10 text-emerald-500" />,
    },
    {
      id: 3,
      title: "Features Section",
      description: "Highlight your key features with icons, titles, and descriptions in a clean, organized layout.",
      icon: <Layers className="h-10 w-10 text-emerald-500" />,
    },
    {
      id: 4,
      title: "Testimonials",
      description: "Build trust with customer testimonials featuring quotes, ratings, and profile images.",
      icon: <Users className="h-10 w-10 text-emerald-500" />,
    },
    {
      id: 5,
      title: "Image Gallery",
      description: "Showcase your work or products with a responsive, filterable image gallery with lightbox support.",
      icon: <ImageIcon className="h-10 w-10 text-emerald-500" />,
    },
    {
      id: 6,
      title: "Contact Form",
      description:
        "Add a user-friendly contact form with input validation and customizable fields for customer inquiries.",
      icon: <Mail className="h-10 w-10 text-emerald-500" />,
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Link href="/dashboard/website-builder" className="flex items-center hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Website Builder
        </Link>
      </div>

      <PageHeader
        title="Build with AI"
        description="Describe your website idea and let AI suggest sections for your website"
      />

      <Tabs defaultValue="storei" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="storei">StoreI AI</TabsTrigger>
          <TabsTrigger value="v0dev">
            <div className="flex items-center">
              v0.dev
              <Badge variant="outline" className="ml-2 bg-black text-white border-none">
                Powered by Vercel
              </Badge>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="storei" className="mt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Describe your website idea in detail. For example: 'I need an e-commerce website for my handmade jewelry business with a modern, minimalist design. I want to showcase my products, share my story, and make it easy for customers to contact me.'"
              className="min-h-[150px] text-base"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <Button
              onClick={handleGenerate}
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={isGenerating || !prompt.trim()}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating Suggestions..." : "Generate Suggestions"}
            </Button>
          </div>

          {showSuggestions && (
            <div className="mt-10 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Suggested Sections</h2>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate More
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sectionSuggestions.map((section) => (
                  <Card key={section.id} className="border hover:border-emerald-500/50 hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="mb-2">{section.icon}</div>
                      <CardTitle>{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground">{section.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Website
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Card className="border border-dashed border-muted-foreground/20 bg-muted/50 w-full max-w-md">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium mb-1">Need something specific?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Refine your prompt to get more tailored section suggestions for your website.
                    </p>
                    <Button variant="outline" className="mt-2">
                      <Type className="h-4 w-4 mr-2" />
                      Refine Prompt
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="v0dev" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-black rounded-md p-1.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path d="M24 12L18.3 17.7V6.3L24 12Z" fill="currentColor" />
                        <path d="M6.3 17.7V6.3L0.6 12L6.3 17.7Z" fill="currentColor" />
                        <path d="M12.3 17.7V6.3L6.6 12L12.3 17.7Z" fill="currentColor" />
                        <path d="M18.3 17.7V6.3L12.6 12L18.3 17.7Z" fill="currentColor" />
                      </svg>
                    </div>
                    <CardTitle>v0.dev by Vercel</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-black text-white border-none">
                    AI-Powered
                  </Badge>
                </div>
                <CardDescription>
                  Generate custom UI components and entire website sections with AI. Powered by Vercel&apos;s v0.dev.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src="https://sjc.microlink.io/TPcG3OwKlSO50XHsahQspilnt5zDsuYhAWTLbC9K8Swhn6vvw_Lp073ajZgcHXBYB2F6nE4GpCmpRwd6FknOwA.jpeg"
                    alt="v0.dev interface"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-1">AI-Powered Design</h3>
                      <p className="text-sm opacity-90">
                        Describe what you want and v0 will generate production-ready code
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="v0-prompt" className="text-sm font-medium">
                      Describe what you want to build
                    </label>
                    <Textarea
                      id="v0-prompt"
                      placeholder="E.g., 'A hero section for a jewelry store with a large product image, heading, and shop now button'"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      Hero Section
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Product Grid
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Testimonials
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Contact Form
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Features List
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="flex w-full gap-2">
                  <Button className="flex-1 bg-black hover:bg-black/80 text-white">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate with v0
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://v0.dev" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open v0.dev
                    </a>
                  </Button>
                </div>
                <div className="w-full text-xs text-muted-foreground text-center">
                  Generated components can be directly imported into your website
                </div>
              </CardFooter>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-emerald-500" />
                    Ready-to-use Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Browse a library of pre-built components generated by v0.dev that you can instantly add to your
                    website.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Browse Component Library
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layout className="h-5 w-5 mr-2 text-emerald-500" />
                    Recent Generations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View your recently generated components and sections. Quickly reuse or modify them for your website.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View History
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
