import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SubjectService } from '../../subject/services/subject.service';
import { FOREIGN_LANGUAGE_REGISTRY } from '../../subject/constants/foreign-language.registry';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subjectService: SubjectService,
  ) {}

  async getScoreByRegistrationNumber(registrationNumber: string) {
    const student = await this.prisma.student.findUnique({
      where: { registrationNumber },
    });

    if (!student) {
      throw new NotFoundException('Can not found this register number');
    }

    const scores = this.subjectService.getAllSubjects().map((subject) => ({
      subjectCode: subject.getCode(),
      subjectName: subject.getDisplayName(),
      score: student[subject.getScoreField()],
    }));

    let foreignLanguage: { code: string; name: string } | null = null;
    if (
      student.foreignLanguageCode &&
      FOREIGN_LANGUAGE_REGISTRY[student.foreignLanguageCode]
    ) {
      foreignLanguage = {
        code: student.foreignLanguageCode,
        name: FOREIGN_LANGUAGE_REGISTRY[student.foreignLanguageCode],
      };
    }

    return {
      registrationNumber,
      foreignLanguage,
      scores,
    };
  }
}
