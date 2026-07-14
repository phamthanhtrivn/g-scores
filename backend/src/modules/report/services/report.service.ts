import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SubjectService } from '../../subject/services/subject.service';
import { SubjectCode } from '../../subject/enums/subject-code.enum';
import { toSnakeCase } from '../../../core/utils/string.util';

@Injectable()
export class ReportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subjectService: SubjectService,
  ) {}

  async getScoreLevelsStatistics() {
    const subjects = this.subjectService.getAllSubjects();
    const selectParts: string[] = [];

    subjects.forEach((subject) => {
      const field = toSnakeCase(subject.getScoreField());
      const prefix = subject.getCode();

      selectParts.push(
        `COUNT(CASE WHEN ${field} >= 8 THEN 1 END)::int AS "${prefix}_excellent"`,
      );
      selectParts.push(
        `COUNT(CASE WHEN ${field} >= 6 AND ${field} < 8 THEN 1 END)::int AS "${prefix}_good"`,
      );
      selectParts.push(
        `COUNT(CASE WHEN ${field} >= 4 AND ${field} < 6 THEN 1 END)::int AS "${prefix}_average"`,
      );
      selectParts.push(
        `COUNT(CASE WHEN ${field} < 4 THEN 1 END)::int AS "${prefix}_poor"`,
      );
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

  async getTopGroupAStudents() {
    const math = this.subjectService.getSubjectByCode(SubjectCode.MATH);
    const physics = this.subjectService.getSubjectByCode(SubjectCode.PHYSICS);
    const chemistry = this.subjectService.getSubjectByCode(
      SubjectCode.CHEMISTRY,
    );

    if (!math || !physics || !chemistry) {
      throw new Error('Các môn học của khối A chưa được cấu hình.');
    }

    const mathCol = toSnakeCase(math.getScoreField());
    const physicsCol = toSnakeCase(physics.getScoreField());
    const chemistryCol = toSnakeCase(chemistry.getScoreField());

    const query = `
      SELECT 
        "registration_number" AS "registrationNumber", 
        "${mathCol}" AS "${math.getScoreField()}", 
        "${physicsCol}" AS "${physics.getScoreField()}", 
        "${chemistryCol}" AS "${chemistry.getScoreField()}",
        (COALESCE("${mathCol}", 0) + COALESCE("${physicsCol}", 0) + COALESCE("${chemistryCol}", 0)) AS "totalScore"
      FROM "students"
      WHERE "${mathCol}" IS NOT NULL 
        AND "${physicsCol}" IS NOT NULL 
        AND "${chemistryCol}" IS NOT NULL
      ORDER BY "totalScore" DESC
      LIMIT 10;
    `;

    const result = await this.prisma.$queryRawUnsafe(query);
    return result;
  }
}
