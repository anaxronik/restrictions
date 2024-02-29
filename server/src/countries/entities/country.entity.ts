import { ApiProperty } from '@nestjs/swagger';
import { Country } from '@prisma/client';

export class CountryEntity implements Partial<Country> {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  id?: number;
}
