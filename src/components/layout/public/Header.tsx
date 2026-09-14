"use client";

import { ArrowRight, HeartPulse, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center justify-between rounded-2xl md:rounded-full bg-background/80 backdrop-blur-md border border-border/70 shadow-xs px-4 sm:px-6 py-2.5 transition-all duration-300 hover:shadow-md">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group select-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs group-hover:scale-105 transition-all duration-200">
              <HeartPulse className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Health<span className="text-primary">Care</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-muted/60 p-1 rounded-full border border-border/40">
            {routes.map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                  )}
                >
                  {route.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-full px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70",
              )}
            >
              Log In
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "rounded-full px-4 text-sm font-medium shadow-xs gap-1.5 group",
              )}
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-background/95 backdrop-blur-md border border-border/70 shadow-lg flex flex-col gap-3 transition-all duration-200 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-1">
              {routes.map((route) => {
                const isActive = pathname === route.path;
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    )}
                  >
                    {route.name}
                  </Link>
                );
              })}
            </div>

            <div className="h-px bg-border/60 my-0.5" />

            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full justify-center rounded-xl py-2 font-medium",
                )}
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "w-full justify-center rounded-xl py-2 font-medium shadow-xs gap-1.5",
                )}
              >
                <span>Get Started</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
