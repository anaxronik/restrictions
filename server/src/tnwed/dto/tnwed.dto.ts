import { ApiProperty } from '@nestjs/swagger';
import { Tnwed } from '@prisma/client';

export class TnwedDto implements Partial<Tnwed> {
  @ApiProperty({
    example: '1234567890',
  })
  code: string;

  @ApiProperty({
    example:
      'Прочие домашние виды: убойные нетели (самки крупного рогатого скота до первого отела) массой более 300 кг',
  })
  description: string;
}
