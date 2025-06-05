
import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, BarChartHorizontalBig } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_ROUTES } from "@/lib/constants";

// Mock results data
const mockResults = [
  { id: "1", ticker: "XYZ", name: "XYZ Corp", matchScore: 92, reason: "Strong bullish pennant formation detected.", chartUrl: "https://placehold.co/300x150.png", dataAiHint: "stock chart uptrend" },
  { id: "2", ticker: "ABC", name: "ABC Solutions", matchScore: 85, reason: "Inverse head and shoulders pattern, breakout imminent.", chartUrl: "https://placehold.co/300x150.png", dataAiHint: "chart pattern analysis"},
  { id: "3", ticker: "LMN", name: "LMN Industries", matchScore: 78, reason: "Consolidation phase, potential for upward movement.", chartUrl: "https://placehold.co/300x150.png", dataAiHint: "candlestick chart" },
];

// const mockResults: any[] = []; // To test empty state

export default function ResultsPage() {
  const results = mockResults; // In a real app, this would come from props or state updated by AI

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold flex items-center">
              <BarChartHorizontalBig className="mr-3 h-8 w-8 text-primary" />
              Screening Results
            </CardTitle>
            <CardDescription>
              Based on your filters and drawn pattern, here are the potential matches.
            </CardDescription>
          </CardHeader>
        </Card>

        {results.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Matches Found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn&apos;t find any stocks matching your criteria. Try adjusting your filters or redrawing your pattern.
              </p>
              <Button asChild>
                <Link href={APP_ROUTES.SCREENER}>Back to Screener</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((stock) => (
              <Card key={stock.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{stock.ticker}</CardTitle>
                      <CardDescription>{stock.name}</CardDescription>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <CheckCircle2 className="h-4 w-4 mr-1" /> {stock.matchScore}% Match
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Image 
                    src={stock.chartUrl} 
                    alt={`${stock.ticker} chart`} 
                    width={300} 
                    height={150} 
                    className="w-full rounded-md border object-cover mb-3 aspect-video"
                    data-ai-hint={stock.dataAiHint}
                  />
                  <p className="text-sm text-muted-foreground">{stock.reason}</p>
                  <Button variant="outline" size="sm" className="mt-3 w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
