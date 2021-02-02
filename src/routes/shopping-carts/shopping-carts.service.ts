import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudService } from '@/core';

import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Injectable()
export class ShoppingCartsService extends CrudService<ShoppingCart> {

    async findByStatus(paiedOut: boolean) {
        return await this.shoppingCartRepository.findOne({ paiedOut });
    }
    // testt
    async save(shoppingCart: ShoppingCart): Promise<ShoppingCart> {
        return await this.shoppingCartRepository.save(shoppingCart);
    }

    constructor(
        @InjectRepository(ShoppingCart) private readonly shoppingCartRepository: Repository<ShoppingCart>,
    ) {
        super(shoppingCartRepository);
    }
}
