import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiAcceptedResponse,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { SearchTnwedDto } from './dto/search-tnwed.dto';
import { TnwedDto } from './dto/tnwed.dto';
import { TnwedService } from './tnwed.service';

@Controller('tnwed')
@ApiTags('tnwed')
export class TnwedController {
  constructor(private readonly tnwedService: TnwedService) {}

  @Post()
  create(@Body() createTnwedDto: TnwedDto) {
    return this.tnwedService.create(createTnwedDto);
  }

  @Post('/search')
  @ApiAcceptedResponse({ type: [TnwedDto], status: 200 })
  search(@Body() dto: SearchTnwedDto) {
    return this.tnwedService.search(dto);
  }

  @Get()
  @ApiAcceptedResponse({ type: [TnwedDto], status: 200 })
  findAll() {
    return this.tnwedService.findAll();
  }

  @Post('/import')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  import(@UploadedFile() file: Express.Multer.File) {
    return this.tnwedService.import(file);
  }
}
