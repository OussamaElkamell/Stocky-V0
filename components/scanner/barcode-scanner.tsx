"use client"

import { useRef } from "react"
import { Camera, CheckIcon, QrCode, RefreshCw, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BarcodeScannerProps {
  onScan: (data: any) => void
  isScanning: boolean
  setIsScanning: (isScanning: boolean) => void
  scanSuccess: boolean
  setScanSuccess: (success: boolean) => void
  scannedData?: any
}

export function BarcodeScanner({
  onScan,
  isScanning,
  setIsScanning,
  scanSuccess,
  setScanSuccess,
  scannedData,
}: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleScan = () => {
    setIsScanning(true)

    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false)
      setScanSuccess(true)

      // In a real implementation, this would be the scanned data
      onScan({ success: true })

      // Reset success state after a delay
      setTimeout(() => {
        setScanSuccess(false)
      }, 3000)
    }, 2000)
  }

  return (
    <div className="border rounded-lg p-6 bg-slate-50 flex flex-col items-center">
      <div className="relative w-full aspect-video max-w-md bg-black rounded-lg overflow-hidden mb-4">
        {isScanning ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="h-10 w-10 text-white animate-spin" />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="h-16 w-16 text-white/30" />
            </div>
            {scanSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20">
                <div className="bg-white p-3 rounded-lg">
                  <CheckIcon className="h-10 w-10 text-emerald-500" />
                </div>
              </div>
            )}
          </>
        )}
        <div className="absolute inset-x-0 top-1/2 border-2 border-emerald-500 transform -translate-y-1/2"></div>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ display: "none" }} // Hidden in this demo
        />
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex gap-2">
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleScan} disabled={isScanning}>
            <QrCode className="h-4 w-4 mr-2" />
            {isScanning ? "Scan en cours..." : "Scanner"}
          </Button>
          <Button variant="outline">
            <Smartphone className="h-4 w-4 mr-2" />
            Changer de caméra
          </Button>
        </div>

        {scannedData && (
          <div className="border rounded-lg p-4 w-full mt-4">
            <h3 className="font-semibold mb-2">Produit identifié:</h3>
            {/* Render scanned data here */}
          </div>
        )}
      </div>
    </div>
  )
}
