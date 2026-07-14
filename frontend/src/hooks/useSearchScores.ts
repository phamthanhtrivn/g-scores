import { useState, useCallback, useEffect } from "react";
import { StudentScoreDetail } from "@/types";
import { searchStudentByRegistrationNumber } from "@/services/api";

export function useSearchScores() {
  const [data, setData] = useState<StudentScoreDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const search = useCallback(async (registrationNumber: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result =
        await searchStudentByRegistrationNumber(registrationNumber);
      setData(result);
    } catch (err: any) {
      console.log(err);

      setError(err.message || "Error finding scores for this register number");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setError(null);
      setData(null);
    }
  }, [searchQuery]);

  return {
    data,
    loading,
    error,
    search,
    searchQuery,
    setSearchQuery,
  };
}
