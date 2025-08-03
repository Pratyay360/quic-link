'use client';
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CopyButton({ text }: { text: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy");
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
    >
      <Copy className="h-4 w-4" />
      <span>Copy</span>
    </Button>
  );
}