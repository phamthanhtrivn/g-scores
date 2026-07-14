import { Transform } from 'class-transformer';
import { IsNumberString, Length } from 'class-validator';

export class GetScoreDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.padStart(8, '0') : value,
  )
  @IsNumberString({}, { message: 'Invalid register number' })
  @Length(8, 8, { message: 'Register number must be 8 digits' })
  registrationNumber: string;
}
