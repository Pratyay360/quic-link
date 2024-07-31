"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import CopyButton from "./CopyButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Trash2 } from "lucide-react";

interface SharedTextCardProps {
  id: string;
  initialText: string;
  onDelete: (id: string) => Promise<void>;
}

export default function SharedTextCard({
  id,
  initialText,
  onDelete,
}: SharedTextCardProps) {
  const [text, setText] = useState(initialText);

  const handleDelete = async () => {
    try {
      await onDelete(id);
      toast.success("Data deleted successfully");
    } catch (error) {
      toast.error("Error deleting data");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-800">
        <Toaster richColors closeButton position="bottom-right" expand={true} />
        <Card className="w-full max-w-lg p-6 bg-gray-200 rounded-lg shadow-md dark:bg-gray-700 border-2 border-violet-600 dark:border-amber-500">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black dark:text-gray-100">
              Shared Text
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              id="url"
              className="w-full h-40 p-3 text-sm border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
              value={text}
              readOnly
            />
          </CardContent>
          <CardFooter className="flex justify-between mt-4">
            <CopyButton text={text} />

            <Button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              <Trash2 size={18} />
              <span>Delete</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
