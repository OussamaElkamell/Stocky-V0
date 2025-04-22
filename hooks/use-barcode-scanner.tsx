"use client"

import { useState } from "react"

export function useBarcodeScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanSuccess, setScanSuccess] = useState(false)
  const [scannedProduct, setScannedProduct] = useState<any>(null)

  // Sample products that could be scanned
  const sampleProducts = [
    {
      id: "PROD-1234",
      name: "T-shirt Premium",
      price: 39.5,
      stock: 45,
    },
    {
      id: "PROD-5678",
      name: "Casquette Logo",
      price: 19.99,
      stock: 8,
    },
    {
      id: "PROD-9012",
      name: "Chaussettes Sport",
      price: 12.5,
      stock: 3,
    },
    {
      id: "PROD-3456",
      name: "Sac à dos",
      price: 49.99,
      stock: 15,
    },
    {
      id: "PROD-7890",
      name: "Gourde isotherme",
      price: 24.95,
      stock: 20,
    },
  ]

  // Simulate scanning a barcode
  const startScanner = () => {
    setIsScanning(true)
    setScanSuccess(false)
    setScannedProduct(null)

    // Simulate a delay in scanning
    setTimeout(() => {
      // Randomly pick a product from the sample list
      const randomIndex = Math.floor(Math.random() * sampleProducts.length)
      const product = sampleProducts[randomIndex]

      setScannedProduct(product)
      setScanSuccess(true)

      // After a moment, end the scanning state
      setTimeout(() => {
        setIsScanning(false)
      }, 500)
    }, 2000)
  }

  return {
    isScanning,
    scanSuccess,
    scannedProduct,
    startScanner,
  }
}
