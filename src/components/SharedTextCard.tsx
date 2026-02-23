import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import CopyButton from "./CopyButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import PocketBase from "pocketbase";

interface SharedTextCardProps {
  id: string;
  initialText: string;
}

export default function SharedTextCard({
  id,
  initialText,
}: SharedTextCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const pb = new PocketBase("https://pocketbase.pratyay.qzz.io");

      pb.collection("sharedText").delete(id);
      toast.success("Text deleted successfully");
      // Redirect to home after delete
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      toast.error("Failed to delete text");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Toaster richColors closeButton position="bottom-right" expand={true} />
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Shared Text</CardTitle>
          <CardDescription>
            This text is accessible via your unique URL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor={`shared-text-${id}`} className="sr-only">
              Shared text content
            </label>
            <Textarea
              id={`shared-text-${id}`}
              value={initialText}
              readOnly
              rows={10}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <CopyButton text={initialText} />
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="destructive"
            className="flex items-center gap-2 bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
