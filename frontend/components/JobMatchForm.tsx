"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import MatchResult from "./MatchResult";
import { MatchResult as MatchResultType } from "@/types";

export default function JobMatchForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [result, setResult] = useState<MatchResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const analyze = async () => {
    if (!resumeId || !jobDescription) {
      alert("Resume ID and job description required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("job/match/", {
        resume_id: resumeId,
        job_description: jobDescription,
      });
      setResult(res.data);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="border p-4 space-y-4">
      <h2 className="font-semibold text-lg">Job Match Analysis</h2>

      <input
        type="number"
        placeholder="Resume ID"
        className="border p-2 w-full"
        onChange={(e) => setResumeId(Number(e.target.value))}
      />

      <textarea
        rows={6}
        className="border p-2 w-full"
        placeholder="Paste job description here..."
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        onClick={analyze}
        className="bg-black text-white px-4 py-2"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      {result && <MatchResult result={result} />}
    </div>
  );
}
