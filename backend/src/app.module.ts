import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './modules/student/student.module';
import { SubjectModule } from './modules/subject/subject.module';
import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [PrismaModule, StudentModule, SubjectModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
