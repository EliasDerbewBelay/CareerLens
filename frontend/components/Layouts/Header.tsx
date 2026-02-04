"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, User, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Function to check authentication
  const checkAuth = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access");
      setIsAuthenticated(!!token);
    }
  };

  useEffect(() => {
    // Initial check
    checkAuth();

    // Listen for storage changes (for cross-tab logout/login)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "access") {
        checkAuth();
      }
    };

    // Listen for custom auth events (when login/logout happens on same tab)
    const handleAuthChange = () => {
      checkAuth();
    };

    // Set up listeners
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    // Check auth on route changes
    checkAuth();

    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]); // Re-run when route changes

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    // Clear any auth-related cookies
    document.cookie = "access=; path=/; max-age=0";
    document.cookie = "refresh=; path=/; max-age=0";

    // Update state
    setIsAuthenticated(false);
    setIsMobileMenuOpen(false);

    // Dispatch event for other tabs/windows
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("authChange"));

    // Redirect to login
    router.push("/auth/login");
  };

  const handleLogin = () => {
    // Dispatch event to trigger auth check
    window.dispatchEvent(new Event("authChange"));
  };

  const navLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      authenticated: true,
      icon: <User className="h-4 w-4" />,
    },
    { href: "/analyze", label: "Analyze", authenticated: true, icon: null },
    { href: "dashboard/history", label: "History", authenticated: true, icon: null },
    { href: "/features", label: "Features", authenticated: false, icon: null },
    { href: "/pricing", label: "Pricing", authenticated: false, icon: null },
    { href: "/about", label: "About", authenticated: false, icon: null },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            : "bg-background",
          "px-4 sm:px-6 lg:px-8",
        )}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent relative">
                CareerLens
              </h2>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              if (link.authenticated && !isAuthenticated) return null;
              if (
                !link.authenticated &&
                isAuthenticated &&
                link.href === "/features"
              )
                return null; // Hide features when logged in
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-2",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <ModeToggle />

            <div className="hidden md:flex items-center space-x-2">
              {!isAuthenticated ? (
                <>
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={handleLogin}
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="relative overflow-hidden group">
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/settings">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                if (link.authenticated && !isAuthenticated) return null;
                if (
                  !link.authenticated &&
                  isAuthenticated &&
                  link.href === "/features"
                )
                  return null;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium transition-colors rounded-lg flex items-center gap-3",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}

              <div className="px-4 pt-4 border-t">
                {!isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/auth/login"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogin();
                      }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full justify-start">Sign Up</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/notifications"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2"
                        >
                          <Bell className="h-4 w-4" />
                          Notifications
                        </Button>
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Button>
                      </Link>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
