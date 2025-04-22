"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Download,
  Edit,
  ExternalLink,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Printer,
  RefreshCw,
  Send,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { PageLayout } from "@/components/layout/page-layout"
import { StatusBadge } from "@/components/ui/status-badge"
import { ChannelBadge } from "@/components/ui/channel-badge"
import { formatDate } from "@/utils/date-formatter"
import { DeliveryProviderSelector } from "@/components/shipping/delivery-provider-selector"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [orderStatus, setOrderStatus] = useState("pending")
  const [noteText, setNoteText] = useState("")

  // Données de démonstration pour la commande
  const order = {
    id: id,
    customer: "Sophie Martin",
    email: "sophie.martin@example.com",
    date: "2023-04-01T10:23:00",
    items: [
      {
        id: "PROD-1234",
        name: "T-shirt Premium",
        sku: "TS-PREM-M-BLK",
        price: "39.50 TND",
        quantity: 2,
        total: "79.00 TND",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "PROD-5678",
        name: "Casquette Logo",
        sku: "CAP-LOGO-BLU",
        price: "19.99 TND",
        quantity: 1,
        total: "19.99 TND",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "PROD-9012",
        name: "Chaussettes Sport",
        sku: "SOCK-SPT-L-WHT",
        price: "12.50 TND",
        quantity: 2,
        total: "25.00 TND",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    amount: "124.50 TND",
    status: "pending",
    channel: "store",
    payment: {
      method: "Carte bancaire",
      cardType: "Visa",
      lastDigits: "4242",
      status: "Payé",
    },
    shipping: {
      method: "Livraison standard",
      cost: "4.99 TND",
      address: "15 Rue des Fleurs, 75001 Paris, France",
      trackingNumber: "TRACK123456789FR",
    },
    customer: {
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      phone: "+33 6 12 34 56 78",
      address: "15 Rue des Fleurs, 75001 Paris, France",
    },
    timeline: [
      {
        date: "2023-04-01T10:23:00",
        status: "pending",
        description: "Commande créée",
      },
      {
        date: "2023-04-01T10:25:00",
        status: "pending",
        description: "Paiement reçu",
      },
    ],
    notes: [
      {
        date: "2023-04-01T10:30:00",
        user: "Système",
        text: "Commande créée via la boutique physique",
      },
    ],
    subtotal: "119.99 TND",
    tax: "4.51 TND",
    shipping: "4.99 TND",
    discount: "5.00 TND",
    total: "124.50 TND",
  }

  // Ajouter une note
  const addNote = () => {
    if (noteText.trim()) {
      // Dans une application réelle, vous enverriez ceci à votre API
      console.log("Ajout d'une note:", noteText)
      setNoteText("")
    }
  }

  // Mettre à jour le statut
  const updateStatus = (newStatus: string) => {
    // Dans une application réelle, vous enverriez ceci à votre API
    console.log("Mise à jour du statut:", newStatus)
    setOrderStatus(newStatus)
  }

  return (
    <PageLayout>
      {/* En-tête avec navigation et actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/commandes">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour
            </Link>
          </Button>
          <div className="flex items-center">
            <span className="text-muted-foreground">Commandes</span>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <h1 className="text-xl font-bold">{order.id}</h1>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Envoyer
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Modifier
          </Button>
        </div>
      </div>

      {/* Statut et informations principales */}
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Détails de la commande</CardTitle>
              <StatusBadge status={orderStatus} />
            </div>
            <CardDescription>
              Créée le {formatDate(order.date)} via <ChannelBadge channel={order.channel} />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Client</h3>
                <p className="font-medium">{order.customer.name}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>{order.customer.phone}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Paiement</h3>
                <p className="font-medium">{order.payment.method}</p>
                <p className="text-sm text-muted-foreground">
                  {order.payment.cardType} **** {order.payment.lastDigits}
                </p>
                <p className="text-sm text-emerald-600 font-medium">{order.payment.status}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Adresse de livraison</h3>
                <p className="font-medium">{order.customer.name}</p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{order.shipping.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Méthode d'expédition</h3>
                <p className="font-medium">{order.shipping.method}</p>
                <p className="text-sm text-muted-foreground">Coût: {order.shipping.cost}</p>
                {order.shipping.trackingNumber && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-muted-foreground">Suivi:</span>
                    <a href="#" className="text-blue-600 hover:underline flex items-center">
                      {order.shipping.trackingNumber}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
                <div className="mt-4">
                  <DeliveryProviderSelector
                    defaultValue="poste"
                    onSelect={(provider) => console.log("Fournisseur sélectionné:", provider)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:w-80">
          <CardHeader className="pb-2">
            <CardTitle>Mettre à jour le statut</CardTitle>
            <CardDescription>
              Statut actuel: <StatusBadge status={orderStatus} />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={orderStatus} onValueChange={updateStatus} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="status-pending" />
                <Label htmlFor="status-pending" className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                  En attente
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="processing" id="status-processing" />
                <Label htmlFor="status-processing" className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  En traitement
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shipped" id="status-shipped" />
                <Label htmlFor="status-shipped" className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                  Expédiée
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivered" id="status-delivered" />
                <Label htmlFor="status-delivered" className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  Livrée
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cancelled" id="status-cancelled" />
                <Label htmlFor="status-cancelled" className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-rose-500 mr-2"></div>
                  Annulée
                </Label>
              </div>
            </RadioGroup>

            <Button className="w-full">Mettre à jour</Button>
          </CardContent>
        </Card>
      </div>

      {/* Onglets pour les détails, l'historique et les notes */}
      <Tabs defaultValue="items" className="space-y-4">
        <TabsList>
          <TabsTrigger value="items">Articles</TabsTrigger>
          <TabsTrigger value="timeline">Historique</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Articles commandés</CardTitle>
              <CardDescription>{order.items.length} article(s) dans cette commande</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead className="hidden md:table-cell">SKU</TableHead>
                    <TableHead className="text-right">Prix</TableHead>
                    <TableHead className="text-center">Qté</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
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
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{item.sku}</TableCell>
                      <TableCell className="text-right">{item.price}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right font-medium">{item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col items-end space-y-2 border-t pt-6">
              <div className="w-full md:w-72 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total:</span>
                  <span>{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TVA:</span>
                  <span>{order.tax}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison:</span>
                  <span>{order.shipping}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remise:</span>
                  <span>-{order.discount}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{order.total}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique de la commande</CardTitle>
              <CardDescription>Suivi des changements et des événements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          event.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : event.status === "processing"
                              ? "bg-blue-100 text-blue-700"
                              : event.status === "shipped"
                                ? "bg-emerald-100 text-emerald-700"
                                : event.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {event.status === "pending" && <Clock className="h-4 w-4" />}
                        {event.status === "processing" && <RefreshCw className="h-4 w-4" />}
                        {event.status === "shipped" && <Truck className="h-4 w-4" />}
                        {event.status === "delivered" && <ShoppingBag className="h-4 w-4" />}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className="h-full w-0.5 bg-muted-foreground/20 my-1"></div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{event.description}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Notes internes sur cette commande</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {order.notes.map((note, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-slate-100 p-1.5 rounded-full">
                        <User className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{note.user}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(note.date)}</p>
                      </div>
                    </div>
                    <p className="text-sm">{note.text}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Ajouter une note..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <Button onClick={addNote} disabled={!noteText.trim()} className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Ajouter une note
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Factures et documents liés à cette commande</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Facture #{order.id}</p>
                    <p className="text-sm text-muted-foreground">Générée le {formatDate(order.date)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Printer className="h-4 w-4" />
                    <span className="hidden md:inline">Imprimer</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden md:inline">Télécharger</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Send className="h-4 w-4" />
                    <span className="hidden md:inline">Envoyer</span>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-md">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">Bon de livraison #{order.id}</p>
                    <p className="text-sm text-muted-foreground">Généré le {formatDate(order.date)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Printer className="h-4 w-4" />
                    <span className="hidden md:inline">Imprimer</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden md:inline">Télécharger</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
