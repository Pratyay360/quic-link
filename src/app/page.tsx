// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { LinkIcon, FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"
      />

      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        QuickLink:{" "}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Simple URL Shortener & Text Sharer
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        A self-hostable solution for easily sharing links and text on social media and chats.
      </p>

      <div className="mt-12 grid w-full max-w-4xl gap-6 md:grid-cols-2">
        {/* Card: Shorten URL */}
        <Card className="group flex flex-col items-center justify-between rounded-2xl border border-border bg-background p-6 shadow transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="pb-4 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
              <LinkIcon className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-semibold">Shorten URL</CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground">
              Create compact links instantly.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-4 w-full">
            <Button asChild className="w-full bg-purple-700 text-white hover:bg-purple-600">
              <Link href="/shorturl">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Card: Share Text */}
        <Card className="group flex flex-col items-center justify-between rounded-2xl border border-border bg-background p-6 shadow transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="pb-4 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary/10 p-3 text-secondary-foreground">
              <FileText className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-semibold">Share Text</CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground">
              Share text snippets effortlessly.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-4 w-full">
            <Button asChild className="w-full bg-purple-500 text-white hover:bg-purple-400 dark:bg-purple-800 dark:hover:bg-purple-700">
              <Link href="/sharetext">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
