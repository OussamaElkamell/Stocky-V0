"use client"

import { useState, useEffect } from "react"
import { useWebsiteBuilder } from "@/contexts/WebsiteBuilderContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { X, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"
import { findElementById } from "@/utils/element-utils"

export const PropertiesPanel = () => {
  const { state, dispatch, selectedElement, setSelectedElement, showRightSidebar } = useWebsiteBuilder()
  const [linkUrl, setLinkUrl] = useState("")
  const [openInNewTab, setOpenInNewTab] = useState(false)
  const [textColor, setTextColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#FFFFFF")
  const [customCSS, setCustomCSS] = useState("")

  // Get the current page
  const currentPage = state.websiteStructure.pages.find((page) => page.id === state.websiteStructure.currentPageId)

  // Get the selected element
  const element = selectedElement && currentPage ? findElementById(currentPage.elements, selectedElement) : null

  // Update local state when selected element changes
  useEffect(() => {
    if (element) {
      setLinkUrl(element.linkUrl || "")
      setTextColor(element.style.color || "#000000")
      setBgColor(element.style.backgroundColor || "#FFFFFF")
      // Add more state updates as needed
    }
  }, [element])

  // Handle content update
  const handleContentUpdate = (content: string) => {
    if (selectedElement) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementId: selectedElement,
          updates: { content },
        },
      })
    }
  }

  // Handle style update
  const handleStyleUpdate = (style: Record<string, string>) => {
    if (selectedElement) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementId: selectedElement,
          updates: {
            style: {
              ...element?.style,
              ...style,
            },
          },
        },
      })
    }
  }

  // Handle link update
  const handleLinkUpdate = () => {
    if (selectedElement) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementId: selectedElement,
          updates: { linkUrl },
        },
      })
    }
  }

  // Apply text color
  const applyTextColor = (color: string) => {
    setTextColor(color)
    handleStyleUpdate({ color })
  }

  // Apply background color
  const applyBackgroundColor = (color: string) => {
    setBgColor(color)
    handleStyleUpdate({ backgroundColor: color })
  }

  // Handle element deletion
  const handleDeleteElement = () => {
    if (selectedElement) {
      dispatch({
        type: "DELETE_ELEMENT",
        payload: selectedElement,
      })
      setSelectedElement(null)
    }
  }

  // Handle element cloning
  const handleCloneElement = () => {
    if (selectedElement) {
      dispatch({
        type: "CLONE_ELEMENT",
        payload: selectedElement,
      })
    }
  }

  if (!selectedElement || !element) {
    return (
      <div
        className={`border-l bg-white w-80 flex-shrink-0 transition-all duration-300 ${
          showRightSidebar ? "translate-x-0" : "translate-x-full w-0"
        }`}
      >
        <div className="p-4 flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-muted-foreground">Select an element to edit its properties</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`border-l bg-white w-80 flex-shrink-0 transition-all duration-300 ${
        showRightSidebar ? "translate-x-0" : "translate-x-full w-0"
      }`}
    >
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
                    <Select
                      value={element.style.fontFamily || "Inter"}
                      onValueChange={(value) => handleStyleUpdate({ fontFamily: value })}
                    >
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
                    <Select
                      value={element.style.fontSize || "16px"}
                      onValueChange={(value) => handleStyleUpdate({ fontSize: value })}
                    >
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
                    <Select
                      value={element.style.fontWeight || "400"}
                      onValueChange={(value) => handleStyleUpdate({ fontWeight: value })}
                    >
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
                    <Select
                      value={element.style.lineHeight || "1.5"}
                      onValueChange={(value) => handleStyleUpdate({ lineHeight: value })}
                    >
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
                  <Button
                    variant={element.style.textAlign === "left" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleStyleUpdate({ textAlign: "left" })}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={element.style.textAlign === "center" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleStyleUpdate({ textAlign: "center" })}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={element.style.textAlign === "right" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleStyleUpdate({ textAlign: "right" })}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={element.style.textAlign === "justify" ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleStyleUpdate({ textAlign: "justify" })}
                  >
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
                          <div className="h-full w-full rounded-sm" style={{ backgroundColor: textColor }} />
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
                              onClick={() => applyTextColor(color)}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Input
                            id="text-color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="outline" size="sm" onClick={() => applyTextColor(textColor)}>
                            Apply
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input
                      id="text-color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bg-color">Background Color</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-10 p-0 h-8">
                          <div className="h-full w-full border rounded-sm" style={{ backgroundColor: bgColor }} />
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
                              onClick={() => applyBackgroundColor(color)}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Input
                            id="bg-color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="outline" size="sm" onClick={() => applyBackgroundColor(bgColor)}>
                            Apply
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input
                      id="bg-color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Spacing</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="padding">Padding</Label>
                    <span className="text-xs text-muted-foreground">{element.style.padding || "16px"}</span>
                  </div>
                  <Slider
                    defaultValue={[Number.parseInt(element.style.padding || "16")]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleStyleUpdate({ padding: `${value[0]}px` })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="margin">Margin</Label>
                    <span className="text-xs text-muted-foreground">{element.style.margin || "0px"}</span>
                  </div>
                  <Slider
                    defaultValue={[Number.parseInt(element.style.margin || "0")]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleStyleUpdate({ margin: `${value[0]}px` })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Border</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="border-width">Width</Label>
                    <Select
                      value={element.style.borderWidth || "0px"}
                      onValueChange={(value) => handleStyleUpdate({ borderWidth: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="0px" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0px">0px</SelectItem>
                        <SelectItem value="1px">1px</SelectItem>
                        <SelectItem value="2px">2px</SelectItem>
                        <SelectItem value="4px">4px</SelectItem>
                        <SelectItem value="8px">8px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="border-radius">Radius</Label>
                    <Select
                      value={element.style.borderRadius || "4px"}
                      onValueChange={(value) => handleStyleUpdate({ borderRadius: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="4px" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0px">0px</SelectItem>
                        <SelectItem value="2px">2px</SelectItem>
                        <SelectItem value="4px">4px</SelectItem>
                        <SelectItem value="8px">8px</SelectItem>
                        <SelectItem value="16px">16px</SelectItem>
                        <SelectItem value="9999px">Full</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="border-color">Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="h-8 w-8 rounded-md border"
                      style={{ backgroundColor: element.style.borderColor || "#E2E8F0" }}
                    ></div>
                    <Input
                      id="border-color"
                      value={element.style.borderColor || "#E2E8F0"}
                      onChange={(e) => handleStyleUpdate({ borderColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="p-4 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Text Content</h4>
                {element && (
                  <Textarea
                    placeholder="Enter text content here..."
                    value={element.content || ""}
                    onChange={(e) => handleContentUpdate(e.target.value)}
                    className="min-h-[100px]"
                  />
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Link</h4>
                <div className="space-y-2">
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="open-new-tab" checked={openInNewTab} onCheckedChange={setOpenInNewTab} />
                  <Label htmlFor="open-new-tab">Open in new tab</Label>
                </div>
                <Button onClick={handleLinkUpdate}>Apply Link</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Accessibility</h4>
                <div className="space-y-2">
                  <Label htmlFor="aria-label">ARIA Label</Label>
                  <Input
                    id="aria-label"
                    placeholder="Description for screen readers"
                    value={element.settings?.ariaLabel || ""}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_ELEMENT",
                        payload: {
                          elementId: selectedElement,
                          updates: {
                            settings: {
                              ...element.settings,
                              ariaLabel: e.target.value,
                            },
                          },
                        },
                      })
                    }
                  />
                </div>
                {element.type === "image" && (
                  <div className="space-y-2">
                    <Label htmlFor="alt-text">Alt Text (for images)</Label>
                    <Input
                      id="alt-text"
                      placeholder="Alternative text"
                      value={element.settings?.altText || ""}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_ELEMENT",
                          payload: {
                            elementId: selectedElement,
                            updates: {
                              settings: {
                                ...element.settings,
                                altText: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="p-4 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Custom CSS</h4>
                <Textarea
                  placeholder=".element { /* custom styles */ }"
                  className="font-mono text-sm min-h-[150px]"
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                />
                <Button
                  onClick={() => {
                    // In a real app, you would parse the CSS and apply it
                    // For now, we'll just store it in the element settings
                    dispatch({
                      type: "UPDATE_ELEMENT",
                      payload: {
                        elementId: selectedElement,
                        updates: {
                          settings: {
                            ...element.settings,
                            customCSS,
                          },
                        },
                      },
                    })
                  }}
                >
                  Apply Custom CSS
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Element Actions</h4>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCloneElement}>
                    Clone Element
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteElement}>
                    Delete Element
                  </Button>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  )
}
