/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class SnackPagination {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform((param) => Number(param.value ?? 20))
  size?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform((param) => Number(param.value ?? 1))
  page?: number;
}
