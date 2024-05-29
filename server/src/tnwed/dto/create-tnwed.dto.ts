import { ApiProperty } from '@nestjs/swagger';

export class CreateTnwedDto {
  @ApiProperty({
    example: 1234567890,
  })
  code: number;

  @ApiProperty({
    example:
      'Прочие домашние виды: убойные нетели (самки крупного рогатого скота до первого отела) массой более 300 кг',
  })
  descriptions: string;
}
