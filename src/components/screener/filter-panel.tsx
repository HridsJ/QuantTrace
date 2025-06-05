
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Filter, RotateCcw } from "lucide-react";

const sectors = ["Technology", "Healthcare", "Financials", "Industrials", "Consumer Discretionary", "Energy"];

export default function FilterPanel() {
  const [marketCap, setMarketCap] = useState<[number, number]>([50, 500]); // Example: $50B to $500B
  const [peRatio, setPeRatio] = useState<[number, number]>([10, 30]);
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [dividendYield, setDividendYield] = useState<number>(0); // Example: 0% to 10%
  const [volume, setVolume] = useState<number>(100000); // Minimum volume

  const resetFilters = () => {
    setMarketCap([50, 500]);
    setPeRatio([10, 30]);
    setSelectedSector("");
    setDividendYield(0);
    setVolume(100000);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl flex items-center"><Filter className="mr-2 h-5 w-5 text-primary" />Filter Options</CardTitle>
          <CardDescription>Refine your search with these criteria.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={resetFilters} title="Reset Filters">
          <RotateCcw className="h-4 w-4 mr-1" /> Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">Fundamental Indicators</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="marketCap">Market Cap (Billions USD): ${marketCap[0]}B - ${marketCap[1]}B</Label>
                <Slider
                  id="marketCap"
                  min={1}
                  max={2000}
                  step={10}
                  value={marketCap}
                  onValueChange={(value) => setMarketCap(value as [number, number])}
                  className="py-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="peRatio">P/E Ratio: {peRatio[0]} - {peRatio[1]}</Label>
                <Slider
                  id="peRatio"
                  min={0}
                  max={100}
                  step={1}
                  value={peRatio}
                  onValueChange={(value) => setPeRatio(value as [number, number])}
                  className="py-2"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">Technical & Other</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Any Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Sector</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dividendYield">Min. Dividend Yield (%): {dividendYield}%</Label>
                <Slider
                  id="dividendYield"
                  min={0}
                  max={15}
                  step={0.1}
                  value={[dividendYield]}
                  onValueChange={(value) => setDividendYield(value[0])}
                  className="py-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">Min. Average Volume</Label>
                <Input
                  id="volume"
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  placeholder="e.g., 100000"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">Pattern Specifics (AI)</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
               <div className="items-top flex space-x-2">
                <Checkbox id="breakout" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="breakout"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Prioritize Breakout Patterns
                  </label>
                  <p className="text-xs text-muted-foreground">
                    AI will look for patterns indicating a potential breakout.
                  </p>
                </div>
              </div>
               <div className="items-top flex space-x-2">
                <Checkbox id="consolidation" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="consolidation"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Identify Consolidation Zones
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Highlights stocks currently in a consolidation phase.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
