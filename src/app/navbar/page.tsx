// components/Navbar.tsx
"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/themer";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left cluster */}
        <div className="flex items-center space-x-6">
          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button className="p-2 text-muted-foreground hover:text-accent-foreground">
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            Quic-Link
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/shorturl" className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent-foreground">
              Short URL
            </Link>
            <Link href="/sharetext" className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent-foreground">
              Share Text
            </Link>
          </nav>
        </div>

        {/* Right cluster */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}