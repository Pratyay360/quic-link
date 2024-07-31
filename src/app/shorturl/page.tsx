"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, Toaster } from "sonner";

async function shareUrl() {
  const res = document.getElementById("largeUrlArea") as HTMLTextAreaElement;
  const eurl = res.value;
  if (eurl.length == 0) {
    toast.error("Please enter text");
    return;
  } else {
    const response = await fetch("/api/shorturl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: eurl }),
    });
    const data = await response.json();
    if (data.error) {
      toast.error("Error sharing text");
    } else {
      const element = document.getElementById("hideC");
      if (element) {
        element.classList.remove("hidden");
        const url = document.getElementById("url") as HTMLTextAreaElement;
        url.value = `https://text-share.vercel.app/${data.id}`;
        toast.success("Text shared");
      } else {
        toast.error("Error sharing text");
      }
    }
  }
}
function copyUrl() {
  const url = document.getElementById("url") as HTMLTextAreaElement;
  url.select();
  navigator.clipboard.writeText(url.value);
  toast.success("URL copied");
}
export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-800">
        <Card className="w-full max-w-md p-6 bg-gray-200 rounded-lg shadow-md dark:bg-gray-700 border-violet-600 dark:border-amber-500">
          <CardHeader>
            <CardTitle className="text-black dark:text-gray-100">Shorten Url</CardTitle>
            <CardDescription className="text-black dark:text-gray-100">
              Shorten your long URL to a unique URL that can be accessed by anyone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter long url here"
                id="largeUrlArea"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
                rows={4}
              />
              <Button
                onClick={shareUrl}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Share
              </Button>
            </div>
            <div className="hidden" id="hideC">
              <div className="flex items-center space-x-2 mt-4 ">
                <Textarea
                  id="url"
                  className="flex-grow p-2 border border-gray-300 rounded-md bg-gray-50"
                  readOnly
                />
                <CardFooter className="flex justify-between">
                  <Button
                    onClick={copyUrl}
                    className="flex items-center space-x-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-300 transition duration-300"
                  >
                    <Copy size={18} />
                    <span>Copy</span>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </CardContent>
        </Card>
        <Toaster richColors closeButton position="bottom-right" expand={true} />
      </div>
    </>
  );
}
