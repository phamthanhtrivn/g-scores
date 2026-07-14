"use client";

import {
  Search,
  SearchX,
  AlertCircle,
  BookOpen,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { useSearchScores } from "@/hooks/useSearchScores";
import { KeyboardEvent } from "react";

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

export default function SearchScores() {
  const { data, loading, error, search, searchQuery, setSearchQuery } =
    useSearchScores();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      search(searchQuery.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Search Scores
        </h1>
        <p className="text-gray-500 mt-1">
          Quickly search for student exam scores.
        </p>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 max-w-3xl mx-auto mt-10">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Register number..."
                className={`w-full h-14 rounded-xl border bg-white pl-12 pr-4 text-base shadow-sm transition-all
                placeholder:text-gray-400
                focus:outline-none focus:ring-4
                ${
                  error
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="h-14 min-w-[160px] rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Searching</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </div>
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-sm flex items-center bg-red-50 px-4 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </div>
      </div>

      {!data && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-12 text-center opacity-70">
          <SearchX className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">
            Please enter a register number to search
          </p>
        </div>
      )}

      {data && (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white text-center">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-1">Exam Results</h2>
              <p className="text-blue-100">
                Register Number:{" "}
                <span className="font-semibold text-white">
                  {data.registrationNumber}
                </span>
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {data.scores.map(
                  (scoreItem) =>
                    scoreItem.score !== null && (
                      <div
                        key={scoreItem.subjectCode}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center text-center transition-all hover:shadow-md hover:border-blue-100"
                      >
                        <span className="text-sm text-gray-500 font-medium mb-2">
                          {SUBJECT_MAP[scoreItem.subjectCode] ||
                            scoreItem.subjectName}
                        </span>
                        <span
                          className={`text-2xl font-bold ${scoreItem.score !== null ? "text-gray-900" : "text-gray-300"}`}
                        >
                          {scoreItem.score !== null ? scoreItem.score : "-"}
                        </span>
                      </div>
                    ),
                )}
              </div>

              {data.foreignLanguage && (
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-2 text-indigo-500" />
                  <span>
                    Foreign Language:{" "}
                    <strong className="text-gray-900">
                      {data.foreignLanguage.name}
                    </strong>{" "}
                    (Code: {data.foreignLanguage.code})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
