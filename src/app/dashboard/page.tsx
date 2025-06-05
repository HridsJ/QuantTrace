
import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_ROUTES } from "@/lib/constants";
import { ListChecks, Search, BarChart2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <section className="text-center py-8 rounded-lg bg-card shadow-sm">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome to TrendFinder</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your AI-powered assistant for discovering stock market patterns.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Search className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Stock Screener</CardTitle>
              </div>
              <CardDescription>
                Filter stocks using technical indicators and draw custom chart patterns to find your next big trade.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image src="https://placehold.co/600x400.png" alt="Stock Screener" width={600} height={400} className="rounded-md object-cover aspect-video" data-ai-hint="financial chart analysis" />
              <Button asChild className="mt-4 w-full">
                <Link href={APP_ROUTES.SCREENER}>Go to Screener</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <ListChecks className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">My Watchlist</CardTitle>
              </div>
              <CardDescription>
                Keep track of your favorite tickers and monitor their performance all in one place.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Image src="https://placehold.co/600x400.png" alt="Watchlist" width={600} height={400} className="rounded-md object-cover aspect-video" data-ai-hint="stock list data" />
              <Button asChild className="mt-4 w-full">
                <Link href={APP_ROUTES.WATCHLIST}>View Watchlist</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BarChart2 className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Market Insights</CardTitle>
              </div>
              <CardDescription>
                Explore AI-generated insights and discover trending patterns in the market (coming soon!).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image src="https://placehold.co/600x400.png" alt="Market Insights" width={600} height={400} className="rounded-md object-cover aspect-video" data-ai-hint="data visualization abstract" />
              <Button disabled className="mt-4 w-full">
                Explore Insights (Soon)
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
