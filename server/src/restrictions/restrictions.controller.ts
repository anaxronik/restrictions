import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRestrictionDto } from './dto/create-restriction.dto';
import { RestrictionsService } from './restrictions.service';

@Controller('restrictions')
@ApiTags('restrictions')
export class RestrictionsController {
  constructor(private readonly restrictionsService: RestrictionsService) {}

  @Post()
  create(@Body() dto: CreateRestrictionDto) {
    return this.restrictionsService.create(dto);
  }

  @Post('find-or-create')
  findOrCreate(@Body() dto: CreateRestrictionDto) {
    return this.restrictionsService.findOrCreateByFilter(dto);
  }

  @Post('find-by-filter')
  findByFilter(@Body() dto: CreateRestrictionDto) {
    return this.restrictionsService.findByFilter(dto.filter);
  }

  @Get()
  @ApiOperation({ summary: 'Возвращает все запреты' })
  findAll() {
    return Promise.all([
      this.restrictionsService.count(),
      this.restrictionsService.findAll(),
    ]).then(([count, items]) => ({ count, items }));
  }

  @Delete()
  deleteAll() {
    return this.restrictionsService.removeAll();
  }
}
