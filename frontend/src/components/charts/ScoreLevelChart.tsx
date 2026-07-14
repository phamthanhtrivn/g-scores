"use client";

import { SubjectScoreLevel } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ScoreLevelChartProps {
  data: SubjectScoreLevel[];
}

const SUBJECT_MAP: Record<string, string> = {
  MATH: "Math",
  LITERATURE: "Literature",
  PHYSICS: "Physics",
  CHEMISTRY: "Chemistry",
  BIOLOGY: "Biology",
  HISTORY: "History",
  GEOGRAPHY: "Geography",
  CIVIC_EDUCATION: "Civic Education",
  FOREIGN_LANGUAGE: "Foreign Language",
};

export default function ScoreLevelChart({ data }: ScoreLevelChartProps) {
  const chartData = data.map((item) => ({
    name: SUBJECT_MAP[item.subjectCode] || item.subjectName,
    "Excellent (8-10)": item.levels.excellent,
    "Good (6.5-7.9)": item.levels.good,
    "Average (5-6.4)": item.levels.average,
    "Poor (<5)": item.levels.poor,
  }));

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="h-[450px] min-w-[700px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 100,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 13 }}
              angle={-45}
              textAnchor="end"
              dy={10}
              dx={-5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 13 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              cursor={{ fill: "#f9fafb" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: any) => [
                typeof value === "number" ? value.toLocaleString() : value,
                undefined,
              ]}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "20px" }}
              iconType="circle"
            />
            <Bar
              dataKey="Excellent (8-10)"
              stackId="a"
              fill="#10b981"
              radius={[0, 0, 4, 4]}
            />
            <Bar dataKey="Good (6.5-7.9)" stackId="a" fill="#3b82f6" />
            <Bar dataKey="Average (5-6.4)" stackId="a" fill="#f59e0b" />
            <Bar
              dataKey="Poor (<5)"
              stackId="a"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
