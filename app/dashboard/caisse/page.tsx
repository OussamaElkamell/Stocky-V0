"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Plus, CreditCard, Search, Package } from "lucide-react"
import { PaymentDialog } from "@/components/payment-dialog"
import { Badge } from "@/components/ui/badge"

// Sample product data
const products = [
  { id: 1, name: "T-shirt", price: 19.99, category: "Vêtements" },
  { id: 2, name: "Pantalon", price: 39.99, category: "Vêtements" },
  { id: 3, name: "Chaussures", price: 59.99, category: "Chaussures" },
  { id: 4, name: "Sac", price: 29.99, category: "Accessoires" },
  { id: 5, name: "Chapeau", price: 14.99, category: "Accessoires" },
  { id: 6, name: "Ceinture", price: 9.99, category: "Accessoires" },
]

// Sample categories
const categories = ["Tous", "Vêtements", "Chaussures", "Accessoires"]

export default function CaissePage() {
  const [cart, setCart] = useState<Array<{ product: (typeof products)[0]; quantity: number }>>([])
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("ajouter") // Default to "Ajouter des Produit"

  // Filter products based on category and search query
  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "Tous" || product.category === activeCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Add product to cart
  const addToCart = (product: (typeof products)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })
  }

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  // Update product quantity in cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  // Handle payment completion
  const handlePaymentComplete = () => {
    // Clear the cart after successful payment
    setCart([])
    // You could also add code to save the transaction to a database
    alert("Paiement réussi! Merci pour votre achat.")
  }

  return (
    <div className="flex h-full">
      {/* Main content area */}
      <div className="flex-1 p-4 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ajouter" className="flex items-center gap-2">
              <Plus size={16} />
              Ajouter des Produit
            </TabsTrigger>
            <TabsTrigger value="panier" className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCart size={16} />
                {cart.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                  >
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </Badge>
                )}
              </div>
              Panier
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ajouter" className="flex-1 overflow-auto">
            <Card>
              <CardHeader>
                <CardTitle>Produits</CardTitle>
                <CardDescription>Ajoutez des produits au panier</CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un produit..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4 overflow-auto pb-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => addToCart(product)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-square bg-slate-100 rounded-md flex items-center justify-center mb-2">
                          <Package size={32} className="text-slate-400" />
                        </div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                        <div className="mt-1 font-bold">{product.price.toFixed(2)} TND</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="panier" className="flex-1 overflow-auto">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Panier</CardTitle>
                <CardDescription>Articles dans votre panier</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">Votre panier est vide</div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-muted-foreground">{item.product.price.toFixed(2)} TND / unité</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <div className="w-20 text-right font-medium">
                            {(item.product.price * item.quantity).toFixed(2)} TND
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex-col items-stretch border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-xl">{calculateTotal().toFixed(2)} TND</span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  disabled={cart.length === 0}
                  onClick={() => setShowPaymentDialog(true)}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payer
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Dialog */}
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        totalAmount={calculateTotal()}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  )
}
