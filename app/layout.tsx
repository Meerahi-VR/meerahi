import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Poppins({ subsets: ["latin"], weight : ['400', '500', '600', '700','100','200', '300'] });

export const metadata: Metadata = {
  title: "Meerahi VR",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-[#FDFFFC]')}>{children}</body>
    </html>
  );
}
