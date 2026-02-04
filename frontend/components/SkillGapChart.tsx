"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  matched: string[];
  missing: string[];
}

export default function SkillGapChart({ matched, missing }: Props) {
  // Prepare data for chart
  const allSkills = [...matched, ...missing];
  const data = allSkills.map((skill, index) => ({
    name: skill.length > 20 ? skill.substring(0, 20) + "..." : skill,
    fullName: skill,
    value: matched.includes(skill) ? 1 : 0,
    type: matched.includes(skill) ? "Matched" : "Missing",
  }));

  // Sort data: matched first, then missing
  data.sort((a, b) => {
    if (a.value === b.value) return a.name.localeCompare(b.name);
    return b.value - a.value;
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const isMatched = payload[0].value === 1;
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground">
            {payload[0].payload.fullName}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {isMatched ? (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  Matched Skill
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                  Missing Skill
                </span>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Use CSS variables that work with both themes
  const chartColors = {
    matched: {
      light: "var(--chart-1)",
      dark: "hsl(var(--primary))"
    },
    missing: {
      light: "var(--chart-2)",
      dark: "hsl(var(--destructive))"
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-foreground flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <CheckCircle className="h-4 w-4 text-primary" />
          </div>
          Skill Gap Analysis
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {matched.length} matched
          </span>{" "}
          vs{" "}
          <span className="text-red-600 dark:text-red-400 font-medium">
            {missing.length} missing
          </span>{" "}
          skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
              layout="vertical"
            >
              <defs>
                <linearGradient id="matchedGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="missingGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                domain={[0, 1]}
                ticks={[0, 1]}
                tickFormatter={(value) => (value === 1 ? "Matched" : "Missing")}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'hsl(var(--muted) / 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                name="Skill Status" 
                radius={[0, 4, 4, 0]}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value === 1 ? "url(#matchedGradient)" : "url(#missingGradient)"}
                    stroke="hsl(var(--border))"
                    strokeWidth={1}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-primary" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Matched Skills</span>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {matched.length}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Skills you already have</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-destructive" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Missing Skills</span>
                <Badge variant="secondary" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  {missing.length}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Skills you need to develop</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}