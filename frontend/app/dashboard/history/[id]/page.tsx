"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { JobAnalysis } from "@/types";
import Link from "next/link";

import SkillGapChart from "@/components/SkillGapChart";
import MatchProgress from "@/components/MatchProgress";

export default function HistoryDetailPage() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="p-6">Loading analysis...</p>;
  if (!analysis) return <p className="p-6">Not found</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Match Result: {analysis.match_percentage}%
      </h1>

      <section>
        <h2 className="font-semibold mb-2">✅ Matched Skills</h2>
        <div className="flex flex-wrap gap-2">
          {analysis.matched_keywords.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">❌ Missing Skills</h2>
        <div className="flex flex-wrap gap-2">
          {analysis.missing_keywords.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">📌 Feedback</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {analysis.feedback.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <h1>
        <MatchProgress percentage={analysis.match_percentage} />

        <SkillGapChart
          matched={analysis.matched_keywords}
          missing={analysis.missing_keywords}
        />
      </h1>

      <Link
        href="/dashboard/history"
        className="text-sm text-gray-500 underline"
      >
        ← Back to history
      </Link>
    </div>
  );
}
