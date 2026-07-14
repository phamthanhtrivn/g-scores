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

export interface ForeignLanguageInfo {
  code: string;
  name: string;
}

export interface StudentSubjectScore {
  subjectCode: string;
  subjectName: string;
  score: number | null;
}

export interface StudentScoreDetail {
  registrationNumber: string;
  foreignLanguage: ForeignLanguageInfo;
  scores: StudentSubjectScore[];
}
