import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartsService } from './shopping-carts.service';

import { ShoppingCart } from './entities/shopping-cart.entity';
import { ShoppingCartsController } from './shopping-carts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart])],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService],
  exports: [ShoppingCartsService]
})
export class ShoppingCartsModule { }
