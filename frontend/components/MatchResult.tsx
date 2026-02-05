import { MatchResult as MatchResultType } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";

export default function MatchResult({ result }: { result: MatchResultType }) {
  return (
    <div className="border p-4 mt-4 space-y-4 bg-gray-50">
      <h3 className="text-xl font-bold">
        Match Score: {result.ai_match_percentage}%
      </h3>

      <div>
        <h4 className="font-semibold">✅ Matched Skills</h4>
        <ul className="list-disc list-inside">
          {result.matched_skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">❌ Missing Skills</h4>
        <ul className="list-disc list-inside">
          {result.missing_skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold">🧠 AI Feedback</h4>
        <ul className="list-disc list-inside">
          {result.feedback.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>

      <div>
        <Link href={`/dashboard/history/${result.analysis_id}`}>
          <Button>see detail of analysis</Button>
        </Link>
      </div>
    </div>
  );
}
