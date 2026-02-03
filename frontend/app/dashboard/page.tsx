"use client";

import ResumeUpload from "@/components/ResumeUpload";
import JobMatchForm from "@/components/JobMatchForm";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">CareerLens Dashboard</h1>

      <ResumeUpload />
      <JobMatchForm />

      <Link
        href="/dashboard/history"
        className="text-sm underline text-gray-600"
      >
        View Analysis History →
      </Link>
    </div>
  );
}
