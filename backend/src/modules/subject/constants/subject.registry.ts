import { Subject } from '../domain/subject';
import { SubjectCode } from '../enums/subject-code.enum';

export const SUBJECT_REGISTRY: Record<SubjectCode, Subject> = {
  [SubjectCode.MATH]: new Subject(SubjectCode.MATH, 'Toán', 'mathScore'),
  [SubjectCode.LITERATURE]: new Subject(
    SubjectCode.LITERATURE,
    'Ngữ Văn',
    'literatureScore',
  ),
  [SubjectCode.FOREIGN_LANGUAGE]: new Subject(
    SubjectCode.FOREIGN_LANGUAGE,
    'Ngoại Ngữ',
    'foreignLanguageScore',
  ),
  [SubjectCode.PHYSICS]: new Subject(
    SubjectCode.PHYSICS,
    'Vật Lý',
    'physicsScore',
  ),
  [SubjectCode.CHEMISTRY]: new Subject(
    SubjectCode.CHEMISTRY,
    'Hóa Học',
    'chemistryScore',
  ),
  [SubjectCode.BIOLOGY]: new Subject(
    SubjectCode.BIOLOGY,
    'Sinh Học',
    'biologyScore',
  ),
  [SubjectCode.HISTORY]: new Subject(
    SubjectCode.HISTORY,
    'Lịch Sử',
    'historyScore',
  ),
  [SubjectCode.GEOGRAPHY]: new Subject(
    SubjectCode.GEOGRAPHY,
    'Địa Lý',
    'geographyScore',
  ),
  [SubjectCode.CIVIC_EDUCATION]: new Subject(
    SubjectCode.CIVIC_EDUCATION,
    'GDCD',
    'civicEducationScore',
  ),
};
