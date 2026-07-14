import { Controller, Get } from '@nestjs/common';
import { ReportService } from '../services/report.service';

@Controller('/api/reports')
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

