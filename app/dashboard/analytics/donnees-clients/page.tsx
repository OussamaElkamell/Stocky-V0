"use client"

import { useState } from "react"
import { Download, Filter, ArrowUpDown, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { formatDate } from "@/utils/date-formatter"
import { SearchBar } from "@/components/ui/search-bar"
import { FilterBar } from "@/components/ui/filter-bar"

// Types
interface Customer {
  id: string
  name: string
  contact: string
  contactType: "email" | "phone"
  totalOrders: number
  totalSpent: number
  lastOrderDate: Date
}

export default function DonneesClientsPage() {
  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [period, setPeriod] = useState("all")
  const [sortBy, setSortBy] = useState<keyof Customer>("lastOrderDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Sample data
  const customers: Customer[] = [
    {
      id: "c1",
      name: "Ahmed Ben Ali",
      contact: "ahmed.benali@example.com",
      contactType: "email",
      totalOrders: 8,
      totalSpent: 1250.75,
      lastOrderDate: new Date("2023-03-15"),
    },
    {
      id: "c2",
      name: "Fatima Mansouri",
      contact: "+216 55 123 456",
      contactType: "phone",
      totalOrders: 12,
      totalSpent: 3420.5,
      lastOrderDate: new Date("2023-03-28"),
    },
    {
      id: "c3",
      name: "Mohamed Trabelsi",
      contact: "mohamed.t@example.com",
      contactType: "email",
      totalOrders: 5,
      totalSpent: 780.25,
      lastOrderDate: new Date("2023-02-10"),
    },
    {
      id: "c4",
      name: "Leila Karoui",
      contact: "+216 99 876 543",
      contactType: "phone",
      totalOrders: 3,
      totalSpent: 450.0,
      lastOrderDate: new Date("2023-01-05"),
    },
    {
      id: "c5",
      name: "Sami Bouazizi",
      contact: "sami.b@example.com",
      contactType: "email",
      totalOrders: 15,
      totalSpent: 4875.3,
      lastOrderDate: new Date("2023-03-30"),
    },
    {
      id: "c6",
      name: "Amina Gharbi",
      contact: "+216 22 345 678",
      contactType: "phone",
      totalOrders: 7,
      totalSpent: 1120.45,
      lastOrderDate: new Date("2023-03-22"),
    },
    {
      id: "c7",
      name: "Youssef Mejri",
      contact: "youssef.m@example.com",
      contactType: "email",
      totalOrders: 9,
      totalSpent: 2340.75,
      lastOrderDate: new Date("2023-03-18"),
    },
    {
      id: "c8",
      name: "Nadia Belhadj",
      contact: "+216 98 765 432",
      contactType: "phone",
      totalOrders: 4,
      totalSpent: 675.2,
      lastOrderDate: new Date("2023-02-25"),
    },
    {
      id: "c9",
      name: "Karim Chaabane",
      contact: "karim.c@example.com",
      contactType: "email",
      totalOrders: 6,
      totalSpent: 890.6,
      lastOrderDate: new Date("2023-02-15"),
    },
    {
      id: "c10",
      name: "Salma Riahi",
      contact: "+216 54 321 987",
      contactType: "phone",
      totalOrders: 11,
      totalSpent: 2980.15,
      lastOrderDate: new Date("2023-03-25"),
    },
    {
      id: "c11",
      name: "Tarek Meddeb",
      contact: "tarek.m@example.com",
      contactType: "email",
      totalOrders: 2,
      totalSpent: 320.5,
      lastOrderDate: new Date("2023-01-20"),
    },
    {
      id: "c12",
      name: "Rania Jebali",
      contact: "+216 21 654 987",
      contactType: "phone",
      totalOrders: 10,
      totalSpent: 2450.8,
      lastOrderDate: new Date("2023-03-12"),
    },
    {
      id: "c13",
      name: "Bilel Hamdi",
      contact: "bilel.h@example.com",
      contactType: "email",
      totalOrders: 8,
      totalSpent: 1680.4,
      lastOrderDate: new Date("2023-03-05"),
    },
    {
      id: "c14",
      name: "Ines Sassi",
      contact: "+216 97 123 456",
      contactType: "phone",
      totalOrders: 5,
      totalSpent: 920.75,
      lastOrderDate: new Date("2023-02-28"),
    },
    {
      id: "c15",
      name: "Hichem Bouzid",
      contact: "hichem.b@example.com",
      contactType: "email",
      totalOrders: 13,
      totalSpent: 3750.25,
      lastOrderDate: new Date("2023-03-27"),
    },
  ]

  // Filter customers based on search query and period
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchQuery.toLowerCase())

    if (period === "all") return matchesSearch

    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), 1)

    if (period === "month" && customer.lastOrderDate >= lastMonth) return matchesSearch
    if (period === "year" && customer.lastOrderDate >= lastYear) return matchesSearch

    return period === "all" && matchesSearch
  })

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === "name" || sortBy === "contact") {
      return sortDirection === "asc" ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy])
    } else {
      return sortDirection === "asc"
        ? (a[sortBy] as number) - (b[sortBy] as number)
        : (b[sortBy] as number) - (a[sortBy] as number)
    }
  })

  // Paginate customers
  const paginatedCustomers = sortedCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Total pages
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)

  // Handle sort
  const handleSort = (column: keyof Customer) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  // Handle export
  const handleExport = () => {
    // In a real application, this would generate and download a CSV/Excel file
    console.log("Exporting customer data...")
    alert("Export des données clients en cours...")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Données Clients</h1>
          <p className="text-muted-foreground">Analysez les informations de vos clients et leurs habitudes d'achat</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
        </div>
      </div>

      <FilterBar>
        <SearchBar
          placeholder="Rechercher un client..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="md:w-80"
        />

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les périodes</SelectItem>
            <SelectItem value="month">Dernier mois</SelectItem>
            <SelectItem value="year">Dernière année</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto text-sm text-muted-foreground">
          {filteredCustomers.length} client{filteredCustomers.length !== 1 ? "s" : ""} trouvé
          {filteredCustomers.length !== 1 ? "s" : ""}
        </div>
      </FilterBar>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                    Nom complet
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("contact")}>
                    Contact
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("totalOrders")}>
                    Commandes
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("totalSpent")}>
                    Montant total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("lastOrderDate")}>
                    Dernière commande
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <span className="flex items-center">
                        {customer.contact}
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({customer.contactType === "email" ? "Email" : "Tél"})
                        </span>
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{customer.totalOrders}</TableCell>
                    <TableCell className="text-right">{customer.totalSpent.toFixed(2)} TND</TableCell>
                    <TableCell className="text-right">{formatDate(customer.lastOrderDate)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Voir détails</DropdownMenuItem>
                          <DropdownMenuItem>Historique commandes</DropdownMenuItem>
                          <DropdownMenuItem>Contacter</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Aucun client trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-end p-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(i + 1)
                        }}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
