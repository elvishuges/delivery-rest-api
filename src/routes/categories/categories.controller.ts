import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CrudController } from '@/core';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';


@ApiTags('Category')
@Controller()
export class CategoriesController extends CrudController<Category> {

    @ApiOperation({ summary: 'Create new record' })
    @Post()
    async create(@Body() entity: CreateCategoryDto): Promise<Category> {
        return super.create(entity);
    }

    @ApiOperation({ summary: 'Update an existing record' })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() entity: UpdateCategoryDto,
    ): Promise<any> {
        return super.update(id, entity);
    }


    constructor(private readonly categoriesService: CategoriesService) {
        super(categoriesService);
    }
}
