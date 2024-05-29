import { ApiProperty } from '@nestjs/swagger';

export class SearchTnwedDto {
  @ApiProperty({
    example: 'сое',
  })
  query: string;
}
