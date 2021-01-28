import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Base } from '@/core/entities/base';
import { ShoppingCart } from '@/routes/shopping-carts';
import { Product } from '@/routes/products/entities/product.entity';

//import { Category } from "./../../categories/entities/category.entity";

@Entity('shoppingCartProduct')
export class ShoppingCartProduct {

  @OneToMany(() => ShoppingCart, shoppingCart => shoppingCart)
  shoppingCart: ShoppingCart;

  @OneToMany(() => Product, product => product)
  product: Product;

}