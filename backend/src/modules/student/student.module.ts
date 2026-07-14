import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';

import { PrismaModule } from '../../prisma/prisma.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [PrismaModule, SubjectModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
