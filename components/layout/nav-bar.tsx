"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/95 dark:bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
            E
          </div>
          <div>
            <div className="font-heading text-3xl font-bold tracking-tight text-primary">
              EASF
            </div>
            <p className="text-xs text-muted-foreground -mt-1">
              Education for Africa
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link
            href="/scholarships"
            className="hover:text-primary transition-colors"
          >
            Scholarships
          </Link>
          <Link
            href="/courses"
            className="hover:text-primary transition-colors"
          >
            Courses
          </Link>
          <Link
            href="/apply"
            className="hover:text-primary transition-colors text-center"
          >
            Apply
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* <Button
            asChild
            className="bg-gold hover:bg-amber-500 text-primary font-semibold hidden md:block"
          >
            <Link href="/apply" className="text-center">
              Apply Now
            </Link>
          </Button> */}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8 text-lg">
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
                <Link href="/scholarships" className="hover:text-primary">
                  Scholarships
                </Link>
                <Link href="/courses" className="hover:text-primary">
                  Courses
                </Link>
                <Link href="/apply" className="hover:text-primary">
                  Apply
                </Link>
                <Link href="/donate" className="hover:text-primary">
                  Donate
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
