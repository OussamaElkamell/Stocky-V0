"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  ArrowRight,
  CreditCard,
  Minus,
  Package,
  Plus,
  Printer,
  QrCode,
  Receipt,
  Save,
  Search,
  ShoppingBag,
  X,
  Clock,
  History,
  AlertTriangle,
  RotateCcw,
  Gift,
  Percent,
  Zap,
  Camera,
  RefreshCw,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckIcon } from "@/app/components/check-icon"

export default function CaissePage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "PROD-1234",
      name: "T-shirt Premium",
      price: 39.5,
      quantity: 2,
      image: "/placeholder.svg?height=60&width=60",
      stock: 45,
    },
    {
      id: "PROD-5678",
      name: "Casquette Logo",
      price: 19.99,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
      stock: 8,
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    loyaltyCard: "",
    loyaltyPoints: 0,
  })
  const [printReceipt, setPrintReceipt] = useState(true)
  const [emailReceipt, setEmailReceipt] = useState(false)
  const [isBarcodeScannerOpen, setIsBarcodeScannerOpen] = useState(false)
  const [isSalesHistoryOpen, setIsSalesHistoryOpen] = useState(false)
  const [isLoyaltyPointsOpen, setIsLoyaltyPointsOpen] = useState(false)
  const [isDiscountOpen, setIsDiscountOpen] = useState(false)
  const [isInventoryStatusOpen, setIsInventoryStatusOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanSuccess, setScanSuccess] = useState(false)
  const [scannedProduct, setScannedProduct] = useState(null)
  const [activeDiscount, setActiveDiscount] = useState(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  // Add a new state for the sale confirmation dialog
  const [isSaleCompleteOpen, setIsSaleCompleteOpen] = useState(false)
  const [saleReference, setSaleReference] = useState("")

  // Produits populaires pour l'ajout rapide
  const popularProducts = [
    {
      id: "PROD-1234",
      name: "T-shirt Premium",
      price: 39.5,
      image: "/placeholder.svg?height=80&width=80",
      stock: 45,
    },
    {
      id: "PROD-5678",
      name: "Casquette Logo",
      price: 19.99,
      image: "/placeholder.svg?height=80&width=80",
      stock: 8,
    },
    {
      id: "PROD-9012",
      name: "Chaussettes Sport",
      price: 12.5,
      image: "/placeholder.svg?height=80&width=80",
      stock: 3,
    },
    {
      id: "PROD-3456",
      name: "Sac à dos",
      price: 49.99,
      image: "/placeholder.svg?height=80&width=80",
      stock: 15,
    },
    {
      id: "PROD-7890",
      name: "Gourde isotherme",
      price: 24.95,
      image: "/placeholder.svg?height=80&width=80",
      stock: 20,
    },
    {
      id: "PROD-2345",
      name: "Porte-clés",
      price: 7.99,
      image: "/placeholder.svg?height=80&width=80",
      stock: 67,
    },
  ]

  // Sample sales history data
  const salesHistory = [
    {
      id: "SALE-1001",
      date: "2023-04-01T14:30:00",
      total: 124.5,
      items: [
        { id: "PROD-1234", name: "T-shirt Premium", price: 39.5, quantity: 2 },
        { id: "PROD-5678", name: "Casquette Logo", price: 19.99, quantity: 1 },
        { id: "PROD-9012", name: "Chaussettes Sport", price: 12.5, quantity: 2 },
      ],
      paymentMethod: "Carte bancaire",
      customer: "Sophie Martin",
    },
    {
      id: "SALE-1002",
      date: "2023-04-01T11:15:00",
      total: 74.99,
      items: [
        { id: "PROD-3456", name: "Sac à dos", price: 49.99, quantity: 1 },
        { id: "PROD-7890", name: "Gourde isotherme", price: 24.95, quantity: 1 },
      ],
      paymentMethod: "Espèces",
      customer: "Thomas Dubois",
    },
    {
      id: "SALE-1003",
      date: "2023-03-31T16:45:00",
      total: 59.98,
      items: [
        { id: "PROD-1234", name: "T-shirt Premium", price: 39.5, quantity: 1 },
        { id: "PROD-2345", name: "Porte-clés", price: 7.99, quantity: 1 },
        { id: "PROD-9012", name: "Chaussettes Sport", price: 12.5, quantity: 1 },
      ],
      paymentMethod: "Carte bancaire",
      customer: "Emma Petit",
    },
    {
      id: "SALE-1004",
      date: "2023-03-31T10:20:00",
      total: 94.94,
      items: [
        { id: "PROD-7890", name: "Gourde isotherme", price: 24.95, quantity: 2 },
        { id: "PROD-5678", name: "Casquette Logo", price: 19.99, quantity: 1 },
        { id: "PROD-2345", name: "Porte-clés", price: 7.99, quantity: 3 },
      ],
      paymentMethod: "Carte bancaire",
      customer: "Lucas Bernard",
    },
    {
      id: "SALE-1005",
      date: "2023-03-30T15:10:00",
      total: 49.99,
      items: [{ id: "PROD-3456", name: "Sac à dos", price: 49.99, quantity: 1 }],
      paymentMethod: "Espèces",
      customer: "Chloé Moreau",
    },
  ]

  // Available discount codes
  const discountCodes = [
    { code: "BIENVENUE10", description: "10% de réduction sur votre première commande", value: 10, type: "percentage" },
    { code: "ETE2023", description: "15% de réduction sur les articles d'été", value: 15, type: "percentage" },
    { code: "FIDELE5", description: "5 TND de réduction pour les clients fidèles", value: 5, type: "fixed" },
    { code: "SOLDES20", description: "20% sur les articles en solde", value: 20, type: "percentage" },
  ]

  // Ajouter un produit au panier
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  // Modifier la quantité d'un produit
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  // Calculer le sous-total
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculer la TVA (20%)
  const tax = subtotal * 0.2

  // Calculer la remise
  const discount = activeDiscount
    ? activeDiscount.type === "percentage"
      ? (subtotal * activeDiscount.value) / 100
      : activeDiscount.value
    : 0

  // Calculer le total
  const total = subtotal + tax - discount

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Handle barcode scanning
  const startScanner = async () => {
    try {
      setIsScanning(true)

      // In a real implementation, this would access the device camera
      // For this demo, we'll simulate scanning after a delay
      setTimeout(() => {
        // Randomly select a product to simulate scanning
        const randomIndex = Math.floor(Math.random() * popularProducts.length)
        const scannedProduct = popularProducts[randomIndex]

        setScannedProduct(scannedProduct)
        setScanSuccess(true)

        // Add the scanned product to cart
        setTimeout(() => {
          addToCart(scannedProduct)
          setIsScanning(false)
          setScanSuccess(false)
          // Close the scanner dialog after successful scan
          setTimeout(() => {
            setIsBarcodeScannerOpen(false)
          }, 1000)
        }, 1000)
      }, 2000)
    } catch (error) {
      console.error("Error accessing camera:", error)
      setIsScanning(false)
    }
  }

  // Stop camera stream when scanner dialog is closed
  useEffect(() => {
    if (!isBarcodeScannerOpen && streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [isBarcodeScannerOpen])

  // Process a return from sales history
  const processReturn = (sale, item) => {
    // In a real app, this would handle the return logic
    // For this demo, we'll just show an alert
    alert(`Retour traité pour ${item.name} de la vente ${sale.id}`)
  }

  // Apply a discount code
  const applyDiscountCode = (discountCode) => {
    const discount = discountCodes.find((d) => d.code === discountCode)
    if (discount) {
      setActiveDiscount(discount)
      setIsDiscountOpen(false)
    }
  }

  // Check loyalty card
  const checkLoyaltyCard = (cardNumber) => {
    // In a real app, this would query a database
    // For this demo, we'll simulate finding a customer with points
    if (cardNumber.trim() !== "") {
      setCustomerInfo({
        ...customerInfo,
        loyaltyCard: cardNumber,
        loyaltyPoints: 250,
        name: "Sophie Martin",
        email: "sophie.martin@example.com",
        phone: "+33 6 12 34 56 78",
      })
    }
  }

  // Clear the cart
  const clearCart = () => {
    setCartItems([])
    setActiveDiscount(null)
    setCustomerInfo({
      name: "",
      email: "",
      phone: "",
      loyaltyCard: "",
      loyaltyPoints: 0,
    })
  }

  // Add a function to handle finalizing the sale
  const finalizeSale = () => {
    if (cartItems.length === 0) return

    // Generate a random sale reference
    const reference = `SALE-${Math.floor(1000 + Math.random() * 9000)}`
    setSaleReference(reference)

    // Show the confirmation dialog
    setIsSaleCompleteOpen(true)

    // In a real app, this would send the sale data to a backend
    console.log("Sale finalized:", {
      reference,
      items: cartItems,
      total,
      paymentMethod,
      customer: customerInfo,
      date: new Date(),
    })
  }

  // Add a function to handle starting a new sale
  const startNewSale = () => {
    // Clear the cart and reset customer info
    clearCart()
    // Close the confirmation dialog
    setIsSaleCompleteOpen(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Caisse</h1>
          <p className="text-muted-foreground">Gérez vos ventes en boutique physique</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
          <Dialog open={isBarcodeScannerOpen} onOpenChange={setIsBarcodeScannerOpen}>
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
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      style={{ display: "none" }} // Hidden in this demo
                    />
                  </div>

                  <div className="flex flex-col items-center gap-4 w-full">
                    <div className="flex gap-2">
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={startScanner}
                        disabled={isScanning}
                      >
                        <QrCode className="h-4 w-4 mr-2" />
                        {isScanning ? "Scan en cours..." : "Scanner"}
                      </Button>
                      <Button variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Changer de caméra
                      </Button>
                    </div>

                    {scannedProduct && (
                      <div className="border rounded-lg p-4 w-full mt-4">
                        <h3 className="font-semibold mb-2">Produit identifié:</h3>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-slate-200 flex items-center justify-center">
                            <Package className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium">{scannedProduct.name}</p>
                            <p className="text-sm text-muted-foreground">Prix: {scannedProduct.price.toFixed(2)} TND</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Stock:</p>
                            <p className="text-sm">{scannedProduct.stock} unités</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Statut:</p>
                            <p className="text-sm">
                              {scannedProduct.stock > 10 ? (
                                <span className="text-emerald-600">En stock</span>
                              ) : scannedProduct.stock > 0 ? (
                                <span className="text-amber-600">Stock faible</span>
                              ) : (
                                <span className="text-rose-600">Rupture</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBarcodeScannerOpen(false)}>
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Colonne de gauche - Panier */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Panier</CardTitle>
              <CardDescription>
                {cartItems.length} article(s) - {new Date().toLocaleDateString("fr-FR")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Produit</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Prix</TableHead>
                    <TableHead className="text-center">Quantité</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          width={40}
                          height={40}
                          alt={item.name}
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        {item.stock <= 5 && (
                          <div className="flex items-center mt-1">
                            <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                            <span className="text-xs text-amber-500">Stock faible: {item.stock} restants</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{item.price.toFixed(2)} TND</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {(item.price * item.quantity).toFixed(2)} TND
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeFromCart(item.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {cartItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <ShoppingBag className="h-12 w-12 mb-2 text-muted-foreground/50" />
                          <h3 className="font-medium">Panier vide</h3>
                          <p className="text-sm">Ajoutez des produits pour commencer</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col items-end space-y-2 border-t pt-6">
              <div className="w-full md:w-72 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total:</span>
                  <span>{subtotal.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TVA (20%):</span>
                  <span>{tax.toFixed(2)} TND</span>
                </div>
                {activeDiscount && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600 flex items-center">
                      <Percent className="h-3 w-3 mr-1" />
                      Remise {activeDiscount.code}:
                    </span>
                    <span className="text-emerald-600">-{discount.toFixed(2)} TND</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span>{total.toFixed(2)} TND</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Recherche et produits populaires */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Ajouter des produits</CardTitle>
              <CardDescription>Recherchez ou sélectionnez des produits populaires</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un produit par nom ou code..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Produits populaires</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {popularProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-2 text-center cursor-pointer hover:border-emerald-500 transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      <div className="flex justify-center mb-2">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          width={60}
                          height={60}
                          alt={product.name}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-muted-foreground">{product.price.toFixed(2)} TND</p>
                        {product.stock <= 5 && (
                          <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                            {product.stock}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne de droite - Paiement */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Paiement</CardTitle>
              <CardDescription>Finalisez la transaction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Méthode de paiement</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="card" id="payment-card" />
                    <Label htmlFor="payment-card" className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                      Carte bancaire
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="cash" id="payment-cash" />
                    <Label htmlFor="payment-cash" className="flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2 text-emerald-600" />
                      Espèces
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Informations client</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Nom du client"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  />
                  <Input
                    placeholder="Téléphone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Carte de fidélité"
                      value={customerInfo.loyaltyCard}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, loyaltyCard: e.target.value })}
                    />
                    <Button variant="outline" size="icon" onClick={() => checkLoyaltyCard(customerInfo.loyaltyCard)}>
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>

                  {customerInfo.loyaltyPoints > 0 && (
                    <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium text-emerald-700">
                          {customerInfo.loyaltyPoints} points de fidélité
                        </span>
                      </div>
                      <p className="text-xs text-emerald-600 mt-1">
                        Équivalent à {(customerInfo.loyaltyPoints / 100).toFixed(2)} TND de réduction
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Options de ticket</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="print-receipt" className="flex items-center cursor-pointer">
                      <Printer className="h-4 w-4 mr-2 text-slate-600" />
                      Imprimer le ticket
                    </Label>
                    <Switch id="print-receipt" checked={printReceipt} onCheckedChange={setPrintReceipt} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-receipt" className="flex items-center cursor-pointer">
                      <Receipt className="h-4 w-4 mr-2 text-slate-600" />
                      Envoyer par email
                    </Label>
                    <Switch id="email-receipt" checked={emailReceipt} onCheckedChange={setEmailReceipt} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t pt-6">
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="font-medium text-lg">Total</p>
                  <p className="text-sm text-muted-foreground">{cartItems.length} article(s)</p>
                </div>
                <p className="text-2xl font-bold">{total.toFixed(2)} TND</p>
              </div>
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg"
                disabled={cartItems.length === 0}
                onClick={finalizeSale}
              >
                Finaliser la vente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>

          {/* Sale Confirmation Dialog */}
          <Dialog open={isSaleCompleteOpen} onOpenChange={setIsSaleCompleteOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  Vente finalisée avec succès
                </DialogTitle>
                <DialogDescription>La transaction a été traitée et enregistrée.</DialogDescription>
              </DialogHeader>
              <div className="py-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-emerald-700">Référence de vente</p>
                      <p className="text-lg font-bold">{saleReference}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-700">Montant total</p>
                      <p className="text-lg font-bold">{total.toFixed(2)} TND</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Récapitulatif</h4>
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Articles</span>
                      <span className="text-sm font-medium">{cartItems.length}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Client</span>
                      <span className="text-sm font-medium">{customerInfo.name || "Client occasionnel"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Paiement</span>
                      <span className="text-sm font-medium">
                        {paymentMethod === "card" ? "Carte bancaire" : "Espèces"}
                      </span>
                    </div>
                  </div>
                </div>

                {printReceipt && (
                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Printer className="h-4 w-4" />
                    <span>Impression du ticket en cours...</span>
                  </div>
                )}

                {emailReceipt && customerInfo.email && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Receipt className="h-4 w-4" />
                    <span>Ticket envoyé à {customerInfo.email}</span>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={startNewSale}>
                  Nouvelle vente
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Dialog open={isLoyaltyPointsOpen} onOpenChange={setIsLoyaltyPointsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20 text-center">
                    <Gift className="h-5 w-5 mb-1 text-emerald-600" />
                    <span className="text-xs">Points fidélité</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Points de fidélité</DialogTitle>
                    <DialogDescription>Vérifiez et utilisez les points de fidélité du client.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Numéro de carte fidélité"
                        value={customerInfo.loyaltyCard}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, loyaltyCard: e.target.value })}
                      />
                      <Button variant="outline" onClick={() => checkLoyaltyCard(customerInfo.loyaltyCard)}>
                        Vérifier
                      </Button>
                    </div>

                    {customerInfo.loyaltyPoints > 0 ? (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Gift className="h-5 w-5 text-emerald-600" />
                            <span className="font-medium">Points disponibles</span>
                          </div>
                          <span className="text-xl font-bold text-emerald-700">{customerInfo.loyaltyPoints}</span>
                        </div>
                        <p className="text-sm text-emerald-600 mb-4">Client: {customerInfo.name}</p>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Utiliser les points</Button>
                      </div>
                    ) : (
                      <div className="p-4 border rounded-md text-center">
                        <p className="text-muted-foreground">Aucun point de fidélité trouvé</p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsLoyaltyPointsOpen(false)}>
                      Fermer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isDiscountOpen} onOpenChange={setIsDiscountOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20 text-center">
                    <Percent className="h-5 w-5 mb-1 text-purple-600" />
                    <span className="text-xs">Remises</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Appliquer une remise</DialogTitle>
                    <DialogDescription>Sélectionnez ou saisissez un code de remise.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Code de remise</Label>
                      <div className="flex gap-2">
                        <Input placeholder="Saisir un code" />
                        <Button variant="outline">Appliquer</Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Codes disponibles</Label>
                      <div className="space-y-2">
                        {discountCodes.map((discount) => (
                          <div
                            key={discount.code}
                            className="border rounded-md p-3 hover:border-purple-300 cursor-pointer"
                            onClick={() => applyDiscountCode(discount.code)}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{discount.code}</span>
                              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                                {discount.type === "percentage" ? `${discount.value}%` : `${discount.value}TND`}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{discount.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDiscountOpen(false)}>
                      Fermer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isInventoryStatusOpen} onOpenChange={setIsInventoryStatusOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20 text-center">
                    <Package className="h-5 w-5 mb-1 text-blue-600" />
                    <span className="text-xs">Vérifier stock</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Statut de l'inventaire</DialogTitle>
                    <DialogDescription>Vérifiez la disponibilité des produits en stock.</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Rechercher un produit..." className="pl-8" />
                    </div>

                    <ScrollArea className="h-[300px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produit</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead className="text-right">Prix</TableHead>
                            <TableHead className="text-center">Stock</TableHead>
                            <TableHead>Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {popularProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell className="text-muted-foreground">{product.id}</TableCell>
                              <TableCell className="text-right">{product.price.toFixed(2)} TND</TableCell>
                              <TableCell className="text-center">{product.stock}</TableCell>
                              <TableCell>
                                {product.stock > 10 ? (
                                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                                    En stock
                                  </Badge>
                                ) : product.stock > 0 ? (
                                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                                    Stock faible
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-rose-50 text-rose-700">
                                    Rupture
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsInventoryStatusOpen(false)}>
                      Fermer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isSalesHistoryOpen} onOpenChange={setIsSalesHistoryOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-20 text-center">
                    <History className="h-5 w-5 mb-1 text-amber-600" />
                    <span className="text-xs">Ventes récentes</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                  <DialogHeader>
                    <DialogTitle>Historique des ventes</DialogTitle>
                    <DialogDescription>Consultez les transactions récentes et traitez les retours.</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Tabs defaultValue="recent">
                      <TabsList className="mb-4">
                        <TabsTrigger value="recent">Ventes récentes</TabsTrigger>
                        <TabsTrigger value="returns">Retours</TabsTrigger>
                      </TabsList>

                      <TabsContent value="recent">
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-4">
                            {salesHistory.map((sale) => (
                              <div key={sale.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <Receipt className="h-4 w-4 text-slate-500" />
                                      <span className="font-medium">{sale.id}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {formatDate(sale.date)} • {sale.customer}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold">{sale.total.toFixed(2)} TND</p>
                                    <Badge variant="outline" className="mt-1">
                                      {sale.paymentMethod}
                                    </Badge>
                                  </div>
                                </div>

                                <Separator className="my-2" />

                                <div className="space-y-2">
                                  {sale.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                      <div className="flex items-center gap-2">
                                        <div className="text-sm">{item.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                          {item.quantity} × {item.price.toFixed(2)} TND
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 flex items-center gap-1 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                        onClick={() => processReturn(sale, item)}
                                      >
                                        <RotateCcw className="h-3 w-3" />
                                        <span className="text-xs">Retour</span>
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>

                      <TabsContent value="returns">
                        <div className="p-8 text-center">
                          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">Aucun retour récent</h3>
                          <p className="text-muted-foreground">Les retours traités apparaîtront ici.</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsSalesHistoryOpen(false)}>
                      Fermer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Quick Actions Button */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                  onClick={clearCart}
                >
                  <X className="h-4 w-4 mr-2" />
                  Vider panier
                </Button>
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setIsBarcodeScannerOpen(true)}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Scan rapide
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
