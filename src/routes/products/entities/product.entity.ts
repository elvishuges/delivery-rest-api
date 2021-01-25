import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Base } from '@/core/entities/base';

import { Category } from "./../../categories/entities/category.entity";

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

}