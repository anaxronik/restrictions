import { ApiProperty } from '@nestjs/swagger';
import { country } from '@prisma/client';

export class CountryEntity implements Partial<country> {
  @ApiProperty({
    example: '663f174ff15cfe5a510dfc81',
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ example: false })
  disabled: boolean;

  text?: { ru: string; en: string };
}
