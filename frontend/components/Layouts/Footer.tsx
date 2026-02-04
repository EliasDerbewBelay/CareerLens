import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Heart, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <span className="text-xl font-bold text-primary">CL</span>
              </div>
              <span className="text-2xl font-bold">CareerLens</span>
            </div>
            <p className="text-muted-foreground max-w-lg mx-auto">
              AI-powered resume analysis and job matching for modern career
              growth.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <Link
              href="https://x.com/EliasBelay62961"
              className="p-3 rounded-lg hover:bg-muted transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/elias-derbew-b9171b3a5/"
              className="p-3 rounded-lg hover:bg-muted transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/EliasDerbewBelay"
              className="p-3 rounded-lg hover:bg-muted transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>

          <Separator className="w-full max-w-md" />

          {/* Bottom */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CareerLens
            </p>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="h-4 w-4 mx-1 fill-red-500 text-red-500" />
              <span>for job seekers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
