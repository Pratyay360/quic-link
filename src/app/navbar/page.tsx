// components/Navbar.tsx
"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/themer";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left cluster */}
        <div className="flex items-center space-x-6">
          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-muted-foreground hover:text-accent-foreground">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="mt-6 flex flex-col space-y-4">
                  <Link href="/shorturl" className="text-lg font-medium">
                    Short URL
                  </Link>
                  <Link href="/sharetext" className="text-lg font-medium">
                    Share Text
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            Quic-Link
          </Link>

          {/* Desktop nav */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex space-x-1">
              <NavigationMenuItem>
                <NavigationMenuLink className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent-foreground" href="/shorturl">
                  Short URL
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent-foreground" href="/sharetext">
                  Share Text
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right cluster */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
