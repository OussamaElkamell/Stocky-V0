"use client"

import { useState } from "react"
import { Download, FileDown, QrCode, Barcode, RefreshCw, Copy, Scan } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"

export default function CodeGeneratorPage() {
  const [singleProductName, setSingleProductName] = useState("")
  const [singleProductCode, setSingleProductCode] = useState("")
  const [singleFormat, setSingleFormat] = useState("barcode")
  const [isGeneratingSingle, setIsGeneratingSingle] = useState(false)
  const [singleCodeGenerated, setSingleCodeGenerated] = useState(false)

  const [groupProducts, setGroupProducts] = useState("")
  const [groupFormat, setGroupFormat] = useState("barcode")
  const [isGeneratingGroup, setIsGeneratingGroup] = useState(false)
  const [groupCodesGenerated, setGroupCodesGenerated] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanMethod, setScanMethod] = useState("rfid") // "rfid" or "camera"

  // Mock function to generate a single code
  const generateSingleCode = () => {
    setIsGeneratingSingle(true)
    // Simulate API call or processing time
    setTimeout(() => {
      setSingleCodeGenerated(true)
      setIsGeneratingSingle(false)
    }, 800)
  }

  // Mock function to generate multiple codes
  const generateGroupCodes = () => {
    setIsGeneratingGroup(true)
    // Simulate API call or processing time
    setTimeout(() => {
      setGroupCodesGenerated(true)
      setIsGeneratingGroup(false)
    }, 1200)
  }

  // Mock function to simulate scanning
  const startScanning = () => {
    setIsScanning(true)

    // Simulate scanning products at intervals
    const mockProducts =
      scanMethod === "rfid"
        ? [
            "PROD-1234:T-shirt Premium",
            "PROD-5678:Casquette Logo",
            "PROD-9012:Chaussettes Sport",
            "PROD-3456:Veste Hiver",
            "PROD-7890:Pantalon Cargo",
          ]
        : ["PROD-2468:Sweat à Capuche", "PROD-1357:Jean Slim", "PROD-8642:Bonnet Hiver", "PROD-9753:Écharpe Laine"]

    let currentIndex = 0
    const scanInterval = setInterval(
      () => {
        if (currentIndex < mockProducts.length) {
          setGroupProducts((prev) => {
            const newValue = prev ? `${prev}\n${mockProducts[currentIndex]}` : mockProducts[currentIndex]
            return newValue
          })
          currentIndex++
        } else {
          clearInterval(scanInterval)
          setIsScanning(false)
        }
      },
      scanMethod === "rfid" ? 1200 : 2000,
    ) // Camera scanning is a bit slower
  }

  // Mock data for group products preview
  const groupProductsList = groupProducts.split("\n").filter((line) => line.trim() !== "")

  const headerActions = (
    <>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Copy className="h-4 w-4" />
        Copier le dernier
      </Button>
      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
        <Download className="h-4 w-4" />
        Télécharger tout
      </Button>
    </>
  )

  return (
    <PageLayout>
      <PageHeader
        title="Générateur de Codes"
        description="Générez des codes-barres ou QR codes pour vos produits"
        actions={headerActions}
      />

      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="single">Produit Unique</TabsTrigger>
          <TabsTrigger value="group">Groupe de Produits</TabsTrigger>
        </TabsList>

        {/* Single Product Tab */}
        <TabsContent value="single" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Générer un code pour un produit</CardTitle>
              <CardDescription>
                Entrez les informations du produit et choisissez le format de code souhaité.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Nom du produit</Label>
                  <Input
                    id="product-name"
                    placeholder="ex: T-shirt Premium"
                    value={singleProductName}
                    onChange={(e) => setSingleProductName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-code">Code du produit</Label>
                  <Input
                    id="product-code"
                    placeholder="ex: PROD-1234"
                    value={singleProductCode}
                    onChange={(e) => setSingleProductCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Format du code</Label>
                <RadioGroup
                  id="format"
                  className="flex space-x-4"
                  defaultValue="barcode"
                  value={singleFormat}
                  onValueChange={setSingleFormat}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="barcode" id="barcode" />
                    <Label htmlFor="barcode" className="flex items-center gap-1">
                      <Barcode className="h-4 w-4" /> Code-barres
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="qrcode" id="qrcode" />
                    <Label htmlFor="qrcode" className="flex items-center gap-1">
                      <QrCode className="h-4 w-4" /> QR Code
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                onClick={generateSingleCode}
                disabled={isGeneratingSingle || !singleProductName || !singleProductCode}
                className="w-full md:w-auto"
              >
                {isGeneratingSingle ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Génération...
                  </>
                ) : (
                  "Générer le Code"
                )}
              </Button>
            </CardContent>

            {singleCodeGenerated && (
              <CardFooter className="flex flex-col items-center space-y-4 pt-6">
                <div className="w-full max-w-xs bg-white p-4 rounded-lg border flex flex-col items-center">
                  {singleFormat === "barcode" ? (
                    <div className="h-20 w-full flex items-center justify-center">
                      <svg className="h-full w-full" viewBox="0 0 200 80">
                        <rect x="10" y="10" width="4" height="60" />
                        <rect x="18" y="10" width="2" height="60" />
                        <rect x="24" y="10" width="6" height="60" />
                        <rect x="34" y="10" width="2" height="60" />
                        <rect x="40" y="10" width="4" height="60" />
                        <rect x="48" y="10" width="6" height="60" />
                        <rect x="58" y="10" width="2" height="60" />
                        <rect x="64" y="10" width="4" height="60" />
                        <rect x="72" y="10" width="8" height="60" />
                        <rect x="84" y="10" width="4" height="60" />
                        <rect x="92" y="10" width="2" height="60" />
                        <rect x="98" y="10" width="6" height="60" />
                        <rect x="108" y="10" width="4" height="60" />
                        <rect x="116" y="10" width="2" height="60" />
                        <rect x="122" y="10" width="8" height="60" />
                        <rect x="134" y="10" width="4" height="60" />
                        <rect x="142" y="10" width="6" height="60" />
                        <rect x="152" y="10" width="2" height="60" />
                        <rect x="158" y="10" width="4" height="60" />
                        <rect x="166" y="10" width="2" height="60" />
                        <rect x="172" y="10" width="8" height="60" />
                        <rect x="184" y="10" width="4" height="60" />
                      </svg>
                    </div>
                  ) : (
                    <div className="h-40 w-40 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="h-full w-full">
                        <path d="M0,0 h100v100h-100z" fill="white" />
                        <path d="M10,10 h80v80h-80z" fill="black" />
                        <path d="M20,20 h60v60h-60z" fill="white" />
                        <path d="M30,30 h40v40h-40z" fill="black" />
                        <path d="M40,40 h20v20h-20z" fill="white" />
                      </svg>
                    </div>
                  )}
                  <div className="text-center mt-2">
                    <p className="font-medium">{singleProductName}</p>
                    <p className="text-sm text-muted-foreground">{singleProductCode}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    Copier
                  </Button>
                  <Button size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Télécharger PNG
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* Group Products Tab - UPDATED */}
        <TabsContent value="group" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Générer des codes pour plusieurs produits</CardTitle>
              <CardDescription>
                Scannez vos produits avec votre accessoire RFID/Code-barres pour générer des codes en lot.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <Scan className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  Scannez les produits à l'aide de votre accessoire RFID/Code-barres ou utilisez la caméra de votre
                  téléphone
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-between border rounded-md p-3 bg-muted/20">
                <div className="space-y-0.5">
                  <Label className="text-base">Méthode de scan</Label>
                  <p className="text-sm text-muted-foreground">Choisissez votre méthode de scan préférée</p>
                </div>
                <RadioGroup value={scanMethod} onValueChange={setScanMethod} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rfid" id="scan-rfid" />
                    <Label htmlFor="scan-rfid" className="flex items-center gap-1 cursor-pointer">
                      <Barcode className="h-4 w-4" /> Scanner RFID/Code-barres
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="camera" id="scan-camera" />
                    <Label htmlFor="scan-camera" className="flex items-center gap-1 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M15 8h.01" />
                        <rect width="16" height="12" x="4" y="6" rx="2" />
                        <path d="M4 18v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
                      </svg>{" "}
                      Caméra du téléphone
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="scanned-products">Produits scannés</Label>
                  <div className="flex items-center gap-2">
                    {isScanning ? (
                      <span className="text-xs text-emerald-600 flex items-center gap-1">
                        <RefreshCw className="h-3 w-3 animate-spin" /> Scan en cours...
                      </span>
                    ) : (
                      <Button variant="outline" size="sm" onClick={startScanning} className="h-7 text-xs">
                        <Scan className="h-3 w-3 mr-1" />
                        {scanMethod === "rfid" ? "Simuler scan RFID" : "Simuler scan caméra"}
                      </Button>
                    )}
                    {groupProducts && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setGroupProducts("")}
                        className="h-7 text-xs text-muted-foreground"
                      >
                        Effacer
                      </Button>
                    )}
                  </div>
                </div>
                <Textarea
                  id="scanned-products"
                  placeholder="Les codes des produits scannés apparaîtront ici automatiquement..."
                  className="min-h-40 font-mono text-sm"
                  value={groupProducts}
                  onChange={(e) => setGroupProducts(e.target.value)}
                  readOnly={isScanning}
                />
                <p className="text-sm text-muted-foreground">Format: CODE-PRODUIT:Nom du produit (un par ligne)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="group-format">Format des codes</Label>
                <RadioGroup
                  id="group-format"
                  className="flex space-x-4"
                  defaultValue="barcode"
                  value={groupFormat}
                  onValueChange={setGroupFormat}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="barcode" id="group-barcode" />
                    <Label htmlFor="group-barcode" className="flex items-center gap-1">
                      <Barcode className="h-4 w-4" /> Code-barres
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="qrcode" id="group-qrcode" />
                    <Label htmlFor="group-qrcode" className="flex items-center gap-1">
                      <QrCode className="h-4 w-4" /> QR Code
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                onClick={generateGroupCodes}
                disabled={isGeneratingGroup || groupProductsList.length === 0 || isScanning}
                className="w-full md:w-auto"
              >
                {isGeneratingGroup ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Génération...
                  </>
                ) : (
                  "Générer tous les codes"
                )}
              </Button>
            </CardContent>

            {groupCodesGenerated && groupProductsList.length > 0 && (
              <CardFooter className="flex flex-col items-start space-y-4 pt-6">
                <h3 className="font-medium text-lg">Codes générés ({groupProductsList.length})</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {groupProductsList.map((product, index) => {
                    // Split by colon, but reverse the order since format is now CODE:NAME
                    const parts = product.split(":")
                    const code = parts[0].trim()
                    const name = parts.length > 1 ? parts[1].trim() : `Produit ${index + 1}`

                    return (
                      <div key={index} className="bg-white p-4 rounded-lg border flex flex-col items-center">
                        {groupFormat === "barcode" ? (
                          <div className="h-16 w-full flex items-center justify-center">
                            <svg className="h-full w-full" viewBox="0 0 200 60">
                              <rect x="10" y="5" width="4" height="50" />
                              <rect x="18" y="5" width="2" height="50" />
                              <rect x="24" y="5" width="6" height="50" />
                              <rect x="34" y="5" width="2" height="50" />
                              <rect x="40" y="5" width="4" height="50" />
                              <rect x="48" y="5" width="6" height="50" />
                              <rect x="58" y="5" width="2" height="50" />
                              <rect x="64" y="5" width="4" height="50" />
                              <rect x="72" y="5" width="8" height="50" />
                              <rect x="84" y="5" width="4" height="50" />
                              <rect x="92" y="5" width="2" height="50" />
                              <rect x="98" y="5" width="6" height="50" />
                              <rect x="108" y="5" width="4" height="50" />
                              <rect x="116" y="5" width="2" height="50" />
                              <rect x="122" y="5" width="8" height="50" />
                              <rect x="134" y="5" width="4" height="50" />
                              <rect x="142" y="5" width="6" height="50" />
                              <rect x="152" y="5" width="2" height="50" />
                              <rect x="158" y="5" width="4" height="50" />
                              <rect x="166" y="5" width="2" height="50" />
                              <rect x="172" y="5" width="8" height="50" />
                              <rect x="184" y="5" width="4" height="50" />
                            </svg>
                          </div>
                        ) : (
                          <div className="h-24 w-24 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="h-full w-full">
                              <path d="M0,0 h100v100h-100z" fill="white" />
                              <path d="M10,10 h80v80h-80z" fill="black" />
                              <path d="M20,20 h60v60h-60z" fill="white" />
                              <path d="M30,30 h40v40h-40z" fill="black" />
                              <path d="M40,40 h20v20h-20z" fill="white" />
                            </svg>
                          </div>
                        )}
                        <div className="text-center mt-2">
                          <p className="font-medium text-sm">{name}</p>
                          <p className="text-xs text-muted-foreground">{code}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 w-full flex items-center justify-center gap-1"
                        >
                          <FileDown className="h-3 w-3" />
                          <span className="text-xs">Télécharger</span>
                        </Button>
                      </div>
                    )
                  })}
                </div>

                <div className="w-full flex justify-end mt-4">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Télécharger tous les codes (ZIP)
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
