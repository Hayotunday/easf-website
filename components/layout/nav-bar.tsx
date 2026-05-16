"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-xl border-b border-border/40 transition-smooth">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg transition-smooth group-hover:shadow-soft">
            E
          </div>
          <div>
            <div className="font-heading text-xl font-bold text-primary">
              EASF
            </div>
            <p className="text-xs text-muted-foreground -mt-0.5">
              Education for Africa
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-smooth font-medium"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-primary transition-smooth font-medium"
          >
            About Us
          </Link>
          <Link
            href="/scholarships"
            className="text-foreground hover:text-primary transition-smooth font-medium"
          >
            Scholarships
          </Link>
          <Link
            href="/courses"
            className="text-foreground hover:text-primary transition-smooth font-medium"
          >
            Courses
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* <ThemeToggle /> */}
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-semibold hidden md:flex transition-smooth"
          >
            <Link href="/apply">Apply Now</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetDescription className="hidden mb-6h">
                Navigate through the EASF platform
              </SheetDescription>
              <SheetTitle className="hidden mb-4 text-lg font-semibold">
                Menu
              </SheetTitle>
              <div className="flex flex-col gap-6 mt-8 text-lg">
                <Link
                  href="/"
                  className="text-foreground hover:text-primary font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary font-medium"
                >
                  About Us
                </Link>
                <Link
                  href="/scholarships"
                  className="text-foreground hover:text-primary font-medium"
                >
                  Scholarships
                </Link>
                <Link
                  href="/courses"
                  className="text-foreground hover:text-primary font-medium"
                >
                  Courses
                </Link>
                <Link
                  href="/apply"
                  className="text-foreground hover:text-primary font-medium"
                >
                  Apply
                </Link>
                <Link
                  href="/donate"
                  className="text-foreground hover:text-primary font-medium"
                >
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
