"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

// Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

// Icons
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await api.post("register/", form);
      router.push("/auth/login");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-background">
      {/* Back Button */}
      <div className="w-full max-w-md mb-4 md:mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold">
            Create Account
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Join our community today
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Error Message */}
          {error && (
            <Alert
              variant="destructive"
              className="animate-in fade-in duration-300"
            >
              <AlertDescription className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="pl-10 pr-10 h-11"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-9 w-9"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Must be at least 6 characters long
              </p>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mt-0.5"
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground cursor-pointer font-normal"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !agreeTerms}
              className="w-full h-11 text-base font-medium"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Theme-friendly footer note */}
      <div className="mt-6 text-center max-w-md">
        <p className="text-xs text-muted-foreground px-4">
          Your account will be created with secure encryption
        </p>
      </div>
    </div>
  );
}
