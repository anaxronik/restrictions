import { ApiProperty } from '@nestjs/swagger';
import { Restriction } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRestrictionsFilterDto implements Partial<Restriction> {
  @IsOptional()
  @ApiProperty({ example: ['РФ'] })
  countries?: string[];

  @IsOptional()
  @ApiProperty({ example: ['export', 'import', 'transit'] })
  borderCrossingTypes?: string[];

  @IsOptional()
  @ApiProperty({ example: ['fiz', 'ur'] })
  contragentTypes?: string[];

  @IsOptional()
  @ApiProperty({ example: ['AIR', 'SEA'] })
  transportationTypes?: string[];
}

export class CreateRestrictionsDataDto implements Partial<Restriction> {
  @ApiProperty({
    example: 'text',
  })
  @IsOptional()
  comment?: string;
}

export class CreateRestrictionDto {
  @ApiProperty()
  @IsNotEmpty()
  filter: CreateRestrictionsFilterDto;

  @ApiProperty()
  @IsNotEmpty()
  data: CreateRestrictionsDataDto;
}
