import { PartialType } from '@nestjs/swagger';
import { CreateTnwedDto } from './create-tnwed.dto';

export class UpdateTnwedDto extends PartialType(CreateTnwedDto) {}
