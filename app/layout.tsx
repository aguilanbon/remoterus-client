import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remote R Us",
  description: "Remoteers new Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-bl from-primary to-blackGround">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
