'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { InventoryProvider } from "@/components/inventory/inventory-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid rendering until client-side mount

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <InventoryProvider>{children}</InventoryProvider>
    </ThemeProvider>
  );
}
