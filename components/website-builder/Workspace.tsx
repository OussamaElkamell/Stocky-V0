"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { useWebsiteBuilder } from "@/contexts/WebsiteBuilderContext"
import { Plus, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createNewElement } from "@/utils/element-utils"

export const Workspace = () => {
  const {
    state,
    dispatch,
    selectedElement,
    setSelectedElement,
    activeDevice,
    dropIndicator,
    setDropIndicator,
    showTemplateModal,
    setShowTemplateModal,
  } = useWebsiteBuilder()
  const workspaceRef = useRef<HTMLDivElement>(null)

  const [draggingElementId, setDraggingElementId] = useState<string | null>(null)
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const currentPage = state.websiteStructure.pages.find(
    (page) => page.id === state.websiteStructure.currentPageId
  )

  const handleElementSelect = (elementId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedElement(elementId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (workspaceRef.current) {
      const rect = workspaceRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setDropIndicator({ x, y, visible: true })
    }
  }

  const handleDragLeave = () => {
    setDropIndicator({ x: 0, y: 0, visible: false })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const componentType = e.dataTransfer.getData("componentType")

    if (workspaceRef.current) {
      const rect = workspaceRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newElement = createNewElement(componentType, { x, y })

      dispatch({
        type: "ADD_ELEMENT",
        payload: { element: newElement },
      })
      setSelectedElement(newElement.id)
    }

    setDropIndicator({ x: 0, y: 0, visible: false })
  }

  // === Reposition logic ===
  const handleMouseDown = (
    e: React.MouseEvent,
    elementId: string,
    element: any
  ) => {
    e.stopPropagation()
    setSelectedElement(elementId)
    setDraggingElementId(elementId)

    const elementX = element.position?.x || 0
    const elementY = element.position?.y || 0

    const offsetX = e.clientX - elementX - (workspaceRef.current?.getBoundingClientRect().left || 0)
    const offsetY = e.clientY - elementY - (workspaceRef.current?.getBoundingClientRect().top || 0)

    setOffset({ x: offsetX, y: offsetY })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingElementId || !workspaceRef.current) return

    const rect = workspaceRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - offset.x
    const y = e.clientY - rect.top - offset.y

    dispatch({
      type: "MOVE_ELEMENT",
      payload: {
        elementId: draggingElementId,
        position: { x, y },
      },
    })
  }

  const handleMouseUp = () => {
    if (draggingElementId) {
      setDraggingElementId(null)
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  })

  const renderElement = (element: any) => {
    const isSelected = selectedElement === element.id
    const style = {
      ...element.style,
      position: "absolute",
      left: `${element.position?.x || 0}px`,
      top: `${element.position?.y || 0}px`,
    }

    const elementProps = {
      key: element.id,
      className: `${isSelected ? "border-2 border-blue-500" : "border border-slate-200 hover:border-slate-300"}`,
      onClick: (e: React.MouseEvent) => handleElementSelect(element.id, e),
      onMouseDown: (e: React.MouseEvent) => handleMouseDown(e, element.id, element),
      style,
    }

    const renderContent = () => {
      switch (element.type) {
        case "heading":
          return <h1>{element.content}</h1>
        case "text":
          return <p>{element.content}</p>
        case "button":
          return <button className="px-4 py-2 rounded-md">{element.content}</button>
        case "image":
          return (
            <img
              src={element.content || "/placeholder.svg"}
              alt={element.settings?.altText || "Image"}
              className="max-w-full"
            />
          )
        case "container":
          return <div>{element.children?.map((child: any) => renderElement(child))}</div>
        case "divider":
          return <hr />
        case "list":
          return (
            <ul>
              {element.content.split("\n").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )
        case "video":
          return <iframe src={element.content} title="Video" frameBorder="0" allowFullScreen />
        case "form":
          return (
            <form>
              {element.content.split("\n").map((field: string, index: number) => (
                <div key={index} className="mb-4">
                  <label className="block mb-2">{field}</label>
                  <input type="text" className="w-full p-2 border rounded" placeholder={field} />
                </div>
              ))}
              <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
          )
        case "icon":
          return <div>⭐</div>
        default:
          return null
      }
    }

    return <div {...elementProps}>{renderContent()}</div>
  }

  return (
    <div
      className="flex-1 bg-slate-100 overflow-auto relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      ref={workspaceRef}
      onClick={() => setSelectedElement(null)}
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
        {dropIndicator.visible && (
          <div
            className="absolute border-2 border-blue-500 rounded-md bg-blue-50 bg-opacity-30 z-10"
            style={{
              left: dropIndicator.x - 50,
              top: dropIndicator.y - 25,
              width: "100px",
              height: "50px",
              pointerEvents: "none",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Plus className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        )}

        {currentPage && currentPage.elements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center p-6">
            <LayoutGrid className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">Start Building Your Page</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Drag components from the left sidebar into this area or choose a template to get started quickly.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowTemplateModal(true)}>Choose Template</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 relative">
            {currentPage?.elements.map(renderElement)}
          </div>
        )}
      </div>
    </div>
  )
}
