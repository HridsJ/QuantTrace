
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AuthForm from "@/components/auth/auth-form";
import { auth } from "@/lib/firebase";
import { APP_NAME, APP_ROUTES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // For display name
import { Label } from "@/components/ui/label"; // For display name
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(APP_ROUTES.DASHBOARD);
    }
  }, [user, authLoading, router]);


  const handleSignup = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      if (userCredential.user && displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      toast({ title: "Signup Successful", description: "Welcome to TrendFinder!" });
      router.push(APP_ROUTES.DASHBOARD);
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please try logging in.";
      }
      toast({ variant: "destructive", title: "Signup Failed", description: errorMessage });
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
          <CardDescription>Create your account to start finding trends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name (Optional)</Label>
            <Input 
              id="displayName" 
              placeholder="Your Name" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)} 
            />
          </div>
          <AuthForm mode="signup" onSubmit={handleSignup} loading={loading} />
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href={APP_ROUTES.LOGIN} className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
