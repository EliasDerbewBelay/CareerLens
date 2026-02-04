'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Target,
  User,
  Shield,
  Heart,
  Brain,
  Code,
  ArrowRight,
  CheckCircle,
  BarChart3,
  FileText,
  Lightbulb,
  Rocket,
  Coffee,
  Terminal,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Precision",
      description:
        "Leveraging cutting-edge AI to provide accurate resume analysis and job matching.",
    },
    {
      icon: <User className="h-6 w-6" />,
      title: "Built for Job Seekers",
      description:
        "Every feature is designed based on real job search challenges and needs.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description:
        "Your data stays private. We never share your resume or personal information.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Open to Feedback",
      description:
        "Continuously improving based on user feedback and real-world testing.",
    },
  ];

  const features = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "Smart Matching",
      description:
        "AI analyzes your resume against job descriptions for precise match scores.",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Skill Gap Analysis",
      description:
        "Identify missing skills and receive personalized improvement suggestions.",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "ATS Optimization",
      description:
        "Ensure your resume passes through Applicant Tracking Systems successfully.",
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Actionable Insights",
      description:
        "Get specific recommendations to improve your resume and job applications.",
    },
  ];

  const milestones = [
    {
      year: "2024",
      event: "Idea Born",
      description:
        "Recognized the need for better job search tools while navigating my own career journey",
    },
    {
      year: "Early 2024",
      event: "Development Started",
      description: "Began building CareerLens as a solo developer project",
    },
    {
      year: "Now",
      event: "Launch Phase",
      description: "Launching CareerLens to help job seekers worldwide",
    },
    {
      year: "Future",
      event: "Community Growth",
      description: "Growing with feedback from early users like you",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-blue-500/10 -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 px-4 py-1.5">
              <Sparkles className="h-3 w-3 mr-2" />
              One Developer, One Mission
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Built by a{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Job Seeker
              </span>
              , for{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Job Seekers
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Hi, I'm Elias. I built CareerLens because I experienced firsthand
              how frustrating and opaque the modern job search can be. This is
              my solution to that problem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/auth/register">
                  Try It Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link
                  href="https://github.com/EliasDerbewBelay"
                  target="_blank"
                >
                  <Terminal className="h-4 w-4" />
                  View Code
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="border-primary/20">
            <CardContent className="pt-12 pb-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Coffee className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline">My Story</Badge>
                  </div>
                  <h2 className="text-3xl font-bold mb-6">
                    From Frustration to Solution
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Like many developers, I've been through the job search
                      grind. Sending out countless resumes, getting automated
                      rejections, and never knowing why.
                    </p>
                    <p>
                      I realized there had to be a better way. What if we could
                      actually
                      <span className="font-medium text-foreground">
                        {" "}
                        understand
                      </span>{" "}
                      what employers are looking for? What if we could get
                      specific feedback on how to improve our resumes for each
                      job?
                    </p>
                    <p>
                      So I built CareerLens—the tool I wish I had during my own
                      job searches. It's not perfect yet, but it's a start, and
                      I'm excited to share it with you.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                          <User className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Elias Derbew</h3>
                          <p className="text-sm text-muted-foreground">
                            Solo Founder & Developer
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Full-stack developer passionate about building tools
                        that solve real problems. Based in Addis Ababa,
                        Ethiopia.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">Connect With Me</h3>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          asChild
                        >
                          <Link
                            href="https://x.com/EliasBelay62961"
                            target="_blank"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Twitter
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          asChild
                        >
                          <Link
                            href="https://www.linkedin.com/in/elias-derbew-b9171b3a5/"
                            target="_blank"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          asChild
                        >
                          <Link
                            href="https://github.com/EliasDerbewBelay"
                            target="_blank"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                The Problem I Faced
              </Badge>
              <h2 className="text-3xl font-bold mb-6">
                Job Searching is{" "}
                <span className="text-red-600">Unnecessarily Hard</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-red-100 dark:bg-red-900/30 mt-0.5">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Ghost Applications</h4>
                    <p className="text-muted-foreground">
                      Sending resumes into the void with no feedback or
                      response.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-red-100 dark:bg-red-900/30 mt-0.5">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Guesswork Optimization</h4>
                    <p className="text-muted-foreground">
                      Not knowing which skills to highlight or what employers
                      actually want.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-red-100 dark:bg-red-900/30 mt-0.5">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Time Waste</h4>
                    <p className="text-muted-foreground">
                      Spending hours customizing applications with no guarantee
                      of success.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Badge className="mb-4">My Solution</Badge>
              <h2 className="text-3xl font-bold mb-6">
                CareerLens:{" "}
                <span className="text-emerald-600">Clarity & Confidence</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-900/30 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Instant Feedback</h4>
                    <p className="text-muted-foreground">
                      Get specific insights about your resume's strengths and
                      weaknesses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-900/30 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Targeted Improvements</h4>
                    <p className="text-muted-foreground">
                      Know exactly what skills to develop for specific job
                      opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-900/30 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Smarter Applications</h4>
                    <p className="text-muted-foreground">
                      Apply with confidence knowing your resume is optimized for
                      each role.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Approach</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles guiding how I built and run CareerLens
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-border hover:border-primary/50 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What CareerLens Does
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The core features I've built to solve job search problems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Journey So Far
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From idea to working product: Building CareerLens step by step
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="border-primary/20">
                <CardHeader>
                  <Badge variant="outline" className="w-fit">
                    {milestone.year}
                  </Badge>
                  <CardTitle className="text-lg mt-2">
                    {milestone.event}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Be Among the First to Try It
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  CareerLens is fresh out of development. I'd love your feedback
                  to make it better.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gap-2" asChild>
                    <Link href="/auth/register">
                      Try It Free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <Link href="mailto:elias@example.com">
                      <Heart className="h-4 w-4" />
                      Send Feedback
                    </Link>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-6">
                  P.S. I'm actively building and improving. Your suggestions
                  will directly shape future updates!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

// XCircle component
const XCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
