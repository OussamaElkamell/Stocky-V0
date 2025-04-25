"use client"

import type React from "react"
import { createContext, useContext, useReducer, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

// Types
export type ElementType =
  | "heading"
  | "text"
  | "button"
  | "image"
  | "container"
  | "divider"
  | "list"
  | "video"
  | "form"
  | "icon"

export interface ElementStyle {
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  color?: string
  backgroundColor?: string
  padding?: string
  margin?: string
  borderWidth?: string
  borderRadius?: string
  borderColor?: string
  textAlign?: "left" | "center" | "right" | "justify"
  width?: string
  height?: string
  display?: string
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
  opacity?: string
  boxShadow?: string
  transform?: string
  transition?: string
}

export interface Element {
  id: string
  type: ElementType
  content: string
  style: ElementStyle
  linkUrl?: string
  children?: Element[]
  parentId?: string
  position?: { x: number; y: number }
  settings?: Record<string, any>
}

export interface PageSettings {
  title: string
  metaDescription: string
  metaKeywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  customCSS?: string
  customJS?: string
  favicon?: string
  backgroundColor?: string
}

export interface Page {
  id: string
  name: string
  url: string
  elements: Element[]
  settings: PageSettings
}

export interface WebsiteStructure {
  pages: Page[]
  currentPageId: string
}

export interface HistoryState {
  websiteStructure: WebsiteStructure
  history: WebsiteStructure[]
  historyIndex: number
}

// Action types
type Action =
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "UPDATE_STRUCTURE"; payload: WebsiteStructure }
  | { type: "SET_SELECTED_ELEMENT"; payload: string | null }
  | { type: "ADD_ELEMENT"; payload: { element: Element; parentId?: string } }
  | { type: "UPDATE_ELEMENT"; payload: { elementId: string; updates: Partial<Element> } }
  | { type: "DELETE_ELEMENT"; payload: string }
  | { type: "MOVE_ELEMENT"; payload: { elementId: string; position: { x: number; y: number } } }
  | { type: "ADD_PAGE"; payload: Page }
  | { type: "UPDATE_PAGE"; payload: { pageId: string; updates: Partial<Page> } }
  | { type: "DELETE_PAGE"; payload: string }
  | { type: "SWITCH_PAGE"; payload: string }
  | { type: "CLONE_ELEMENT"; payload: string }
  | { type: "IMPORT_WEBSITE"; payload: WebsiteStructure }
  | { type: "APPLY_TEMPLATE"; payload: WebsiteStructure }

// Initial state
const initialPage: Page = {
  id: uuidv4(),
  name: "Home",
  url: "/",
  elements: [],
  settings: {
    title: "Home | My Website",
    metaDescription: "Welcome to my website built with the Website Builder.",
    backgroundColor: "#FFFFFF",
    customCSS: "",
    customJS: "",
  },
}

const initialWebsiteStructure: WebsiteStructure = {
  pages: [initialPage],
  currentPageId: initialPage.id,
}

const initialState: HistoryState = {
  websiteStructure: initialWebsiteStructure,
  history: [initialWebsiteStructure],
  historyIndex: 0,
}

