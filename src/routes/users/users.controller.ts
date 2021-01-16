import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CrudController } from '@/core';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller()
export class UsersController extends CrudController<User> {
  @ApiOperation({ summary: 'Create new record' })
  @Post()
  async create(@Body() entity: CreateUserDto): Promise<User> {
    return super.create(entity);
  }

  @ApiOperation({ summary: 'Update an existing record' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() entity: UpdateUserDto,
  ): Promise<any> {
    return super.update(id, entity);
  }

  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
}
