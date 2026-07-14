import { Transform } from 'class-transformer';
import { IsNumberString, Length } from 'class-validator';

export class GetScoreDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.padStart(8, '0') : value,
  )
  @IsNumberString(
    {},
    { message: 'Số báo danh phải là một chuỗi số hợp lệ gồm 8 chữ số' },
  )
  @Length(8, 8, { message: 'Số báo danh phải có đúng 8 chữ số' })
  registrationNumber: string;
}
