import { Trophy, Medal } from "lucide-react";
import { getTopGroupA } from "@/services/api";

export default async function Dashboard() {
  const topStudents = await getTopGroupA();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Top 10 Group A Students
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              List of students with the highest total scores in Math, Physics,
              and Chemistry
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm">
                <th className="py-4 px-6 font-semibold w-24 text-center">
                  Rank
                </th>
                <th className="py-4 px-6 font-semibold">Registration Number</th>
                <th className="py-4 px-6 font-semibold text-right">Math</th>
                <th className="py-4 px-6 font-semibold text-right">Physics</th>
                <th className="py-4 px-6 font-semibold text-right">
                  Chemistry
                </th>
                <th className="py-4 px-6 font-semibold text-right text-blue-600">
                  Total Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topStudents.length > 0 ? (
                topStudents.map((student, index) => {
                  let badge = null;
                  if (index === 0)
                    badge = (
                      <Medal className="h-6 w-6 text-yellow-500 mx-auto" />
                    );
                  else if (index === 1)
                    badge = <Medal className="h-6 w-6 text-gray-400 mx-auto" />;
                  else if (index === 2)
                    badge = (
                      <Medal className="h-6 w-6 text-amber-600 mx-auto" />
                    );
                  else
                    badge = (
                      <span className="font-semibold text-gray-500">
                        {index + 1}
                      </span>
                    );

                  return (
                    <tr
                      key={student.registrationNumber}
                      className="hover:bg-blue-50/50 transition-colors duration-150 group"
                    >
                      <td className="py-4 px-6 text-center">{badge}</td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {student.registrationNumber}
                      </td>
                      <td className="py-4 px-6 text-right text-gray-600">
                        {student.mathScore}
                      </td>
                      <td className="py-4 px-6 text-right text-gray-600">
                        {student.physicsScore}
                      </td>
                      <td className="py-4 px-6 text-right text-gray-600">
                        {student.chemistryScore}
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-blue-600 bg-blue-50/30 group-hover:bg-blue-100/50 transition-colors">
                        {student.totalScore}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No data available or unable to connect to the server.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
