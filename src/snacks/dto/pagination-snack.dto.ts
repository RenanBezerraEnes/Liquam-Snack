/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SnackPagination {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform((param) => Number(param.value ?? 20))
  @ApiPropertyOptional({
    description: 'Specify the size of the page',
    example: 1,
  })
  size?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform((param) => Number(param.value ?? 1))
  @ApiPropertyOptional({
    description: 'Specify the number of the page',
    example: 1,
  })
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    description: 'Specify the minPrice, it has to be bigger than 0',
  })
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({
    description: 'Specify the minPrice, it has to be bigger than 0',
  })
  maxPrice?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '',
    examples: ['-price', '-price,description'],
  })
  order?: string;
}
