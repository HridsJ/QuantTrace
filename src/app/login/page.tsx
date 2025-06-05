
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "@/components/auth/auth-form";
import { auth } from "@/lib/firebase";
import { APP_NAME, APP_ROUTES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(APP_ROUTES.DASHBOARD);
    }
  }, [user, authLoading, router]);


  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push(APP_ROUTES.DASHBOARD);
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password. Please try again.";
      }
      toast({ variant: "destructive", title: "Login Failed", description: errorMessage });
    } finally {
      setLoading(false);
    }
  };
  
  if (authLoading || (!authLoading && user) ) {
    return (
      <div className="flex h-screen items-center justify-center">
         <TrendingUp className="h-12 w-12 animate-pulse text-primary" />
      </div>
    );
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <TrendingUp className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">{APP_NAME}</CardTitle>
          <CardDescription>Log in to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href={APP_ROUTES.SIGNUP} className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
