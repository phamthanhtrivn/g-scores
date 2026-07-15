import {
  StudentScoreGroupA,
  SubjectScoreLevel,
  StudentScoreDetail,
} from "@/types";
import axios from "axios";

const isServer = typeof window === 'undefined';
const baseURL = isServer 
  ? (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL) 
  : process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
});

export async function getTopGroupA(): Promise<StudentScoreGroupA[]> {
  try {
    const res = await apiClient.get("/api/reports/top-group-a");
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching Top Group A with axios:", error);
    return [];
  }
}

export async function getScoreLevels(): Promise<SubjectScoreLevel[]> {
  try {
    const res = await apiClient.get("/api/reports/score-levels");
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching Score Levels with axios:", error);
    return [];
  }
}

export async function searchStudentByRegistrationNumber(
  registrationNumber: string,
): Promise<StudentScoreDetail | null> {
  try {
    const res = await apiClient.get(`/api/students/${registrationNumber}`);
    return res.data?.data || null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "Error finding scores for this register number",
      );
    }
    throw new Error("Can not connect to server");
  }
}
