"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useState, useRef } from "react";

function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function ShortUrlPage() {
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const largeUrlRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLTextAreaElement>(null);

  const shareUrl = async () => {
    const longUrl = largeUrlRef.current?.value.trim();
    if (!longUrl || !validateUrl(longUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const short = "abcdefghijklmnopqrstuvwxyz";
      const capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "0123456789";
      const all = short + capital + numbers;
      let result = "";
      for (let i = 0; i < 8; i++) {
        result += all[Math.floor(Math.random() * all.length)];
      }

      const { error } = await supabase
        .from("shorturls")
        .insert([{ id: result, large_url: longUrl, created_at: new Date().toISOString() }]);

      if (error) {
        toast.error("Error sharing URL: " + error.message);
      } else {
        setSharedUrl(`${window.location.origin}/${result}`);
        toast.success("URL shortened successfully!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyUrl = () => {
    if (urlRef.current) {
      urlRef.current.select();
      navigator.clipboard.writeText(urlRef.current.value);
      toast.success("URL copied to clipboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)] p-4">
      <Toaster richColors closeButton position="bottom-right" expand={true} />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>URL Shortener</CardTitle>
          <CardDescription>
            Shorten your long URLs to shareable links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="largeUrlArea">Your Long URL</Label>
              <Textarea
                ref={largeUrlRef}
                placeholder="Enter long URL here (e.g. https://example.com)"
                id="largeUrlArea"
                rows={4}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={shareUrl}
              disabled={isLoading}
              className="w-full bg-purple-500 text-white hover:bg-purple-400 dark:bg-purple-800 dark:hover:bg-purple-700"
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </Button>
          </div>
          {sharedUrl && (
            <div className="mt-6 flex items-center space-x-2">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="url">Shortened URL</Label>
                <Textarea
                  ref={urlRef}
                  id="url"
                  readOnly
                  value={sharedUrl}
                  className="flex-grow"
                />
              </div>
              <Button onClick={copyUrl} size="icon" className="h-full bg-blue-300">
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy URL</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}