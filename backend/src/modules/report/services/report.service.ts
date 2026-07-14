import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SubjectService } from '../../subject/services/subject.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subjectService: SubjectService,
  ) {}

  async getScoreLevelsStatistics() {
    const subjects = this.subjectService.getAllSubjects();
    const selectParts: string[] = [];

    const toSnakeCase = (str: string) =>
      str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

    subjects.forEach((subject) => {
      const field = toSnakeCase(subject.getScoreField());
      const prefix = subject.getCode();

      selectParts.push(`COUNT(CASE WHEN ${field} >= 8 THEN 1 END)::int AS "${prefix}_excellent"`);
      selectParts.push(`COUNT(CASE WHEN ${field} >= 6 AND ${field} < 8 THEN 1 END)::int AS "${prefix}_good"`);
      selectParts.push(`COUNT(CASE WHEN ${field} >= 4 AND ${field} < 6 THEN 1 END)::int AS "${prefix}_average"`);
      selectParts.push(`COUNT(CASE WHEN ${field} < 4 THEN 1 END)::int AS "${prefix}_poor"`);
    });

    const query = `SELECT ${selectParts.join(', ')} FROM students`;

    const result: any[] = await this.prisma.$queryRawUnsafe(query);
    const row = result[0] || {};

    return subjects.map((subject) => {
      const prefix = subject.getCode();
      return {
        subjectCode: subject.getCode(),
        subjectName: subject.getDisplayName(),
        levels: {
          excellent: row[`${prefix}_excellent`] || 0,
          good: row[`${prefix}_good`] || 0,
          average: row[`${prefix}_average`] || 0,
          poor: row[`${prefix}_poor`] || 0,
        },
      };
    });
  }
}
