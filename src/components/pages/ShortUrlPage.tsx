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
import { useState, useRef } from "react";
import PocketBase from "pocketbase";

// Fix: use import.meta.env
const pb = new PocketBase(import.meta.env.PUBLIC_POCKETBASE_URL);

function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Generate a random alphanumeric string of given length
function generateSlug(length: number = 8): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
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
      let slug: string;
      let attempts = 0;
      const maxAttempts = 5;
      let record = null;

      // Retry loop to avoid slug collisions
      while (attempts < maxAttempts) {
        slug = generateSlug(8);
        try {
          // Check if slug already exists (optional – you can also rely on the create to fail)
          // But to be safe, we try to create and catch the error.
          record = await pb.collection("shorturls").create({
            slug: slug,
            largeurl: longUrl,
          });
          break; // success
        } catch (err: any) {
          // If error is due to unique constraint, retry; otherwise throw
          if (err?.data?.data?.slug?.code === "validation_not_unique") {
            attempts++;
            if (attempts === maxAttempts) {
              throw new Error(
                "Failed to generate a unique slug after several attempts",
              );
            }
            continue;
          }
          throw err; // other error
        }
      }

      if (!record?.id) {
        throw new Error("No record ID returned");
      }

      setSharedUrl(`${window.location.origin}/${slug}`);
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
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
            <div className="mt-6 flex items-end space-x-2">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="url">Shortened URL</Label>
                <Textarea
                  ref={urlRef}
                  id="url"
                  readOnly
                  value={sharedUrl}
                  className="grow"
                  rows={2}
                />
              </div>
              <Button
                onClick={copyUrl}
                size="icon"
                className="h-10 w-10 bg-blue-300" // fixed height/width
              >
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
