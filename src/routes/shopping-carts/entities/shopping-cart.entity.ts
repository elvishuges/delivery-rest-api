import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { User } from "./../../users/entities/user.entity";
import { Base } from '@/core/entities/base';

@Entity('shoppingcart')
export class ShoppingCart extends Base {
    @Index()
    @Column()
    price: number;

    @Column({ default: false })
    paiedOut: boolean;

    @ManyToOne(() => User, user => user.shoppingCarts)
    user: User;
}
