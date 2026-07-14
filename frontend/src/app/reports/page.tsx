import { BarChart3 } from "lucide-react";
import { getScoreLevels } from "@/services/api";
import ScoreLevelChart from "@/components/charts/ScoreLevelChart";

export const dynamic = "force-dynamic";

export default async function Reports() {
  const scoreData = await getScoreLevels();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Statistical Reports
          </h1>
          <p className="text-gray-500 mt-1">
            In-depth analysis of student academic performance.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Subject Score Distribution
        </h2>

        {scoreData && scoreData.length > 0 ? (
          <ScoreLevelChart data={scoreData} />
        ) : (
          <div className="relative h-96 w-full rounded-xl border-2 border-dashed border-gray-200 bg-blue-50/30 flex flex-col items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="z-10 flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">
                Collecting Data
              </h3>
              <p className="text-gray-500 mt-2 max-w-sm">
                The chart will be displayed here when the system has enough data
                from recent exams.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
