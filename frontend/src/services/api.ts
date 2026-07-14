import { StudentScoreGroupA } from "@/types";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
