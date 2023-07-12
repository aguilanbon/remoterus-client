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
      <body className="bg-gradient-to-bl from-primary to-slate-900">
        {children}
      </body>
    </html>
  );
}
