import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountryEntity } from './entities/country.entity';

@Controller('countries')
@ApiTags('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @ApiOkResponse({ type: CountryEntity })
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  @ApiOkResponse({ type: CountryEntity, isArray: true })
  findAll() {
    return this.countriesService.findAll();
  }

  @Post('/search')
  @ApiOkResponse({ type: CountryEntity, isArray: true })
  search(@Body() dto: CreateCountryDto) {
    return this.countriesService.search(dto);
  }
}
