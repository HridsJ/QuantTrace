
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LineChart, ListChecks, Search, TrendingUp } from "lucide-react";
import { APP_NAME, APP_ROUTES } from "@/lib/constants";
import UserButton from "./user-button";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: APP_ROUTES.DASHBOARD, label: "Dashboard", icon: Home },
  { href: APP_ROUTES.SCREENER, label: "Screener", icon: Search },
  { href: APP_ROUTES.WATCHLIST, label: "Watchlist", icon: ListChecks },
  // { href: APP_ROUTES.RESULTS, label: "Results", icon: LineChart }, // Results might not be a direct nav item
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href={APP_ROUTES.DASHBOARD} className="flex items-center space-x-2">
          <TrendingUp className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-foreground">{APP_NAME}</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
