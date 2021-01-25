import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '@/core';


import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService extends CrudService<Category>  {
    async findByName(name: string) {
        return await this.categoryRepository.findOne({ name });
    }

    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    ) {
        super(categoryRepository);
    }
}
