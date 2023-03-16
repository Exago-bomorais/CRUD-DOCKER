import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
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

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UserUpdateDto) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  async declare(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
