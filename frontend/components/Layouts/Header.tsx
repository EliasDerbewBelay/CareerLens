"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    document.cookie = "access=; path=/; max-age=0";
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  return (
    <header className="flex justify-between items-center p-6">
      <Link href="/">
        <h2 className="text-xl font-bold">CareerLens</h2>
      </Link>

      <div className="flex gap-3 items-center">
        <ModeToggle />

        {!isAuthenticated ? (
          <>
            <Link href="/auth/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Sign Up</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
