
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import MainNav from "./main-nav";
import { APP_ROUTES } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton"; // Full page loader content

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(APP_ROUTES.LOGIN);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen flex-col">
        {/* Placeholder for Navbar structure during loading */}
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95">
          <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
            <Skeleton className="h-8 w-32" /> {/* App Name Placeholder */}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-20" /> {/* Nav Item Placeholder */}
              <Skeleton className="h-8 w-20" /> {/* Nav Item Placeholder */}
              <Skeleton className="h-10 w-10 rounded-full" /> {/* UserButton Placeholder */}
            </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNav />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </footer>
    </div>
  );
}
