"use client"

import { useState } from "react"
import { useWebsiteBuilder } from "@/contexts/WebsiteBuilderContext"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { v4 as uuidv4 } from "uuid"
import { PencilIcon, Copy, Trash2, Grip, Plus, ArrowRight } from "lucide-react"

export const PageManager = () => {
  const { state, dispatch, showPageManager, setShowPageManager } = useWebsiteBuilder()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter pages based on search query
  const filteredPages = state.websiteStructure.pages.filter((page) =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle add new page
  const handleAddNewPage = () => {
    const pageName = prompt("Enter page name:")
    const pageUrl = prompt("Enter page URL (e.g., /about):")

    if (pageName && pageUrl) {
      const newPage = {
        id: uuidv4(),
        name: pageName,
        url: pageUrl.startsWith("/") ? pageUrl : `/${pageUrl}`,
        elements: [],
        settings: {
          title: `${pageName} | My Website`,
          metaDescription: `${pageName} page for my website.`,
          backgroundColor: "#FFFFFF",
          customCSS: "",
          customJS: "",
        },
      }

      dispatch({
        type: "ADD_PAGE",
        payload: newPage,
      })
    }
  }

  // Handle delete page
  const handleDeletePage = (pageId: string) => {
    if (state.websiteStructure.pages.length <= 1) {
      alert("You cannot delete the last page.")
      return
    }

    if (confirm("Are you sure you want to delete this page?")) {
      dispatch({
        type: "DELETE_PAGE",
        payload: pageId,
      })
    }
  }

  // Handle duplicate page
  const handleDuplicatePage = (pageId: string) => {
    const pageToDuplicate = state.websiteStructure.pages.find((page) => page.id === pageId)

    if (pageToDuplicate) {
      const newPage = {
        ...pageToDuplicate,
        id: uuidv4(),
        name: `${pageToDuplicate.name} (Copy)`,
        url: `${pageToDuplicate.url}-copy`,
      }

      dispatch({
        type: "ADD_PAGE",
        payload: newPage,
      })
    }
  }

  return (
    <Dialog open={showPageManager} onOpenChange={setShowPageManager}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Page Manager</DialogTitle>
          <DialogDescription>Manage your website pages and navigation structure.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <Input
              placeholder="Search pages..."
              className="w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddNewPage}>
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
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.name}</TableCell>
                    <TableCell>{page.url}</TableCell>
                    <TableCell>{page.elements.length}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            dispatch({ type: "SWITCH_PAGE", payload: page.id })
                            setShowPageManager(false)
                          }}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDuplicatePage(page.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-rose-500"
                          onClick={() => handleDeletePage(page.id)}
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

                  {filteredPages.slice(1).map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Grip className="h-4 w-4 text-slate-400" />
                        <span>{page.name}</span>
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
                  ))}

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
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowPageManager(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
