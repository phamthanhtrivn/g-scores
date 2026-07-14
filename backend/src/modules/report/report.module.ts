import { Module } from '@nestjs/common';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [PrismaModule, SubjectModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
