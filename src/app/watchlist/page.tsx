
"use client";

import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2, TrendingUp, TrendingDown, MinusSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface WatchlistItem {
  id: string;
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// Mock data - in a real app, this would come from an API / Firebase
const mockWatchlistData: WatchlistItem[] = [
  { id: "1", ticker: "AAPL", name: "Apple Inc.", price: 170.34, change: 1.23, changePercent: 0.72 },
  { id: "2", ticker: "MSFT", name: "Microsoft Corp.", price: 300.56, change: -0.50, changePercent: -0.17 },
  { id: "3", ticker: "GOOGL", name: "Alphabet Inc.", price: 2500.89, change: 10.45, changePercent: 0.42 },
];


export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [newTicker, setNewTicker] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching watchlist data
    setWatchlist(mockWatchlistData);
  }, []);

  const handleAddTicker = () => {
    if (!newTicker.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Ticker symbol cannot be empty." });
      return;
    }
    // Simulate adding a new ticker (in a real app, fetch data for this ticker)
    const newItem: WatchlistItem = {
      id: (watchlist.length + 1).toString(),
      ticker: newTicker.toUpperCase(),
      name: `${newTicker.toUpperCase()} Company`, // Placeholder name
      price: Math.random() * 1000, // Placeholder price
      change: (Math.random() * 10) - 5, // Placeholder change
      changePercent: (Math.random() * 2) - 1, // Placeholder change percent
    };
    setWatchlist([...watchlist, newItem]);
    setNewTicker("");
    toast({ title: "Success", description: `${newItem.ticker} added to watchlist.` });
  };

  const handleRemoveTicker = (id: string) => {
    const tickerToRemove = watchlist.find(item => item.id === id)?.ticker;
    setWatchlist(watchlist.filter(item => item.id !== id));
    toast({ title: "Removed", description: `${tickerToRemove} removed from watchlist.` });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">My Watchlist</CardTitle>
            <CardDescription>Track your favorite stocks and their performance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter Ticker (e.g., AAPL)"
                value={newTicker}
                onChange={(e) => setNewTicker(e.target.value)}
                className="max-w-xs"
              />
              <Button onClick={handleAddTicker}><PlusCircle className="mr-2 h-4 w-4" /> Add Ticker</Button>
            </div>

            {watchlist.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-muted rounded-lg">
                 <Image src="https://placehold.co/300x200.png" alt="Empty Watchlist" width={300} height={200} className="mx-auto mb-4 rounded-md opacity-70" data-ai-hint="empty list data" />
                <p className="text-muted-foreground text-lg">Your watchlist is empty.</p>
                <p className="text-sm text-muted-foreground">Add tickers using the input above to start tracking stocks.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">% Change</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {watchlist.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.ticker}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className={`text-right font-medium ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <span className="inline-flex items-center">
                            {item.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                            {item.change.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.changePercent.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveTicker(item.id)} aria-label={`Remove ${item.ticker}`}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
