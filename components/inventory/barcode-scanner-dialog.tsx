"use client"
import { QrCode, RefreshCw, Camera, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useBarcodeScanner } from "@/hooks/use-barcode-scanner"

interface BarcodeScannerDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function BarcodeScannerDialog({ isOpen, onOpenChange }: BarcodeScannerDialogProps) {
  const { isScanning, scanSuccess, scannedProduct, startScanner } = useBarcodeScanner()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
          <QrCode className="h-4 w-4" />
          Scanner
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Scanner un code-barres</DialogTitle>
          <DialogDescription>Scannez le code-barres d'un produit pour l'ajouter au panier.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
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
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex gap-2">
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={startScanner} disabled={isScanning}>
                  <QrCode className="h-4 w-4 mr-2" />
                  {isScanning ? "Scan en cours..." : "Scanner"}
                </Button>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Changer de caméra
                </Button>
              </div>

              {scannedProduct && <ScannedProductCard product={scannedProduct} />}
            </div>
          </div>
        </div>
        <DialogFooter>
          {scannedProduct && (
            <Button className="bg-emerald-600 hover:bg-emerald-700 mr-auto">Modifier ce produit</Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ScannedProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 w-full mt-4">
      <h3 className="font-semibold mb-2">Produit identifié:</h3>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded bg-slate-200 flex items-center justify-center">
          <Package className="h-5 w-5 text-slate-500" />
        </div>
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-muted-foreground">Prix: {product.price.toFixed(2)} TND</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div>
          <p className="text-sm text-muted-foreground">Stock:</p>
          <p className="text-sm">{product.stock} unités</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Statut:</p>
          <p className="text-sm">
            {product.stock > 10 ? (
              <span className="text-emerald-600">En stock</span>
            ) : product.stock > 0 ? (
              <span className="text-amber-600">Stock faible</span>
            ) : (
              <span className="text-rose-600">Rupture</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

// Import missing component
import { Package } from "lucide-react"
