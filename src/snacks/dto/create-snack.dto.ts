import { ApiProperty } from '@nestjs/swagger';

export class CreateSnackDto {
  @ApiProperty({ description: 'Snack Name' })
  name: string;

  @ApiProperty({ description: 'Snack Description' })
  description: string;

  @ApiProperty({ description: 'Snack Price' })
  price: number;

  @ApiProperty({ description: 'Snack Url' })
  img: string;
}
