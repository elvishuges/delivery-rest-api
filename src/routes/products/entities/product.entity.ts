import { Column, Entity, Index, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Base } from '@/core/entities/base';

import { Category } from "./../../categories/entities/category.entity";


import { ShoppingCart } from "./../../shopping-carts/entities/shopping-cart.entity";

@Entity('product')
export class Product extends Base {
    @Index()
    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @Column()
    price: number;

    @ManyToOne(() => Category, category => category)
    category: Category;

    @ManyToMany(type => ShoppingCart, shoppingCart => shoppingCart.products)
    shoppingCarts: ShoppingCart[]

}