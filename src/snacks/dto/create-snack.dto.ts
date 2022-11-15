import { ApiProperty } from '@nestjs/swagger';

export class CreateSnackDto {
  @ApiProperty({ type: String, description: 'Snack Name' })
  name: string;

  @ApiProperty({ type: String, description: 'Snack Description' })
  description: string;

  @ApiProperty({ type: String, description: 'Snack Price' })
  price: number;

  @ApiProperty({ type: String, description: 'Snack Url' })
  img: string;
}
