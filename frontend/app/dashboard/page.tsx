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
  BarChart3,
  History,
  Sparkles,
  Upload,
  ChevronRight,
  Plus,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8" id="upload-section">
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

        {/* Quick Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use CareerLens</CardTitle>
            <CardDescription>
              Follow these steps to get the most out of your career analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">1</span>
                </div>
                <h4 className="font-semibold">Upload Resume</h4>
                <p className="text-sm text-muted-foreground">
                  Upload your current resume in PDF format. Our AI will extract
                  key information.
                </p>
              </div>
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">2</span>
                </div>
                <h4 className="font-semibold">Analyze Jobs</h4>
                <p className="text-sm text-muted-foreground">
                  Paste job descriptions to get match scores and improvement
                  suggestions.
                </p>
              </div>
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">3</span>
                </div>
                <h4 className="font-semibold">View Details</h4>
                <p className="text-sm text-muted-foreground">
                  Click "View Analysis" to see detailed breakdowns and
                  recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
