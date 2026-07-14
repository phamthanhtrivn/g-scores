import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { GetScoreDto } from '../dto/get-score.dto';

@Controller('/api/students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':registrationNumber')
  async getScoreByRegistrationNumber(@Param() params: GetScoreDto) {
    return this.studentService.getScoreByRegistrationNumber(
      params.registrationNumber,
    );
  }
}
