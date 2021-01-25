import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '@/core';

import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService extends CrudService<Product> {
    async findByName(name: string) {
        return await this.productRepository.findOne({ name });
    }

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    ) {
        super(productRepository);
    }
}
