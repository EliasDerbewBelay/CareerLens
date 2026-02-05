"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { JobAnalysis } from "@/types";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  History,
  Calendar,
  Target,
  TrendingUp,
  FileText,
  ChevronRight,
  Filter,
  Search,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<JobAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all"); // all, high, medium, low
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/job/history");
        setAnalyses(res.data);
      } catch {
        alert("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredAnalyses = analyses.filter((item) => {
    if (filter === "high" && item.match_percentage < 80) return false;
    if (
      filter === "medium" &&
      (item.match_percentage < 60 || item.match_percentage >= 80)
    )
      return false;
    if (filter === "low" && item.match_percentage >= 60) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.matched_keywords.some((kw) => kw.toLowerCase().includes(query)) ||
        item.missing_keywords.some((kw) => kw.toLowerCase().includes(query))
      );
    }

    return true;
  });

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80)
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
    if (score >= 60)
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <Skeleton className="h-10 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-48 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button variant="ghost" size="sm" asChild className="gap-2">
                  <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <History className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Analysis History
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    View all your previous job match analyses
                  </p>
                </div>
              </div>
            </div>

            {analyses.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  <BarChart3 className="h-3 w-3" />
                  {analyses.length} analyses
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats Summary */}
          {analyses.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {Math.round(
                          analyses.reduce(
                            (acc, item) => acc + item.match_percentage,
                            0,
                          ) / analyses.length,
                        )}
                        %
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Avg. Match
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {
                          analyses.filter((a) => a.match_percentage >= 80)
                            .length
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        High Matches
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <Target className="h-4 w-4 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        {analyses.filter((a) => a.match_percentage < 60).length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Need Improvement
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{analyses.length}</p>
                      <p className="text-sm text-muted-foreground">
                        Total Analyses
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by skills or keywords..."
                className="pl-10 w-full h-10 px-3 rounded-lg border bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="gap-2"
              >
                <Filter className="h-3 w-3" />
                All
              </Button>
              <Button
                variant={filter === "high" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("high")}
                className="gap-2"
              >
                <CheckCircle className="h-3 w-3" />
                High (80%+)
              </Button>
              <Button
                variant={filter === "medium" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("medium")}
                className="gap-2"
              >
                <Target className="h-3 w-3" />
                Medium (60-79%)
              </Button>
              <Button
                variant={filter === "low" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("low")}
                className="gap-2"
              >
                <XCircle className="h-3 w-3" />
                Low (&lt;60%)
              </Button>
            </div>
          </div>

          {/* Analyses Grid */}
          {filteredAnalyses.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-12 pb-12 text-center">
                <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No analyses found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  {analyses.length === 0
                    ? "You haven't analyzed any jobs yet. Start by uploading a resume and analyzing a job match."
                    : "No analyses match your current filters. Try changing your search or filter criteria."}
                </p>
                {analyses.length === 0 && (
                  <Button asChild>
                    <Link href="/dashboard">Start Analyzing</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnalyses.map((item) => (
                <Link
                  key={item.id}
                  href={`/dashboard/history/${item.id}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border hover:border-primary/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                "gap-1",
                                getScoreBadgeColor(item.match_percentage),
                              )}
                            >
                              <Target className="h-3 w-3" />
                              {item.match_percentage}%
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(item.created_at)}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            Analysis #{item.id}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.created_at).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        {/* Matched Skills */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            <span className="text-sm font-medium">
                              Matched Skills
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.matched_keywords
                              .slice(0, 3)
                              .map((keyword, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                >
                                  {keyword}
                                </Badge>
                              ))}
                            {item.matched_keywords.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{item.matched_keywords.length - 3} more
                              </Badge>
                            )}
                            {item.matched_keywords.length === 0 && (
                              <span className="text-xs text-muted-foreground">
                                No matches
                              </span>
                            )}
                          </div>
                        </div>

                        <Separator />

                        {/* Missing Skills */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium">
                              Missing Skills
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.missing_keywords
                              .slice(0, 3)
                              .map((keyword, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                >
                                  {keyword}
                                </Badge>
                              ))}
                            {item.missing_keywords.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{item.missing_keywords.length - 3} more
                              </Badge>
                            )}
                            {item.missing_keywords.length === 0 && (
                              <span className="text-xs text-muted-foreground">
                                All skills matched!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-3 border-t">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs text-muted-foreground">
                          Click to view details
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State for No Analyses */}
          {analyses.length === 0 && !loading && (
            <Card className="max-w-2xl mx-auto border-dashed">
              <CardContent className="pt-16 pb-16 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <History className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">No Analysis History</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  You haven't analyzed any jobs yet. Upload your resume and
                  analyze job matches to see your history here.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg">
                    <Link href="/dashboard" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Analyze a Job
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/dashboard" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Upload Resume
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
