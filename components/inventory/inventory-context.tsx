"use client"

import type React from "react"

import { createContext, useState, useContext, type ReactNode } from "react"

// Types
interface InventoryItem {
  id: number
  name: string
  sku: string
  category: string
  quantity: number
  status: string
  lastUpdated: string
}

interface InventoryContextType {
  inventoryItems: InventoryItem[]
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

export const useInventory = () => {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error("useInventory must be used within a InventoryProvider")
  }
  return context
}

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])

  const value: InventoryContextType = {
    inventoryItems,
    setInventoryItems,
  }

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}
