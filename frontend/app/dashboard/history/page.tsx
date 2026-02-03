"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { JobAnalysis } from "@/types";
import Link from "next/link";

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<JobAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="p-6">Loading analysis history...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Analysis History</h1>

      {analyses.length === 0 && (
        <p className="text-gray-500">No analyses yet.</p>
      )}

      {analyses.map((item) => (
        <Link key={item.id} href={`/dashboard/history/${item.id}`}>
          <div className="border p-4 rounded space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">
                Match: {item.match_percentage}%
              </span>
              <span className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="text-sm">
              <strong>Matched:</strong>{" "}
              {item.matched_keywords.join(", ") || "None"}
            </div>

            <div className="text-sm">
              <strong>Missing:</strong>{" "}
              {item.missing_keywords.join(", ") || "None"}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
