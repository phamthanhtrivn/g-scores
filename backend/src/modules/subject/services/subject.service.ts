import { Injectable } from '@nestjs/common';
import { Subject } from '../domain/subject';
import { SubjectCode } from '../enums/subject-code.enum';
import { SUBJECT_REGISTRY } from '../constants/subject.registry';

@Injectable()
export class SubjectService {
  getAllSubjects(): Subject[] {
    return Object.values(SUBJECT_REGISTRY);
  }

  getSubjectByCode(code: SubjectCode): Subject | undefined {
    return SUBJECT_REGISTRY[code];
  }
}
