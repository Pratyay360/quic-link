'use client';

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CopyButton({ text }: { text: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied");
  };

  return (
    <Button
      onClick={handleCopy}
      className="flex items-center space-x-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-300 transition duration-300"
    >
      <Copy size={18} />
      <span>Copy</span>
    </Button>
  );
}