// Reducer function
const websiteBuilderReducer = (state: HistoryState, action: Action): HistoryState => {
  switch (action.type) {
    case "UNDO": {
      if (state.historyIndex <= 0) return state
      return {
        ...state,
        websiteStructure: state.history[state.historyIndex - 1],
        historyIndex: state.historyIndex - 1,
      }
    }

    case "REDO": {
      if (state.historyIndex >= state.history.length - 1) return state
      return {
        ...state,
        websiteStructure: state.history[state.historyIndex + 1],
        historyIndex: state.historyIndex + 1,
      }
    }

    case "UPDATE_STRUCTURE": {
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), action.payload]
      return {
        ...state,
        websiteStructure: action.payload,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    case "ADD_ELEMENT": {
      const { element, parentId } = action.payload
      const updatedPages = state.websiteStructure.pages.map((page) => {
        if (page.id === state.websiteStructure.currentPageId) {
          if (parentId) {
            // Add as a child to a container element
            const updateElementWithChildren = (elements: Element[]): Element[] => {
              return elements.map((el) => {
                if (el.id === parentId) {
                  return {
                    ...el,
                    children: [...(el.children || []), { ...element, parentId }],
                  }
                }
                if (el.children && el.children.length > 0) {
                  return {
                    ...el,
                    children: updateElementWithChildren(el.children),
                  }
                }
                return el
              })
            }
            return {
              ...page,
              elements: updateElementWithChildren(page.elements),
            }
          } else {
            // Add as a top-level element
            return {
              ...page,
              elements: [...page.elements, element],
            }
          }
        }
        return page
      })

      const newStructure = {
        ...state.websiteStructure,
        pages: updatedPages,
      }

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newStructure]
      return {
        ...state,
        websiteStructure: newStructure,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    case "UPDATE_ELEMENT": {
      const { elementId, updates } = action.payload
      const updatedPages = state.websiteStructure.pages.map((page) => {
        if (page.id === state.websiteStructure.currentPageId) {
          const updateElementRecursive = (elements: Element[]): Element[] => {
            return elements.map((el) => {
              if (el.id === elementId) {
                return { ...el, ...updates }
              }
              if (el.children && el.children.length > 0) {
                return {
                  ...el,
                  children: updateElementRecursive(el.children),
                }
              }
              return el
            })
          }
          return {
            ...page,
            elements: updateElementRecursive(page.elements),
          }
        }
        return page
      })

      const newStructure = {
        ...state.websiteStructure,
        pages: updatedPages,
      }

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newStructure]
      return {
        ...state,
        websiteStructure: newStructure,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    case "DELETE_ELEMENT": {
      const elementId = action.payload
      const updatedPages = state.websiteStructure.pages.map((page) => {
        if (page.id === state.websiteStructure.currentPageId) {
          const deleteElementRecursive = (elements: Element[]): Element[] => {
            return elements
              .filter((el) => el.id !== elementId)
              .map((el) => {
                if (el.children && el.children.length > 0) {
                  return {
                    ...el,
                    children: deleteElementRecursive(el.children),
                  }
                }
                return el
              })
          }
          return {
            ...page,
            elements: deleteElementRecursive(page.elements),
          }
        }
        return page
      })

      const newStructure = {
        ...state.websiteStructure,
        pages: updatedPages,
      }

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newStructure]
      return {
        ...state,
        websiteStructure: newStructure,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    case "MOVE_ELEMENT": {
      const { elementId, position } = action.payload
      const updatedPages = state.websiteStructure.pages.map((page) => {
        if (page.id === state.websiteStructure.currentPageId) {
          const moveElementRecursive = (elements: Element[]): Element[] => {
            return elements.map((el) => {
              if (el.id === elementId) {
                return { ...el, position }
              }
              if (el.children && el.children.length > 0) {
                return {
                  ...el,
                  children: moveElementRecursive(el.children),
                }
              }
              return el
            })
          }
          return {
            ...page,
            elements: moveElementRecursive(page.elements),
          }
        }
        return page
      })

      const newStructure = {
        ...state.websiteStructure,
        pages: updatedPages,
      }

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newStructure]
      return {
        ...state,
        websiteStructure: newStructure,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    case "ADD_PAGE": {
      const newPage = action.payload
      const newStructure = {
        ...state.websiteStructure,
        pages: [...state.websiteStructure.pages, newPage],
        currentPageId: newPage.id,
      }

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newStructure]
      return {
        ...state,
        websiteStructure: newStructure,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    case "UPDATE_PAGE": {
      const { pageId, updates } = action.payload
      const updatedPages = state.websiteStructure.pages.map((page) => {
        if (page.id === pageId) {
          return { ...page, ...updates }
        }
        return page
      })

      const newStructure = {
        ...state.websiteStructure,
        pages: updatedPages,
      }

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newStructure]
      return {
        ...state,
        websiteStructure: newStructure,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    case "DELETE_PAGE": {
      const pageId = action.payload
      // Don't delete if it's the only page
      if (state.websiteStructure.pages.length <= 1) {
        return state
      }

      const updatedPages = state.websiteStructure.pages.filter((page) => page.id !== pageId)
      const newCurrentPageId =
        state.websiteStructure.currentPageId === pageId ? updatedPages[0].id : state.websiteStructure.currentPageId

      const newStructure = {
        ...state.websiteStructure,
        pages: updatedPages,
        currentPageId: newCurrentPageId,
      }

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newStructure]
      return {
        ...state,
        websiteStructure: newStructure,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    case "SWITCH_PAGE": {
      const newStructure = {
        ...state.websiteStructure,
        currentPageId: action.payload,
      }

      // Switching pages doesn't add to history
      return {
        ...state,
        websiteStructure: newStructure,
      }
    }

    case "CLONE_ELEMENT": {
      const elementId = action.payload
      let elementToClone: Element | null = null
      let parentId: string | undefined = undefined

      // Find the element to clone
      const findElementRecursive = (elements: Element[]): void => {
        for (const el of elements) {
          if (el.id === elementId) {
            elementToClone = { ...el }
            return
          }
          if (el.children && el.children.length > 0) {
            findElementRecursive(el.children)
            // If we found the element in children, set the parent ID
            if (elementToClone) {
              parentId = el.id
              return
            }
          }
        }
      }

      // Find the element in the current page
      const currentPage = state.websiteStructure.pages.find((page) => page.id === state.websiteStructure.currentPageId)
      if (currentPage) {
        findElementRecursive(currentPage.elements)
      }

      // If element not found, return current state
      if (!elementToClone) {
        return state
      }

      // Create a deep clone with new IDs
      const cloneWithNewIds = (element: Element): Element => {
        const newId = uuidv4()
        const newElement = {
          ...element,
          id: newId,
          position: element.position ? { x: element.position.x + 20, y: element.position.y + 20 } : undefined,
        }

        if (element.children && element.children.length > 0) {
          newElement.children = element.children.map((child) => cloneWithNewIds(child))
        }

        return newElement
      }

      const clonedElement = cloneWithNewIds(elementToClone)

      // Add the cloned element to the page
      const updatedPages = state.websiteStructure.pages.map((page) => {
        if (page.id === state.websiteStructure.currentPageId) {
          if (parentId) {
            // Add as a child to a container element
            const updateElementWithChildren = (elements: Element[]): Element[] => {
              return elements.map((el) => {
                if (el.id === parentId) {
                  return {
                    ...el,
                    children: [...(el.children || []), clonedElement],
                  }
                }
                if (el.children && el.children.length > 0) {
                  return {
                    ...el,
                    children: updateElementWithChildren(el.children),
                  }
                }
                return el
              })
            }
            return {
              ...page,
              elements: updateElementWithChildren(page.elements),
            }
          } else {
            // Add as a top-level element
            return {
              ...page,
              elements: [...page.elements, clonedElement],
            }
          }
        }
        return page
      })

      const newStructure = {
        ...state.websiteStructure,
        pages: updatedPages,
      }

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newStructure]
      return {
        ...state,
        websiteStructure: newStructure,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    case "IMPORT_WEBSITE": {
      const newStructure = action.payload
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newStructure]
      return {
        ...state,
        websiteStructure: newStructure,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    case "APPLY_TEMPLATE": {
      const templateStructure = action.payload
      // Keep the current page ID but replace the elements with the template's
      const currentPageId = state.websiteStructure.currentPageId
      const currentPage = state.websiteStructure.pages.find((page) => page.id === currentPageId)

      if (!currentPage) return state

      // Find the first page from the template
      const templatePage = templateStructure.pages[0]

      // Update the current page with template elements but keep the page metadata
      const updatedPages = state.websiteStructure.pages.map((page) => {
        if (page.id === currentPageId) {
          return {
            ...page,
            elements: templatePage.elements,
          }
        }
        return page
      })

      const newStructure = {
        ...state.websiteStructure,
        pages: updatedPages,
      }

      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newStructure]
      return {
        ...state,
        websiteStructure: newStructure,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }

    default:
      return state
  }
}

// Context
interface WebsiteBuilderContextType {
  state: HistoryState
  dispatch: React.Dispatch<Action>
  selectedElement: string | null
  setSelectedElement: (id: string | null) => void
  showLeftSidebar: boolean
  setShowLeftSidebar: (show: boolean) => void
  showRightSidebar: boolean
  setShowRightSidebar: (show: boolean) => void
  activeDevice: "desktop" | "tablet" | "mobile"
  setActiveDevice: (device: "desktop" | "tablet" | "mobile") => void
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
  draggedComponent: string | null
  setDraggedComponent: (component: string | null) => void
  dropIndicator: { x: number; y: number; visible: boolean }
  setDropIndicator: (indicator: { x: number; y: number; visible: boolean }) => void
  showTemplateModal: boolean
  setShowTemplateModal: (show: boolean) => void
  showPageManager: boolean
  setShowPageManager: (show: boolean) => void
  showSeoPanel: boolean
  setShowSeoPanel: (show: boolean) => void
  showCodeEditor: boolean
  setShowCodeEditor: (show: boolean) => void
  showCollaborationPanel: boolean
  setShowCollaborationPanel: (show: boolean) => void
  lastSaved: Date | null
  setLastSaved: (date: Date | null) => void
}

const WebsiteBuilderContext = createContext<WebsiteBuilderContextType | undefined>(undefined)

export const WebsiteBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(websiteBuilderReducer, initialState)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [showLeftSidebar, setShowLeftSidebar] = useState(true)
  const [showRightSidebar, setShowRightSidebar] = useState(true)
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isDragging, setIsDragging] = useState(false)
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null)
  const [dropIndicator, setDropIndicator] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  })
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showPageManager, setShowPageManager] = useState(false)
  const [showSeoPanel, setShowSeoPanel] = useState(false)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [showCollaborationPanel, setShowCollaborationPanel] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date())

  // Load from localStorage on initial render
  useEffect(() => {
    const savedWebsite = localStorage.getItem("websiteBuilder")
    if (savedWebsite) {
      try {
        const parsedWebsite = JSON.parse(savedWebsite) as WebsiteStructure
        dispatch({ type: "IMPORT_WEBSITE", payload: parsedWebsite })
      } catch (error) {
        console.error("Failed to parse saved website:", error)
      }
    }
  }, [])

  return (
    <WebsiteBuilderContext.Provider
      value={{
        state,
        dispatch,
        selectedElement,
        setSelectedElement,
        showLeftSidebar,
        setShowLeftSidebar,
        showRightSidebar,
        setShowRightSidebar,
        activeDevice,
        setActiveDevice,
        isDragging,
        setIsDragging,
        draggedComponent,
        setDraggedComponent,
        dropIndicator,
        setDropIndicator,
        showTemplateModal,
        setShowTemplateModal,
        showPageManager,
        setShowPageManager,
        showSeoPanel,
        setShowSeoPanel,
        showCodeEditor,
        setShowCodeEditor,
        showCollaborationPanel,
        setShowCollaborationPanel,
        lastSaved,
        setLastSaved,
      }}
    >
      {children}
    </WebsiteBuilderContext.Provider>
  )
}

export const useWebsiteBuilder = () => {
  const context = useContext(WebsiteBuilderContext)
  if (context === undefined) {
    throw new Error("useWebsiteBuilder must be used within a WebsiteBuilderProvider")
  }
  return context
}
