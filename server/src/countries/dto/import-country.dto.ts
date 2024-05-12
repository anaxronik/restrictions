import { ApiProperty } from '@nestjs/swagger';

export class ImportCountryDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  readonly name: string;
}
