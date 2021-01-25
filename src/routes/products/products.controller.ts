import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudController } from '@/core';
import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';


import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Product')
@Controller()
export class ProductsController extends CrudController<Product>  {

    @ApiOperation({ summary: 'Create new record' })
    @Post()
    async create(@Body() entity: CreateProductDto): Promise<Product> {
        return super.create(entity);
    }

    @ApiOperation({ summary: 'Update an existing record' })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() entity: UpdateProductDto,
    ): Promise<any> {
        return super.update(id, entity);
    }

    @ApiOperation({ summary: 'Find shoppingcart by user id' })
    @Get(':id/category')
    async findById(@Param('id') id: string): Promise<any> {
        return this.productsService.findOne(id, { relations: ["category"] });
    }


    constructor(private readonly productsService: ProductsService) {
        super(productsService);
    }
}
