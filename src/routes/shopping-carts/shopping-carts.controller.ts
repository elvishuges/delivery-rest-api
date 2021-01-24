import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CrudController } from '@/core';

import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { ShoppingCartsService } from './shopping-carts.service';

@ApiTags('ShoppingCart')
@Controller()
export class ShoppingCartsController extends CrudController<ShoppingCart> {
    @ApiOperation({ summary: 'Create new record' })
    @Post()
    async create(@Body() entity: CreateShoppingCartDto): Promise<ShoppingCart> {
        return super.create(entity);
    }

    @ApiOperation({ summary: 'Update an existing record' })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() entity: UpdateShoppingCartDto,
    ): Promise<any> {
        return super.update(id, entity);
    }

    constructor(private readonly shoppingCartsService: ShoppingCartsService) {
        super(shoppingCartsService);
    }
}



