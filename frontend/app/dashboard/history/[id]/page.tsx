"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { JobAnalysis } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import SkillGapChart from "@/components/SkillGapChart";
import MatchProgress from "@/components/MatchProgress";
import {
  ArrowLeft,
  Download,
  Share2,
  Copy,
  CheckCircle,
  XCircle,
  Lightbulb,
  BarChart3,
  Calendar,
  FileText,
  Target,
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HistoryDetailPage() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`job/history/${id}/`);
        setAnalysis(res.data);
      } catch {
        alert("Failed to load analysis detail");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80)
      return "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30";
    if (score >= 60) return "bg-amber-50 border-amber-200 dark:bg-amber-950/30";
    return "bg-red-50 border-red-200 dark:bg-red-950/30";
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-10 w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-64 rounded-lg" />
                <Skeleton className="h-48 rounded-lg" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 rounded-lg" />
                <Skeleton className="h-48 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-12 pb-12 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analysis Not Found</h3>
            <p className="text-muted-foreground mb-6">
              The analysis you're looking for doesn't exist or has been deleted.
            </p>
            <Button asChild>
              <Link href="/dashboard/history">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to History
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Button variant="ghost" size="sm" asChild className="gap-2">
                  <Link href="/dashboard/history">
                    <ArrowLeft className="h-4 w-4" />
                    Back to History
                  </Link>
                </Button>
                <Badge variant="outline" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(analysis.created_at)}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Analysis #{analysis.id}
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Detailed breakdown of your job match analysis
                  </p>
                </div>

                <div
                  className={cn(
                    "px-4 py-3 rounded-lg border text-center min-w-[120px]",
                    getScoreBgColor(analysis.match_percentage),
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Target className="h-5 w-5" />
                    <span
                      className={cn(
                        "text-3xl font-bold",
                        getScoreColor(analysis.match_percentage),
                      )}
                    >
                      {analysis.match_percentage}%
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-1">Match Score</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="gap-2"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Match Progress & Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Match Analysis
                </CardTitle>
                <CardDescription>
                  Visual breakdown of your match score and skill gaps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <MatchProgress percentage={analysis.match_percentage} />

                <div className="pt-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Skill Distribution
                  </h3>
                  <SkillGapChart
                    matched={analysis.matched_keywords}
                    missing={analysis.missing_keywords}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Skills Analysis
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of matched and missing skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="matched" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="matched"
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Matched Skills ({analysis.matched_keywords.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="missing"
                      className="flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Missing Skills ({analysis.missing_keywords.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="matched" className="space-y-4 pt-4">
                    {analysis.matched_keywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {analysis.matched_keywords.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-sm py-2 px-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground">
                          No matched skills found
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="missing" className="space-y-4 pt-4">
                    {analysis.missing_keywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {analysis.missing_keywords.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-sm py-2 px-3 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 mx-auto text-emerald-500 mb-3" />
                        <p className="text-emerald-600 font-medium">
                          Perfect match! No missing skills
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Feedback */}
            {analysis.feedback && analysis.feedback.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    AI Feedback & Suggestions
                  </CardTitle>
                  <CardDescription>
                    Personalized recommendations to improve your match score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis.feedback.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-1" />
                        <p className="text-sm">{item}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Analysis Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Total Skills</p>
                    <p className="text-2xl font-bold">
                      {analysis.matched_keywords.length +
                        analysis.missing_keywords.length}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Match Rate</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {analysis.matched_keywords.length > 0
                        ? Math.round(
                            (analysis.matched_keywords.length /
                              (analysis.matched_keywords.length +
                                analysis.missing_keywords.length)) *
                              100,
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Matched Skills
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700"
                    >
                      {analysis.matched_keywords.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Missing Skills
                    </span>
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      {analysis.missing_keywords.length}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Analysis Date</span>
                  </div>
                  <p className="text-sm font-medium">
                    {formatDate(analysis.created_at)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Improvement Actions */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Improve Your Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis.missing_keywords.slice(0, 3).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-1 rounded bg-primary/10">
                      <ChevronRight className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-sm">Learn {skill}</p>
                  </div>
                ))}

                {analysis.missing_keywords.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{analysis.missing_keywords.length - 3} more skills to
                    develop
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  Create Learning Plan
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share with Mentor
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export as PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  asChild
                >
                  <Link href="/dashboard">
                    <BarChart3 className="h-4 w-4" />
                    New Analysis
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
