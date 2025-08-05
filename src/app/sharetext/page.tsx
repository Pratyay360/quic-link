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
import { toast, Toaster } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useState, useRef } from "react";

export default function ShareTextPage() {
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLTextAreaElement>(null);

  const shareText = async () => {
    const text = textAreaRef.current?.value.trim();
    if (!text) {
      toast.error("Please enter text");
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
      for (let i = 0; i < 6; i++) {
        result += all[Math.floor(Math.random() * all.length)];
      }

      const { error } = await supabase
        .from("sharedtext")
        .insert([{ id: result, shared_text: text, created_at: new Date().toISOString() }]);

      if (error) {
        toast.error("Error sharing text: " + error.message);
        console.error("Supabase error:", error);
      } else {
        setSharedUrl(`${window.location.origin}/${result}`);
        toast.success("Text shared successfully!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Unexpected error:", error);
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
          <CardTitle>Text Share</CardTitle>
          <CardDescription>
            Share text with a unique URL that can be accessed by anyone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full gap-1.5">
              <label htmlFor="textArea">Your Text</label>
              <Textarea
                ref={textAreaRef}
                placeholder="Enter text here"
                id="textArea"
                rows={8}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={shareText}
              disabled={isLoading}
              className="w-full bg-purple-500 text-white hover:bg-purple-400 dark:bg-purple-800 dark:hover:bg-purple-700"
            >
              {isLoading ? "Sharing..." : "Share"}
            </Button>
          </div>
          {sharedUrl && (
            <div className="mt-4 flex items-center space-x-2">
              <div className="grid w-full gap-1.5">
                <label htmlFor="url">Shared URL</label>
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
