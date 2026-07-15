import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ReportService } from '../services/report.service';

@Controller('/api/reports')
@UseInterceptors(CacheInterceptor)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('score-levels')
  async getScoreLevelsStatistics() {
    return this.reportService.getScoreLevelsStatistics();
  }

  @Get('top-group-a')
  async getTopGroupAStudents() {
    return this.reportService.getTopGroupAStudents();
  }
}

