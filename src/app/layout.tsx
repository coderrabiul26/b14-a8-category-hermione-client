import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Navbar, SITE_NAME } from "@/components/layout/navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

const josefinSans = Josefin_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — Donate, Volunteer, Heal`,
  description:
    "A social welfare community: donations, cloth distribution, cleanup drives, and free medical treatment for those in need.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
