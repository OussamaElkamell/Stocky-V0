"use client"
import { WebsiteBuilderProvider } from "@/contexts/WebsiteBuilderContext"
import { ComponentSidebar } from "@/components/website-builder/ComponentSidebar"
import { PropertiesPanel } from "@/components/website-builder/PropertiesPanel"
import { Workspace } from "@/components/website-builder/Workspace"
import { Toolbar } from "@/components/website-builder/Toolbar"
import { StatusBar } from "@/components/website-builder/StatusBar"
import { SeoPanel } from "@/components/website-builder/SeoPanel"
import { CodeEditor } from "@/components/website-builder/CodeEditor"
import { CollaborationPanel } from "@/components/website-builder/CollaborationPanel"
import { PageManager } from "@/components/website-builder/PageManager"

export default function WebsiteBuilderPage() {
  return (
    <WebsiteBuilderProvider>
      <div className="flex flex-col h-screen bg-background">
        <Toolbar />
        <div className="flex flex-1 overflow-hidden">
          <ComponentSidebar />
          <Workspace />
          <PropertiesPanel />
        </div>
        <StatusBar />
        <SeoPanel />
        <CodeEditor />
        <CollaborationPanel />
        <PageManager />
      </div>
    </WebsiteBuilderProvider>
  )
}
