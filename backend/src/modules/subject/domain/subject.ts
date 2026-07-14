import { SubjectCode } from '../enums/subject-code.enum';
import { Student } from '@prisma/client';

export class Subject {
  private readonly code: SubjectCode;
  private readonly displayName: string;
  private readonly scoreField: keyof Student;

  constructor(code: SubjectCode, displayName: string, scoreField: keyof Student) {
    this.code = code;
    this.displayName = displayName;
    this.scoreField = scoreField;
  }

  public getCode(): SubjectCode {
    return this.code;
  }

  public getDisplayName(): string {
    return this.displayName;
  }

  public getScoreField(): keyof Student {
    return this.scoreField;
  }
}
