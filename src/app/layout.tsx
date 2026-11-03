import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

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
      suppressHydrationWarning
      className={`${josefinSans.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer></Footer>
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
