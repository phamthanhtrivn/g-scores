export interface StudentScoreGroupA {
  registrationNumber: string;
  mathScore: number;
  physicsScore: number;
  chemistryScore: number;
  totalScore: number;
}

export interface ScoreLevel {
  excellent: number;
  good: number;
  average: number;
  poor: number;
}

export interface SubjectScoreLevel {
  subjectCode: string;
  subjectName: string;
  levels: ScoreLevel;
}
