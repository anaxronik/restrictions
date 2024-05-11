import { ApiProperty } from '@nestjs/swagger';
import { city } from '@prisma/client';

export class CreateCityDto implements Partial<city> {
  @ApiProperty({
    example: 'Караганда',
  })
  name?: string;

  @ApiProperty({})
  countryId?: string;
}
