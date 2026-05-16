import type { Metadata } from "next";
import { Montserrat, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/nav-bar";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "EASF | Education for Africa Scholarship Foundation",
  description:
    "Empowering the next generation of African leaders through education.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="bg-background">
      <body
        className={cn(
          "h-full",
          "scroll-smooth",
          "antialiased",
          montserrat.variable,
          sourceSerif.variable,
          "font-sans",
          inter.variable,
        )}
        suppressHydrationWarning={true}
      >
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
        <Navbar />
        {children}
        <Footer />
        <Toaster position="top-center" richColors />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
