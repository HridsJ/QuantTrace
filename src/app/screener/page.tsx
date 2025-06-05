
import AppLayout from "@/components/layout/app-layout";
import FilterPanel from "@/components/screener/filter-panel";
import PatternCanvas from "@/components/screener/pattern-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit } from "lucide-react";

export default function ScreenerPage() {
  const handleFindMatches = () => {
    // Placeholder for AI pattern matching logic
    // This would involve getting data from FilterPanel and PatternCanvas
    // and then calling an AI service. Results would navigate to APP_ROUTES.RESULTS
    alert("Finding matches based on filters and drawn pattern... (Not implemented yet)");
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Stock Screener & Pattern Finder</CardTitle>
            <CardDescription>
              Define your criteria using technical filters and draw chart patterns to uncover potential opportunities.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel />
          </div>
          <div className="lg:col-span-2">
            <PatternCanvas />
          </div>
        </div>

        <Separator />

        <div className="flex justify-end">
          <Button size="lg" onClick={handleFindMatches} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <BrainCircuit className="mr-2 h-5 w-5" />
            Find Matching Stocks
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
