"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { APP_ROUTES } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton"; // Using Skeleton for loading

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace(APP_ROUTES.DASHBOARD);
      } else {
        router.replace(APP_ROUTES.LOGIN);
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-background p-4">
      <Skeleton className="h-12 w-1/2 rounded-md" />
      <Skeleton className="h-8 w-1/3 rounded-md" />
      <div className="flex space-x-2 pt-4">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  );
}
