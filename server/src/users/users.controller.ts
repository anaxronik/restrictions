import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.findBy(createUserDto).then((exist) => {
      if (exist) return exist;
      return this.usersService.create(createUserDto);
    });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
