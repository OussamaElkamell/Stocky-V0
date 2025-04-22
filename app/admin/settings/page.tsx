"use client"

import type React from "react"

import { useState } from "react"
import {
  Users,
  Upload,
  Download,
  Save,
  RefreshCw,
  Edit,
  Trash2,
  Key,
  FileText,
  Database,
  HardDrive,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

// Schéma de validation pour le formulaire d'identité
const platformIdentitySchema = z.object({
  projectName: z.string().min(2, {
    message: "Le nom du projet doit contenir au moins 2 caractères.",
  }),
  siteUrl: z.string().url({
    message: "Veuillez entrer une URL valide.",
  }),
  supportEmail: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  supportPhone: z.string().optional(),
})

// Données fictives pour les utilisateurs
const mockUsers = [
  {
    id: 1,
    name: "Ahmed Ben Ali",
    email: "ahmed@storei.com",
    role: "super_admin",
    lastLogin: "2023-05-15T10:30:00",
    avatar: "/bearded-man-portrait.png",
  },
  {
    id: 2,
    name: "Fatima Mansouri",
    email: "fatima@storei.com",
    role: "admin_client",
    lastLogin: "2023-05-14T14:45:00",
    avatar: "/confident-woman.png",
  },
  {
    id: 3,
    name: "Youssef Khelifi",
    email: "youssef@example.com",
    role: "user",
    lastLogin: "2023-05-13T09:15:00",
    avatar: "/thoughtful-coder.png",
  },
  {
    id: 4,
    name: "Leila Trabelsi",
    email: "leila@example.com",
    role: "admin_client",
    lastLogin: "2023-05-12T16:20:00",
    avatar: "/flowing-locks.png",
  },
  {
    id: 5,
    name: "Karim Benzarti",
    email: "karim@example.com",
    role: "user",
    lastLogin: "2023-05-11T11:10:00",
    avatar: "/curly-haired-avatar.png",
  },
]

export default function SettingsPage() {
  // État pour le logo
  const [logo, setLogo] = useState<string | null>("/images/v0-dev-logo.png")
  const [logoFile, setLogoFile] = useState<File | null>(null)

  // État pour les utilisateurs
  const [users, setUsers] = useState(mockUsers)

  // États pour les dialogues
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false)
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [newRole, setNewRole] = useState<string>("")
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [exportType, setExportType] = useState<string>("")
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false)
  const [backupFile, setBackupFile] = useState<File | null>(null)

  // Formulaire pour l'identité de la plateforme
  const form = useForm<z.infer<typeof platformIdentitySchema>>({
    resolver: zodResolver(platformIdentitySchema),
    defaultValues: {
      projectName: "Storei",
      siteUrl: "https://storei.app",
      supportEmail: "support@storei.app",
      supportPhone: "+216 71 123 456",
    },
  })

  // Fonction pour gérer le changement de logo
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Fonction pour sauvegarder l'identité de la plateforme
  const onSubmitIdentity = (values: z.infer<typeof platformIdentitySchema>) => {
    // Simuler une sauvegarde
    setTimeout(() => {
      toast({
        title: "Paramètres sauvegardés",
        description: "Les paramètres d'identité de la plateforme ont été mis à jour avec succès.",
      })
    }, 1000)
  }

  // Fonction pour ouvrir le dialogue de modification de rôle
  const openEditRoleDialog = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setEditRoleDialogOpen(true)
  }

  // Fonction pour ouvrir le dialogue de suppression d'utilisateur
  const openDeleteUserDialog = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user)
    setDeleteUserDialogOpen(true)
  }

  // Fonction pour ouvrir le dialogue de réinitialisation de mot de passe
  const openResetPasswordDialog = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user)
    setResetPasswordDialogOpen(true)
  }

  // Fonction pour changer le rôle d'un utilisateur
  const changeUserRole = () => {
    if (selectedUser && newRole) {
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, role: newRole } : user)))
      setEditRoleDialogOpen(false)
      toast({
        title: "Rôle modifié",
        description: `Le rôle de ${selectedUser.name} a été changé en ${newRole}.`,
      })
    }
  }

  // Fonction pour supprimer un utilisateur
  const deleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setDeleteUserDialogOpen(false)
      toast({
        title: "Utilisateur supprimé",
        description: `${selectedUser.name} a été supprimé avec succès.`,
        variant: "destructive",
      })
    }
  }

  // Fonction pour réinitialiser le mot de passe d'un utilisateur
  const resetUserPassword = () => {
    if (selectedUser) {
      setResetPasswordDialogOpen(false)
      toast({
        title: "Mot de passe réinitialisé",
        description: `Un email de réinitialisation a été envoyé à ${selectedUser.email}.`,
      })
    }
  }

  // Fonction pour ouvrir le dialogue d'export
  const openExportDialog = (type: string) => {
    setExportType(type)
    setExportDialogOpen(true)
  }

  // Fonction pour exporter des données
  const exportData = () => {
    setExportDialogOpen(false)

    // Simuler un téléchargement
    setTimeout(() => {
      toast({
        title: "Export réussi",
        description: `Les données ont été exportées avec succès.`,
      })
    }, 1000)
  }

  // Fonction pour gérer le changement de fichier de sauvegarde
  const handleBackupFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setBackupFile(file)
    }
  }

  // Fonction pour restaurer une sauvegarde
  const restoreBackup = () => {
    if (backupFile) {
      setRestoreDialogOpen(false)

      // Simuler une restauration
      setTimeout(() => {
        toast({
          title: "Restauration réussie",
          description: "La sauvegarde a été restaurée avec succès.",
        })
      }, 2000)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paramètres du système</h1>
        <p className="text-muted-foreground">Configurez les paramètres globaux de la plateforme Storei.</p>
      </div>

      <Tabs defaultValue="identity" className="space-y-6">
        <TabsList>
          <TabsTrigger value="identity">Identité</TabsTrigger>
          <TabsTrigger value="roles">Gestion des rôles</TabsTrigger>
          <TabsTrigger value="backup">Sauvegarde & Export</TabsTrigger>
        </TabsList>

        {/* Onglet Identité de la plateforme */}
        <TabsContent value="identity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Identité de la plateforme</CardTitle>
              <CardDescription>Configurez les informations d'identité de votre plateforme Storei.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitIdentity)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du projet</FormLabel>
                          <FormControl>
                            <Input placeholder="Storei" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label htmlFor="logo">Logo</Label>
                      <div className="mt-1 flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          {logo && (
                            <img src={logo || "/placeholder.svg"} alt="Logo" className="h-full w-full object-contain" />
                          )}
                        </div>
                        <Label
                          htmlFor="logo-upload"
                          className="cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                        >
                          Changer
                        </Label>
                        <Input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleLogoChange}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="siteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL du site</FormLabel>
                          <FormControl>
                            <Input placeholder="https://storei.app" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="supportEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email du support</FormLabel>
                          <FormControl>
                            <Input placeholder="support@storei.app" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="supportPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone d'assistance (optionnel)</FormLabel>
                          <FormControl>
                            <Input placeholder="+216 71 123 456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="mt-4">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder les modifications
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Gestion des rôles */}
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des rôles</CardTitle>
              <CardDescription>Gérez les rôles des utilisateurs et leurs permissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Rôles disponibles</h3>
                <div className="mt-2 grid gap-2 md:grid-cols-3">
                  <div className="rounded-md border p-3">
                    <div className="font-medium">super_admin</div>
                    <p className="text-sm text-muted-foreground">Accès total à toutes les fonctionnalités</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="font-medium">admin_client</div>
                    <p className="text-sm text-muted-foreground">Admin d'un compte entreprise</p>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="font-medium">user</div>
                    <p className="text-sm text-muted-foreground">Utilisateur normal avec accès limité</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Utilisateurs</h3>
                  <div className="relative w-64">
                    <Input type="search" placeholder="Rechercher un utilisateur..." className="pl-8" />
                    <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="mt-4 rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Dernière connexion</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "super_admin"
                                  ? "destructive"
                                  : user.role === "admin_client"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(user.lastLogin).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="icon" onClick={() => openEditRoleDialog(user)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Modifier le rôle</span>
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => openResetPasswordDialog(user)}>
                                <Key className="h-4 w-4" />
                                <span className="sr-only">Réinitialiser le mot de passe</span>
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => openDeleteUserDialog(user)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Supprimer</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dialogue de modification de rôle */}
          <Dialog open={editRoleDialogOpen} onOpenChange={setEditRoleDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier le rôle</DialogTitle>
                <DialogDescription>Changer le rôle de {selectedUser?.name}.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={newRole} onValueChange={setNewRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">super_admin</SelectItem>
                      <SelectItem value="admin_client">admin_client</SelectItem>
                      <SelectItem value="user">user</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditRoleDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={changeUserRole}>Enregistrer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialogue de suppression d'utilisateur */}
          <Dialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Supprimer l'utilisateur</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer {selectedUser?.name} ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteUserDialogOpen(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={deleteUser}>
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialogue de réinitialisation de mot de passe */}
          <Dialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Réinitialiser le mot de passe</DialogTitle>
                <DialogDescription>
                  Envoyer un email de réinitialisation de mot de passe à {selectedUser?.email}.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setResetPasswordDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={resetUserPassword}>Envoyer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Onglet Sauvegarde & Export */}
        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sauvegarde & Export</CardTitle>
              <CardDescription>
                Exportez les données de votre plateforme ou créez des sauvegardes complètes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Utilisateurs</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">Exporter tous les utilisateurs au format CSV.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => openExportDialog("users")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Exporter
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Logs système</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">Exporter tous les logs système au format JSON.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => openExportDialog("logs")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Exporter
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Sauvegarde complète</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Télécharger une sauvegarde complète de la plateforme.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => openExportDialog("backup")}>
                      <Database className="mr-2 h-4 w-4" />
                      Télécharger
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Restaurer</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">Restaurer la plateforme à partir d'une sauvegarde.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setRestoreDialogOpen(true)}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restaurer
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-6 rounded-md border p-4 bg-amber-50">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-amber-100 p-1">
                    <HardDrive className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-800">Sauvegarde automatique</h3>
                    <p className="text-sm text-amber-700 mt-1">
                      Les sauvegardes automatiques sont effectuées quotidiennement à 3h00 du matin. Les 7 dernières
                      sauvegardes sont conservées. Vous pouvez télécharger ces sauvegardes à tout moment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dialogue d'export */}
          <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {exportType === "users"
                    ? "Exporter les utilisateurs"
                    : exportType === "logs"
                      ? "Exporter les logs"
                      : "Télécharger une sauvegarde complète"}
                </DialogTitle>
                <DialogDescription>
                  {exportType === "users"
                    ? "Vous êtes sur le point d'exporter tous les utilisateurs au format CSV."
                    : exportType === "logs"
                      ? "Vous êtes sur le point d'exporter tous les logs système au format JSON."
                      : "Vous êtes sur le point de télécharger une sauvegarde complète de la plateforme."}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  Cette opération peut prendre quelques instants en fonction de la quantité de données.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={exportData}>
                  <Download className="mr-2 h-4 w-4" />
                  {exportType === "backup" ? "Télécharger" : "Exporter"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialogue de restauration */}
          <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Restaurer une sauvegarde</DialogTitle>
                <DialogDescription>
                  Restaurer la plateforme à partir d'une sauvegarde. Cette action remplacera toutes les données
                  actuelles.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="backup-file">Fichier de sauvegarde</Label>
                <div className="flex items-center gap-2">
                  <Input id="backup-file" type="file" accept=".zip,.sql,.backup" onChange={handleBackupFileChange} />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-destructive font-medium">
                  Attention : Cette action est irréversible et remplacera toutes les données actuelles.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRestoreDialogOpen(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={restoreBackup} disabled={!backupFile}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restaurer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  )
}
