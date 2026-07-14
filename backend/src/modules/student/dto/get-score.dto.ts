import { IsNumberString } from 'class-validator';

export class GetScoreDto {
  @IsNumberString({}, { message: 'Số báo danh phải là một chuỗi số hợp lệ' })
  registrationNumber: string;
}
