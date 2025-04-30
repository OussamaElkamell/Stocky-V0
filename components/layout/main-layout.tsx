"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Home,
  LineChart,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Store,
  User,
  Users,
  Radio,
  CreditCard,
  Smartphone,
  LayoutGrid,
  ChevronDown,
  QrCode,
  Truck,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Handle mobile sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  // Navigation items
  const navItems = [
    {
      icon: <Home />,
      label: "Tableau de bord",
      href: "/dashboard",
    },
    {
      icon: <CreditCard />,
      label: "Caisse",
      href: "/dashboard/caisse",
    },
    {
      icon: <Package />,
      label: "Produits",
      href: "/dashboard/inventory",
    },
    {
      icon: <ShoppingCart />,
      label: "Commandes",
      href: "/dashboard/commandes",
    },
    {
      icon: <Users />,
      label: "Clients",
      href: "/dashboard/espace-client",
    },
    {
      icon: <LineChart />,
      label: "Analytiques",
      href: "/dashboard/analytics",
    },
    {
      icon: <Smartphone />,
      label: "Inventaire & Localisation",
      href: "/dashboard/rfid",
    },
    {
      icon: <LayoutGrid />,
      label: "Website Builder",
      href: "/dashboard/website-builder",
    },
    {
      icon: <Radio />,
      label: "Communication",
      href: "/walkie-talkie",
    },
    {
      icon: <Settings />,
      label: "Paramètres",
      href: "/dashboard/settings",
    },
  ];

  // Add a new state for the logout confirmation dialog
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  // Add a function to handle the actual logout
  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("storei-auth-token");
    sessionStorage.removeItem("storei-auth-token");

    // In a real app, you might also want to call a logout API endpoint
    // fetch("/api/auth/logout", { method: "POST" });

    // Redirect to landing page
    window.location.href = "/landing";
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-white transition-all duration-300 hidden md:block`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-emerald-400" />
            <span className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>
              Stocky
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 px-2">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={
                  pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== "/dashboard")
                }
                
                isCollapsed={!isSidebarOpen}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-emerald-400" />
            <span className="font-bold text-xl">Storei</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="text-white hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 px-2">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={
                  pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== "/dashboard")
                }
                
                isCollapsed={false}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-4 md:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center md:hidden">
              <Store className="h-6 w-6 text-emerald-400" />
              <span className="font-bold text-xl ml-2">Storei</span>
            </div>

            <div className="relative w-full max-w-md ml-4 md:ml-0">
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8 w-full bg-slate-50 hidden md:block"
              />
            </div>

            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent active:bg-transparent">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-rose-500"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="User"
                      />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      (window.location.href = "/dashboard/settings")
                    }
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setShowLogoutConfirmation(true)}
                  >
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog
                open={showLogoutConfirmation}
                onOpenChange={setShowLogoutConfirmation}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirmer la déconnexion</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir vous déconnecter ? Toutes les
                      modifications non enregistrées seront perdues.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex space-x-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowLogoutConfirmation(false)}
                    >
                      Annuler
                    </Button>
                    <Button variant="destructive" onClick={handleLogout}>
                      Déconnexion
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

// Component for navigation items
function NavItem({
  icon,
  label,
  href,
  isActive = false,
  isCollapsed = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Check if this is a nav item with subpages
  const isCommandes = href === "/dashboard/commandes";
  const isWebsiteBuilder = href === "/dashboard/website-builder";
  const isRfid = href === "/dashboard/rfid";
  const isAnalytics = href === "/dashboard/analytics";
  const isSettings = href === "/dashboard/settings";
  const hasSubpages = isWebsiteBuilder || isRfid || isAnalytics || isSettings;

  // Define subpages based on the nav item
  const subpages = isCommandes
    ? []
    : isWebsiteBuilder
    ? [
        {
          label: "Build with AI",
          href: "/dashboard/website-builder/build-with-ai",
        },
        { label: "Create my store", href: "/dashboard/website-builder" },
      ]
    : isRfid
    ? [
        {
          label: "Générateur de Codes",
          href: "/dashboard/rfid/code-generator",
          icon: <QrCode className="h-4 w-4 mr-1" />,
        },
      ]
    : isAnalytics
    ? [
        {
          label: "Données Clients",
          href: "/dashboard/analytics/donnees-clients",
        },
      ]
    : isSettings
    ? [
        {
          label: "Livraison",
          href: "/dashboard/settings/livraison",
          icon: <Truck className="h-4 w-4 mr-1" />,
        },
        {
          label: "Marketing",
          href: "/dashboard/settings/marketing",
          icon: <BarChart3 className="h-4 w-4 mr-1" />,
        },
      ]
    : [];

  // Check if any subpage is active
  const hasActiveSubpage = subpages.some(
    (subpage) =>
      pathname === subpage.href || pathname.startsWith(`${subpage.href}/`)
  );

  // Determine if this item should show subpages
  const showSubpages = hasSubpages && !isCollapsed && (isOpen || hasActiveSubpage);
  useEffect(() => {
    if (isCollapsed) {
      setIsOpen(false);
    }
  }, [isCollapsed, hasSubpages]);

  return (
    <div>
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
          isActive
            ? "bg-slate-800 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`}
        onClick={(e) => {
          if (hasSubpages && !isCollapsed) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center">{icon}</span>
        {!isCollapsed && (
          <div className="flex flex-1 items-center justify-between">
            <span>{label}</span>
            {hasSubpages && !isCollapsed && (
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
        )}
      </Link>

      {showSubpages && (
        <div className="ml-9 mt-1 space-y-1">
          {subpages.map((subpage) => (
            <Link
              key={subpage.href}
              href={subpage.href}
              className={`block rounded-lg px-3 py-1.5 text-sm transition-all ${
                pathname === subpage.href ||
                pathname.startsWith(`${subpage.href}/`)
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <>
                {subpage.icon}
                {subpage.label}
              </>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
