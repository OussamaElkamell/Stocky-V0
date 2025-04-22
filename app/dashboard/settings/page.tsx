"use client"

import { useState } from "react"
import {
  User,
  Store,
  CreditCard,
  Bell,
  Lock,
  Globe,
  HelpCircle,
  Smartphone,
  Printer,
  Wifi,
  Tag,
  Database,
  Shield,
  Users,
  Laptop,
  Truck,
  BarChart,
  Mail,
  BookOpen,
  FileText,
  Code,
  MessageSquare,
  PhoneCall,
} from "lucide-react"

import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [saveStatus, setSaveStatus] = useState<null | "saving" | "saved">(null)

  const handleSave = () => {
    setSaveStatus("saving")
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus(null), 2000)
    }, 1000)
  }

  return (
    <PageLayout>
      <PageHeader title="Paramètres" description="Gérez les paramètres de votre compte et de votre boutique" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <TabsList className="flex flex-col h-auto justify-start p-0 bg-transparent">
            <TabsTrigger
              value="profile"
              className="flex items-center justify-start gap-2 px-4 py-2 text-left w-full data-[state=active]:bg-slate-100 rounded-none"
            >
              <User className="h-4 w-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger
              value="store"
              className="flex items-center justify-start gap-2 px-4 py-2 text-left w-full data-[state=active]:bg-slate-100 rounded-none"
            >
              <Store className="h-4 w-4" />
              <span>Boutique</span>
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="flex items-center justify-start gap-2 px-4 py-2 text-left w-full data-[state=active]:bg-slate-100 rounded-none"
            >
              <CreditCard className="h-4 w-4" />
              <span>Facturation</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center justify-start gap-2 px-4 py-2 text-left w-full data-[state=active]:bg-slate-100 rounded-none"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center justify-start gap-2 px-4 py-2 text-left w-full data-[state=active]:bg-slate-100 rounded-none"
            >
              <Lock className="h-4 w-4" />
              <span>Sécurité</span>
            </TabsTrigger>
            <TabsTrigger
              value="hardware"
              className="flex items-center justify-start gap-2 px-4 py-2 text-left w-full data-[state=active]:bg-slate-100 rounded-none"
            >
              <Smartphone className="h-4 w-4" />
              <span>Matériel</span>
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="flex items-center justify-start gap-2 px-4 py-2 text-left w-full data-[state=active]:bg-slate-100 rounded-none"
            >
              <Users className="h-4 w-4" />
              <span>Équipe</span>
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="flex items-center justify-start gap-2 px-4 py-2 text-left w-full data-[state=active]:bg-slate-100 rounded-none"
            >
              <Globe className="h-4 w-4" />
              <span>Intégrations</span>
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="flex items-center justify-start gap-2 px-4 py-2 text-left w-full data-[state=active]:bg-slate-100 rounded-none"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Aide</span>
            </TabsTrigger>
          </TabsList>
        </aside>
        <div className="flex-1 lg:max-w-3xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations du profil</CardTitle>
                  <CardDescription>Mettez à jour vos informations personnelles et professionnelles.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="avatar">Photo de profil</Label>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Avatar" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm">
                            Changer
                          </Button>
                          <Button variant="ghost" size="sm">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Prénom</Label>
                        <Input id="first-name" placeholder="Prénom" defaultValue="Sophie" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Nom</Label>
                        <Input id="last-name" placeholder="Nom" defaultValue="Martin" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Email" defaultValue="sophie.martin@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" type="tel" placeholder="Téléphone" defaultValue="+216 55 123 456" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job-title">Poste</Label>
                      <Input id="job-title" placeholder="Poste" defaultValue="Directrice" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Annuler</Button>
                  <Button onClick={handleSave}>
                    {saveStatus === "saving"
                      ? "Enregistrement..."
                      : saveStatus === "saved"
                        ? "Enregistré!"
                        : "Enregistrer les modifications"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="store" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de la boutique</CardTitle>
                  <CardDescription>Gérez les informations de votre boutique et vos préférences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="store-logo">Logo de la boutique</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-md bg-slate-100 flex items-center justify-center">
                          <Store className="h-8 w-8 text-slate-400" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm">
                            Changer
                          </Button>
                          <Button variant="ghost" size="sm">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="store-name">Nom de la boutique</Label>
                      <Input id="store-name" placeholder="Nom de la boutique" defaultValue="Storei Boutique" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="store-description">Description</Label>
                      <Textarea
                        id="store-description"
                        placeholder="Description de votre boutique"
                        defaultValue="Boutique spécialisée dans les vêtements et accessoires de sport de haute qualité."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="store-address">Adresse</Label>
                      <Input id="store-address" placeholder="Adresse" defaultValue="123 Rue du Commerce" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="store-city">Ville</Label>
                        <Input id="store-city" placeholder="Ville" defaultValue="Tunis" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-postal-code">Code postal</Label>
                        <Input id="store-postal-code" placeholder="Code postal" defaultValue="1000" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="store-country">Pays</Label>
                      <Select defaultValue="tunisia">
                        <SelectTrigger id="store-country">
                          <SelectValue placeholder="Sélectionnez un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tunisia">Tunisie</SelectItem>
                          <SelectItem value="algeria">Algérie</SelectItem>
                          <SelectItem value="morocco">Maroc</SelectItem>
                          <SelectItem value="france">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="store-currency">Devise</Label>
                      <Select defaultValue="tnd">
                        <SelectTrigger id="store-currency">
                          <SelectValue placeholder="Sélectionnez une devise" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tnd">Dinar Tunisien (TND)</SelectItem>
                          <SelectItem value="eur">Euro (EUR)</SelectItem>
                          <SelectItem value="usd">Dollar Américain (USD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="store-timezone">Fuseau horaire</Label>
                      <Select defaultValue="tunis">
                        <SelectTrigger id="store-timezone">
                          <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tunis">Tunis (GMT+1)</SelectItem>
                          <SelectItem value="paris">Paris (GMT+1)</SelectItem>
                          <SelectItem value="london">Londres (GMT+0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Annuler</Button>
                  <Button onClick={handleSave}>
                    {saveStatus === "saving"
                      ? "Enregistrement..."
                      : saveStatus === "saved"
                        ? "Enregistré!"
                        : "Enregistrer les modifications"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de la boutique</CardTitle>
                  <CardDescription>Configurez les paramètres généraux de votre boutique.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Mode maintenance</Label>
                        <p className="text-sm text-muted-foreground">
                          Activez le mode maintenance pour votre site web.
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Inventaire négatif</Label>
                        <p className="text-sm text-muted-foreground">
                          Autoriser les ventes même si le stock est épuisé.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Notifications de stock faible</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevoir des alertes lorsque le stock est faible.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Afficher les prix TTC</Label>
                        <p className="text-sm text-muted-foreground">Afficher les prix toutes taxes comprises.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Réinitialiser</Button>
                  <Button onClick={handleSave}>
                    {saveStatus === "saving"
                      ? "Enregistrement..."
                      : saveStatus === "saved"
                        ? "Enregistré!"
                        : "Enregistrer les modifications"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Abonnement</CardTitle>
                  <CardDescription>Gérez votre abonnement et vos informations de facturation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md border p-4 bg-slate-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Plan Pro</p>
                        <p className="text-sm text-muted-foreground">149 TND / mois</p>
                        <p className="text-xs text-emerald-600 mt-1">Actif</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Changer de plan
                      </Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="text-sm">
                      <p>
                        Prochain renouvellement: <span className="font-medium">15 mai 2023</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Méthode de paiement</h3>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Visa se terminant par 4242</p>
                            <p className="text-sm text-muted-foreground">Expire le 12/2024</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            Modifier
                          </Button>
                          <Button variant="ghost" size="sm">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Ajouter une méthode de paiement
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Historique de facturation</h3>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-4 font-medium border-b">
                        <div>Date</div>
                        <div>Montant</div>
                        <div>Statut</div>
                        <div className="text-right">Facture</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div>15 avril 2023</div>
                          <div>149 TND</div>
                          <div className="text-emerald-600">Payé</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Télécharger
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div>15 mars 2023</div>
                          <div>149 TND</div>
                          <div className="text-emerald-600">Payé</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Télécharger
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div>15 février 2023</div>
                          <div>149 TND</div>
                          <div className="text-emerald-600">Payé</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Télécharger
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations de facturation</CardTitle>
                  <CardDescription>Mettez à jour vos informations de facturation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="billing-name">Nom / Raison sociale</Label>
                      <Input id="billing-name" placeholder="Nom / Raison sociale" defaultValue="Storei SARL" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tax-id">Numéro fiscal</Label>
                      <Input id="tax-id" placeholder="Numéro fiscal" defaultValue="TN12345678" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billing-address">Adresse de facturation</Label>
                      <Input id="billing-address" placeholder="Adresse" defaultValue="123 Rue du Commerce" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="billing-city">Ville</Label>
                        <Input id="billing-city" placeholder="Ville" defaultValue="Tunis" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-postal-code">Code postal</Label>
                        <Input id="billing-postal-code" placeholder="Code postal" defaultValue="1000" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billing-country">Pays</Label>
                      <Select defaultValue="tunisia">
                        <SelectTrigger id="billing-country">
                          <SelectValue placeholder="Sélectionnez un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tunisia">Tunisie</SelectItem>
                          <SelectItem value="algeria">Algérie</SelectItem>
                          <SelectItem value="morocco">Maroc</SelectItem>
                          <SelectItem value="france">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billing-email">Email de facturation</Label>
                      <Input
                        id="billing-email"
                        type="email"
                        placeholder="Email"
                        defaultValue="facturation@storei.com"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Annuler</Button>
                  <Button onClick={handleSave}>
                    {saveStatus === "saving"
                      ? "Enregistrement..."
                      : saveStatus === "saved"
                        ? "Enregistré!"
                        : "Enregistrer les modifications"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notifications</CardTitle>
                  <CardDescription>Configurez comment et quand vous souhaitez être notifié.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications par email</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Nouvelles commandes</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir un email pour chaque nouvelle commande.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Stock faible</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir un email lorsque le stock d'un produit est faible.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Rapports hebdomadaires</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir un rapport hebdomadaire des ventes et activités.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Mises à jour du système</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir des notifications sur les mises à jour de Storei.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications dans l'application</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Nouvelles commandes</Label>
                          <p className="text-sm text-muted-foreground">
                            Afficher une notification pour chaque nouvelle commande.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Messages clients</Label>
                          <p className="text-sm text-muted-foreground">
                            Afficher une notification pour les nouveaux messages clients.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Alertes système</Label>
                          <p className="text-sm text-muted-foreground">Afficher les alertes système importantes.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications SMS</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Commandes importantes</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir un SMS pour les commandes de grande valeur.
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Alertes critiques</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir un SMS pour les alertes système critiques.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Réinitialiser</Button>
                  <Button onClick={handleSave}>
                    {saveStatus === "saving"
                      ? "Enregistrement..."
                      : saveStatus === "saved"
                        ? "Enregistré!"
                        : "Enregistrer les modifications"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité du compte</CardTitle>
                  <CardDescription>
                    Gérez la sécurité de votre compte et les paramètres d'authentification.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Mot de passe</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Mot de passe actuel</Label>
                        <Input id="current-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <Input id="new-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="current-password">Mot de passe actuel</Label>
                        <Input id="current-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <Input id="new-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                        <Input id="confirm-password" type="password" />
                      </div>

                      <Button>Mettre à jour le mot de passe</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Activer l'authentification à deux facteurs</Label>
                          <p className="text-sm text-muted-foreground">
                            Ajoute une couche de sécurité supplémentaire à votre compte.
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sessions actives</h3>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-4 font-medium border-b">
                        <div>Appareil</div>
                        <div>Localisation</div>
                        <div>Dernière activité</div>
                        <div className="text-right">Action</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            <span>iPhone 13</span>
                          </div>
                          <div>Tunis, Tunisie</div>
                          <div>Aujourd'hui, 10:23</div>
                          <div className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                            >
                              Déconnecter
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Laptop className="h-4 w-4" />
                            <span>MacBook Pro</span>
                          </div>
                          <div>Tunis, Tunisie</div>
                          <div>Aujourd'hui, 09:15</div>
                          <div className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                            >
                              Déconnecter
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                      Déconnecter toutes les autres sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de confidentialité</CardTitle>
                  <CardDescription>Gérez vos paramètres de confidentialité et de partage de données.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Partage des données analytiques</Label>
                        <p className="text-sm text-muted-foreground">
                          Partagez des données anonymes pour améliorer Storei.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Cookies de suivi</Label>
                        <p className="text-sm text-muted-foreground">
                          Autoriser les cookies pour personnaliser votre expérience.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Emails marketing</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevoir des emails sur les nouvelles fonctionnalités et offres.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Réinitialiser</Button>
                  <Button onClick={handleSave}>
                    {saveStatus === "saving"
                      ? "Enregistrement..."
                      : saveStatus === "saved"
                        ? "Enregistré!"
                        : "Enregistrer les modifications"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="hardware" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Périphériques connectés</CardTitle>
                  <CardDescription>Gérez les périphériques connectés à votre système Storei.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Imprimantes</h3>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-4 font-medium border-b">
                        <div>Nom</div>
                        <div>Type</div>
                        <div>Statut</div>
                        <div className="text-right">Action</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Printer className="h-4 w-4" />
                            <span>Imprimante Caisse</span>
                          </div>
                          <div>Thermique</div>
                          <div className="text-emerald-600">Connectée</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Configurer
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Printer className="h-4 w-4" />
                            <span>Imprimante Étiquettes</span>
                          </div>
                          <div>Étiquettes</div>
                          <div className="text-emerald-600">Connectée</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Configurer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline">Ajouter une imprimante</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Lecteurs RFID</h3>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-4 font-medium border-b">
                        <div>Nom</div>
                        <div>Emplacement</div>
                        <div>Statut</div>
                        <div className="text-right">Action</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            <span>Lecteur Entrée</span>
                          </div>
                          <div>Entrée Magasin</div>
                          <div className="text-emerald-600">Actif</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Configurer
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            <span>Lecteur Caisse</span>
                          </div>
                          <div>Caisse Principale</div>
                          <div className="text-emerald-600">Actif</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Configurer
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            <span>Lecteur Réserve</span>
                          </div>
                          <div>Réserve</div>
                          <div className="text-amber-600">Hors ligne</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Configurer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline">Ajouter un lecteur RFID</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Scanners</h3>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-4 font-medium border-b">
                        <div>Nom</div>
                        <div>Type</div>
                        <div>Statut</div>
                        <div className="text-right">Action</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            <span>Scanner Caisse</span>
                          </div>
                          <div>Code-barres</div>
                          <div className="text-emerald-600">Connecté</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Configurer
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            <span>Scanner Inventaire</span>
                          </div>
                          <div>Code-barres</div>
                          <div className="text-emerald-600">Connecté</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Configurer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline">Ajouter un scanner</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Réseau</h3>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Wifi className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="font-medium">Réseau Storei</p>
                            <p className="text-sm text-muted-foreground">Connecté - Signal fort</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Configurer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion de l'équipe</CardTitle>
                  <CardDescription>Gérez les membres de votre équipe et leurs permissions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Membres de l'équipe</h3>
                    <Button>Ajouter un membre</Button>
                  </div>

                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 font-medium border-b">
                      <div className="col-span-2">Utilisateur</div>
                      <div>Rôle</div>
                      <div>Statut</div>
                      <div className="text-right">Action</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-5 p-4 text-sm">
                        <div className="col-span-2 flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sophie Martin" />
                            <AvatarFallback>SM</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Sophie Martin</p>
                            <p className="text-xs text-muted-foreground">sophie.martin@example.com</p>
                          </div>
                        </div>
                        <div>Administrateur</div>
                        <div className="text-emerald-600">Actif</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Modifier
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 p-4 text-sm">
                        <div className="col-span-2 flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Thomas Dubois" />
                            <AvatarFallback>TD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Thomas Dubois</p>
                            <p className="text-xs text-muted-foreground">thomas.dubois@example.com</p>
                          </div>
                        </div>
                        <div>Vendeur</div>
                        <div className="text-emerald-600">Actif</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Modifier
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 p-4 text-sm">
                        <div className="col-span-2 flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Emma Petit" />
                            <AvatarFallback>EP</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Emma Petit</p>
                            <p className="text-xs text-muted-foreground">emma.petit@example.com</p>
                          </div>
                        </div>
                        <div>Gestionnaire</div>
                        <div className="text-emerald-600">Actif</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Modifier
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rôles et permissions</CardTitle>
                  <CardDescription>Définissez les rôles et les permissions pour votre équipe.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="grid grid-cols-3 p-4 font-medium border-b">
                        <div>Rôle</div>
                        <div>Description</div>
                        <div className="text-right">Action</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-3 p-4 text-sm">
                          <div className="font-medium">Administrateur</div>
                          <div>Accès complet à toutes les fonctionnalités</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Modifier
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 p-4 text-sm">
                          <div className="font-medium">Gestionnaire</div>
                          <div>Gestion des commandes, inventaire et clients</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Modifier
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 p-4 text-sm">
                          <div className="font-medium">Vendeur</div>
                          <div>Accès à la caisse et aux commandes</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Modifier
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline">Ajouter un rôle</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Intégrations</CardTitle>
                  <CardDescription>Connectez Storei à d'autres services et applications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Services connectés</h3>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-4 font-medium border-b">
                        <div>Service</div>
                        <div>Statut</div>
                        <div>Dernière synchronisation</div>
                        <div className="text-right">Action</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center">
                              <Database className="h-4 w-4 text-slate-500" />
                            </div>
                            <span>Base de données</span>
                          </div>
                          <div className="text-emerald-600">Connecté</div>
                          <div>Aujourd'hui, 10:23</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Configurer
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center">
                              <CreditCard className="h-4 w-4 text-slate-500" />
                            </div>
                            <span>Passerelle de paiement</span>
                          </div>
                          <div className="text-emerald-600">Connecté</div>
                          <div>Aujourd'hui, 09:15</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Configurer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Intégrations disponibles</h3>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium">Sécurité</p>
                            <p className="text-xs text-muted-foreground">Protection contre la fraude</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Connecter
                        </Button>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                            <Truck className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium">Livraison</p>
                            <p className="text-xs text-muted-foreground">Services de livraison</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Connecter
                        </Button>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                            <BarChart className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium">Analytiques avancées</p>
                            <p className="text-xs text-muted-foreground">Rapports et analyses</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Connecter
                        </Button>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium">Email marketing</p>
                            <p className="text-xs text-muted-foreground">Campagnes email</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Connecter
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API</CardTitle>
                  <CardDescription>Gérez vos clés API et les accès développeurs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Accès API</Label>
                        <p className="text-sm text-muted-foreground">
                          Activer l'accès à l'API Storei pour les développeurs.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Clés API</h3>

                      <div className="rounded-md border">
                        <div className="grid grid-cols-4 p-4 font-medium border-b">
                          <div>Nom</div>
                          <div>Créée le</div>
                          <div>Dernière utilisation</div>
                          <div className="text-right">Action</div>
                        </div>
                        <div className="divide-y">
                          <div className="grid grid-cols-4 p-4 text-sm">
                            <div className="font-medium">Clé principale</div>
                            <div>15/03/2023</div>
                            <div>Aujourd'hui, 10:23</div>
                            <div className="text-right">
                              <Button variant="ghost" size="sm">
                                Afficher
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 p-4 text-sm">
                            <div className="font-medium">Clé de développement</div>
                            <div>20/03/2023</div>
                            <div>Hier, 15:45</div>
                            <div className="text-right">
                              <Button variant="ghost" size="sm">
                                Afficher
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline">Générer une nouvelle clé</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="help" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Centre d'aide</CardTitle>
                  <CardDescription>Trouvez de l'aide et des ressources pour utiliser Storei.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Documentation</h3>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium">Guide de démarrage</p>
                            <p className="text-xs text-muted-foreground">Premiers pas avec Storei</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Consulter
                        </Button>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium">Tutoriels vidéo</p>
                            <p className="text-xs text-muted-foreground">Apprenez par la pratique</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Regarder
                        </Button>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                            <HelpCircle className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium">FAQ</p>
                            <p className="text-xs text-muted-foreground">Questions fréquentes</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Consulter
                        </Button>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                            <Code className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium">API Documentation</p>
                            <p className="text-xs text-muted-foreground">Pour les développeurs</p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Consulter
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Support</h3>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-medium">Contacter le support</p>
                          <p className="text-xs text-muted-foreground">Assistance personnalisée</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Contacter
                      </Button>
                    </div>

                    <div className="rounded-md border p-4 bg-slate-50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center">
                          <PhoneCall className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-medium">Support téléphonique</p>
                          <p className="text-xs text-muted-foreground">Disponible 9h-18h, Lun-Ven</p>
                          <p className="text-sm font-medium mt-1">+216 71 123 456</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Feedback</h3>

                    <div className="space-y-2">
                      <Label htmlFor="feedback">Partagez vos commentaires</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Partagez vos idées ou signaler un problème..."
                        className="min-h-[100px]"
                      />
                      <Button className="mt-2">Envoyer</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  )
}
