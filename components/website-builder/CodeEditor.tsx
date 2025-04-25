"use client"

import React, { useState } from "react"
import { useWebsiteBuilder } from "@/contexts/WebsiteBuilderContext"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { X, FileCode } from "lucide-react"

// Code snippets data
const codeSnippets = [
  {
    id: 1,
    name: "Responsive Grid Layout",
    code: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
}`,
  },
  {
    id: 2,
    name: "Smooth Scroll",
    code: `html {
  scroll-behavior: smooth;
}`,
  },
  {
    id: 3,
    name: "Animated Button",
    code: `.button {
  transition: all 0.3s ease;
}
.button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}`,
  },
  {
    id: 4,
    name: "Dark Mode Toggle",
    code: `// Add this to your JavaScript
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}`,
  },
]

export const CodeEditor = () => {
  const { state, dispatch, showCodeEditor, setShowCodeEditor } = useWebsiteBuilder()
  const [customHTML, setCustomHTML] = useState("")
  const [customCSS, setCustomCSS] = useState("")
  const [customJS, setCustomJS] = useState("")

  // Get current page
  const currentPage = state.websiteStructure.pages.find((page) => page.id === state.websiteStructure.currentPageId)

  // Initialize code editor with current page settings
  React.useEffect(() => {
    if (currentPage) {
      setCustomCSS(currentPage.settings.customCSS || "")
      setCustomJS(currentPage.settings.customJS || "")
    }
  }, [currentPage])

  // Handle apply changes
  const handleApplyChanges = () => {
    if (currentPage) {
      dispatch({
        type: "UPDATE_PAGE",
        payload: {
          pageId: currentPage.id,
          updates: {
            settings: {
              ...currentPage.settings,
              customCSS,
              customJS,
            },
          },
        },
      })
    }
  }

  // Handle insert snippet
  const handleInsertSnippet = (code: string, type: "html" | "css" | "js") => {
    switch (type) {
      case "html":
        setCustomHTML(customHTML + code)
        break
      case "css":
        setCustomCSS(customCSS + code)
        break
      case "js":
        setCustomJS(customJS + code)
        break
    }
  }

  if (!showCodeEditor) return null

  return (
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
        <Tabs defaultValue="css">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="mt-4">
            <div className="space-y-2">
              <Label>Custom HTML</Label>
              <Textarea
                className="font-mono text-sm min-h-[300px]"
                placeholder="<!-- Add custom HTML here -->"
                value={customHTML}
                onChange={(e) => setCustomHTML(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This HTML will be added to the &lt;head&gt; section of your page.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="css" className="mt-4">
            <div className="space-y-2">
              <Label>Custom CSS</Label>
              <Textarea
                className="font-mono text-sm min-h-[300px]"
                placeholder="/* Add custom CSS here */"
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">This CSS will override the default styles of your page.</p>
            </div>
          </TabsContent>

          <TabsContent value="js" className="mt-4">
            <div className="space-y-2">
              <Label>Custom JavaScript</Label>
              <Textarea
                className="font-mono text-sm min-h-[300px]"
                placeholder="// Add custom JavaScript here"
                value={customJS}
                onChange={(e) => setCustomJS(e.target.value)}
              />
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
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        handleInsertSnippet(
                          snippet.code,
                          snippet.code.includes("<") ? "html" : snippet.code.includes("function") ? "js" : "css",
                        )
                      }
                    >
                      Insert Snippet
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Validate Code</Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleApplyChanges}>
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
