
"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eraser, Edit3, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Simple line drawing tool for the canvas
interface Point {
  x: number;
  y: number;
}

export default function PatternCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPaths, setDrawnPaths] = useState<Point[][]>([]); // Store multiple paths
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const { toast } = useToast();

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    return canvas?.getContext("2d");
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = getCanvasContext();
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw placeholder grid
    ctx.strokeStyle = "hsl(var(--border))";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    ctx.strokeStyle = "hsl(var(--primary))"; // Use primary color for drawing
    ctx.lineWidth = 2.5; // Slightly thicker line
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    [...drawnPaths, currentPath].forEach(path => {
      if (path.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();
    });
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set canvas size based on parent container for responsiveness
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = Math.min(parent.clientWidth * 0.6, 400); // Maintain aspect ratio, max height 400px
      }
    }
    redrawCanvas();
  }, [drawnPaths, currentPath]); // Redraw when paths change or canvas resizes via parent

  useEffect(() => {
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (canvas && canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = Math.min(canvas.parentElement.clientWidth * 0.6, 400);
            redrawCanvas();
        }
    };
    window.addEventListener('resize', handleResize);
    // Initial draw
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawCanvas]);


  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setIsDrawing(true);
    setCurrentPath([{ x, y }]);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCurrentPath(prevPath => [...prevPath, { x, y }]);
  };

  const stopDrawing = () => {
    if (isDrawing && currentPath.length > 1) {
      setDrawnPaths(prevPaths => [...prevPaths, currentPath]);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const clearCanvas = () => {
    setDrawnPaths([]);
    setCurrentPath([]);
    const canvas = canvasRef.current;
    const ctx = getCanvasContext();
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      redrawCanvas(); // Redraw grid
    }
    toast({ title: "Canvas Cleared", description: "Your drawing has been reset." });
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = 'trendfinder-pattern.png';
      link.href = image;
      link.click();
      toast({ title: "Drawing Downloaded", description: "Pattern saved as PNG." });
    }
  };

  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl flex items-center"><Edit3 className="mr-2 h-5 w-5 text-primary" />Draw Your Pattern</CardTitle>
        <CardDescription>Sketch the chart pattern you&apos;re looking for. The AI will try to find similar historical patterns.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center p-2 sm:p-4">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing} // Stop drawing if mouse leaves canvas
          className="border border-primary rounded-md shadow-inner bg-card w-full h-full cursor-crosshair"
          // Width and height are set in useEffect based on parent
        />
      </CardContent>
      <div className="p-4 flex justify-end space-x-2 border-t">
        <Button variant="outline" onClick={clearCanvas} title="Clear Canvas">
          <Eraser className="mr-2 h-4 w-4" /> Clear
        </Button>
        <Button variant="outline" onClick={downloadDrawing} title="Download Drawing">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>
    </Card>
  );
}
