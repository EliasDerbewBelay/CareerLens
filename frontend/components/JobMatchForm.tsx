"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import MatchResult from "./MatchResult";
import { MatchResult as MatchResultType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  Search,
  Sparkles,
  AlertCircle,
  Loader2,
  FileText,
  Briefcase,
  Zap,
  Info,
} from "lucide-react";

export default function JobMatchForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [result, setResult] = useState<MatchResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const analyze = async () => {
    if (!resumeId || !jobDescription.trim()) {
      setError(
        resumeId
          ? "Please enter a job description"
          : "Please enter a resume ID and job description",
      );
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await api.post("job/match/", {
        resume_id: resumeId,
        job_description: jobDescription,
      });
      setResult(res.data);
    } catch (error: any) {
      console.error("Analysis failed:", error);
      setError(
        error.response?.data?.message || "Analysis failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Resume ID Input */}
      <div className="space-y-3">
        <Label htmlFor="resume-id" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Resume ID
        </Label>
        <div className="space-y-2">
          <Input
            id="resume-id"
            type="number"
            placeholder="Enter the Resume ID from your uploaded resume"
            value={resumeId || ""}
            onChange={(e) => setResumeId(Number(e.target.value))}
            className="flex-1"
          />
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              You can find the Resume ID after uploading your resume. It will be
              displayed in the success message.
            </p>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-3">
        <Label htmlFor="job-description" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Job Description
        </Label>
        <Textarea
          id="job-description"
          rows={8}
          placeholder="Paste the job description here... (Required skills, qualifications, responsibilities)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="resize-none"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>AI will analyze your resume against this description</span>
          <span>{jobDescription.length} characters</span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Analyze Button */}
      <Button
        onClick={analyze}
        className="w-full"
        size="lg"
        disabled={loading || !resumeId || !jobDescription.trim()}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Zap className="mr-2 h-4 w-4" />
            Analyze Match
          </>
        )}
      </Button>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Analysis Results</h3>
          </div>
          <MatchResult result={result} />
          
        </div>
      )}
    </div>
  );
}
