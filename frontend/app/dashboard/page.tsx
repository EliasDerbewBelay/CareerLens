"use client";

import ResumeUpload from "@/components/ResumeUpload";
import JobMatchForm from "@/components/JobMatchForm";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BarChart3,
  History,
  Sparkles,
  Upload,
  Target,
  TrendingUp,
  Award,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";


export default function Dashboard() {
  const stats = [
    {
      label: "Resumes Analyzed",
      value: "24",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "Avg Match Rate",
      value: "78%",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      label: "Jobs Applied",
      value: "12",
      icon: <Target className="h-4 w-4" />,
    },
    { label: "Best Score", value: "94%", icon: <Award className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <Badge variant="secondary">AI Powered</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Upload your resume and analyze job matches with AI
              </p>
            </div>
            <Button asChild variant="outline">
              <Link
                href="/dashboard/history"
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                View History
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resume Upload Card */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                <CardTitle>Upload Resume</CardTitle>
              </div>
              <CardDescription>
                Upload your resume in PDF format for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResumeUpload />
            </CardContent>
          </Card>

          {/* Job Analysis Card */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <CardTitle>Job Match Analysis</CardTitle>
              </div>
              <CardDescription>
                Paste a job description to analyze match with your resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JobMatchForm />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with these quick actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 justify-start"
                asChild
              >
                <Link
                  href="/dashboard/templates"
                  className="flex flex-col items-start"
                >
                  <FileText className="h-5 w-5 mb-2" />
                  <span className="font-medium">Resume Templates</span>
                  <span className="text-sm text-muted-foreground mt-1">
                    Get professional templates
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 justify-start"
                asChild
              >
                <Link
                  href="/dashboard/insights"
                  className="flex flex-col items-start"
                >
                  <Sparkles className="h-5 w-5 mb-2" />
                  <span className="font-medium">AI Insights</span>
                  <span className="text-sm text-muted-foreground mt-1">
                    Get personalized tips
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 justify-start"
                asChild
              >
                <Link
                  href="/dashboard/settings"
                  className="flex flex-col items-start"
                >
                  <Target className="h-5 w-5 mb-2" />
                  <span className="font-medium">Job Preferences</span>
                  <span className="text-sm text-muted-foreground mt-1">
                    Set your job targets
                  </span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
