import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./navbar/page";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quic-Link",
  description: "Quic-Link is a simple URL shortener and text sharer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar/>
        {children}
      </ThemeProvider>
        </body>
    </html>
  );
}
