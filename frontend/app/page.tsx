"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Upload,
  FileText,
  Target,
  CheckCircle,
  XCircle,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Star,
  ClipboardCheck,
  Lock,
  ChevronRight,
  Brain,
  ShieldCheck,
  FileCheck,
  Search,
  PieChart,
  MessageSquare,
  UserCheck,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "Smart Match Score",
      description: "AI-powered match percentage analysis",
      badge: "Accurate",
      color:
        "border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Matching Skills",
      description: "Identify aligned skills instantly",
      badge: "Precise",
      color:
        "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800",
    },
    {
      icon: <XCircle className="h-5 w-5" />,
      title: "Missing Skills",
      description: "Discover skill gaps automatically",
      badge: "Insightful",
      color:
        "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800",
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "AI Suggestions",
      description: "Personalized improvement tips",
      badge: "Smart",
      color:
        "border-purple-200 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-800",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Resume",
      description: "Upload PDF, DOC, or DOCX format",
      icon: <Upload className="h-5 w-5" />,
    },
    {
      number: "02",
      title: "Paste Job Description",
      description: "Copy and paste any job posting",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      number: "03",
      title: "AI Analysis",
      description: "Deep learning analysis in seconds",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      number: "04",
      title: "Get Results",
      description: "Detailed insights and suggestions",
      icon: <ClipboardCheck className="h-5 w-5" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer at Microsoft",
      content:
        "CareerLens helped me tailor my resume perfectly. Went from 65% to 92% match rate!",
      avatar: "SC",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      content:
        "The AI suggestions transformed my resume. Landed 3 interviews in 2 weeks.",
      avatar: "MR",
      rating: 5,
    },
    {
      name: "Jessica Williams",
      role: "UX Designer",
      content:
        "As a career changer, this tool was invaluable for understanding job requirements.",
      avatar: "JW",
      rating: 5,
    },
  ];

  const stats = [
    {
      value: "10K+",
      label: "Resumes Optimized",
      icon: <FileCheck className="h-4 w-4" />,
    },
    {
      value: "94%",
      label: "Success Rate",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      value: "2.8x",
      label: "More Interviews",
      icon: <UserCheck className="h-4 w-4" />,
    },
    { value: "4.9", label: "User Rating", icon: <Star className="h-4 w-4" /> },
  ];

  const benefits = [
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Analysis",
      description: "Get results in under 30 seconds",
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "ATS Compatible",
      description: "Optimized for Applicant Tracking Systems",
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      title: "Detailed Reports",
      description: "Comprehensive breakdown and insights",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pb-24">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/10 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5">
              <Sparkles className="h-3 w-3 mr-2" />
              AI-Powered Resume Analysis
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Optimize Your Resume for{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Every Job
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Upload your resume, paste a job description, and get AI-powered
              insights to land more interviews with precision matching.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth/register">
                <Button size="lg" className="h-12 px-8 gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowDemo(!showDemo)}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {showDemo ? "Hide Demo" : "See Live Demo"}
              </Button>
            </div>

            {/* Demo Card */}
            {showDemo && (
              <Card className="max-w-4xl mx-auto mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Live Demo
                  </CardTitle>
                  <CardDescription>
                    See how CareerLens analyzes your resume against job
                    descriptions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Upload className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Resume Upload</h3>
                          <p className="text-sm text-muted-foreground">
                            Multiple formats supported
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drop your resume here
                          </p>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Job Description
                          </label>
                          <textarea
                            className="w-full h-32 p-3 border rounded-lg resize-none text-sm"
                            placeholder="Paste the job description here..."
                            defaultValue="Seeking a Senior Frontend Developer with 5+ years experience in React, TypeScript, and modern web development. Experience with Next.js, Tailwind CSS, and state management required..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                          <Target className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Analysis Results</h3>
                          <p className="text-sm text-muted-foreground">
                            Instant AI-powered insights
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center p-6 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-lg">
                          <div className="text-4xl font-bold mb-2">87%</div>
                          <p className="text-muted-foreground">Match Score</p>
                          <Progress value={87} className="h-2 mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <Card className="border-emerald-200">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="h-4 w-4 text-emerald-600" />
                                <span className="font-medium">
                                  Matching Skills
                                </span>
                              </div>
                              <p className="text-sm">
                                React, TypeScript, Next.js
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="border-amber-200">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <XCircle className="h-4 w-4 text-amber-600" />
                                <span className="font-medium">
                                  Missing Skills
                                </span>
                              </div>
                              <p className="text-sm">GraphQL, AWS, Docker</p>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="border-purple-200">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="h-4 w-4 text-purple-600" />
                              <span className="font-medium">
                                Improvement Suggestions
                              </span>
                            </div>
                            <p className="text-sm">
                              Add AWS experience, include Docker projects,
                              mention GraphQL APIs
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-primary">{stat.icon}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              AI POWERED
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="text-primary">Get Hired</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes your resume against job descriptions to give you
              actionable insights
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className={cn("border-2", feature.color)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-background">
                      {feature.icon}
                    </div>
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-primary">CareerLens</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get job-ready insights in four simple steps
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  <Card className="relative z-10">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-primary">
                          {step.number}
                        </div>
                        <div className="p-2 rounded-lg bg-primary/10">
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 w-8">
                      <ChevronRight className="h-6 w-6 text-muted-foreground absolute -right-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-primary" />
              <Badge variant="outline">TESTIMONIALS</Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="text-primary">Job Seekers</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how CareerLens has helped professionals land their dream jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {testimonial.content}
                  </p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">Security First</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">
                    Your privacy and data security are our top priority
                  </p>
                  <ul className="space-y-3">
                    {[
                      "End-to-end encryption for all documents",
                      "Automatic file deletion after 24 hours",
                      "No data sharing with third parties",
                      "GDPR & CCPA compliant infrastructure",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Security Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bank-level encryption</span>
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SSL/TLS protection</span>
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Automatic file cleanup</span>
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Privacy compliance</span>
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <Badge className="mb-6">
                  <Rocket className="h-3 w-3 mr-2" />
                  Get Started Today
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Land Your Dream Job?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Join thousands of successful job seekers who optimized their
                  resumes with CareerLens
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/auth/register">
                    <Button size="lg" className="h-12 px-8 gap-2">
                      <Zap className="h-4 w-4" />
                      Start Free Analysis
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button size="lg" variant="outline" className="h-12 px-8">
                      Sign In to Account
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  {[
                    "No credit card required",
                    "Free 10 analyses",
                    "Cancel anytime",
                    "24/7 Support",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
