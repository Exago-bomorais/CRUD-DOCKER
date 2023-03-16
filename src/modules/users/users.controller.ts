import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: UserDto) {
    return this.usersService.craete(data);
  }

  @Get()
  async getAll() {
    return this.usersService.findUsers();
  }

  @Get()
  async getOne(@Param() id: string) {
    return this.usersService.findOne(id);
  }

  @Put()
  async update(@Param() id: string, @Body() data: UserUpdateDto) {
    return this.usersService.update(id, data);
  }
}
