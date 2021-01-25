import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IPagination } from '@/core/crud/pagination';
import { PaginationParams } from '@/core/crud/pagination-params';

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

  @ApiOperation({ summary: 'Find shoppingcart by user id' })
  @Get(':id/shoppingCarts')
  async findById(@Param('id') id: string): Promise<any> {
    return this.usersService.findOne(id, { relations: ["shoppingCarts"] });
  }

  @ApiOperation({ summary: 'Get all users with shoppingcarts' })
  @Get('shoppingCarts')
  async findAllWithShoppingCarts(): Promise<any> {
    return this.usersService.findAll({ relations: ["shoppingCarts"] });

  }




  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
}
