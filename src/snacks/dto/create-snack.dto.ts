import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSnackDto {
  @ApiProperty({ description: 'Snack Name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Snack Description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Snack Price' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Snack Url' })
  @IsString()
  img: string;
}
