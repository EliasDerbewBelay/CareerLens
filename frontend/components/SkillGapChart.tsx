"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  matched: string[];
  missing: string[];
}

export default function SkillGapChart({ matched, missing }: Props) {
  const data = [
    ...matched.map((skill) => ({ name: skill, value: 1 })),
    ...missing.map((skill) => ({ name: skill, value: 0 })),
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
