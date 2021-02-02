import { Column, Entity, Index, OneToMany } from 'typeorm';
import { hashSync } from 'bcryptjs';

import { Base } from '@/core/entities/base';
import { IUser } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';

import { ShoppingCart } from "./../../shopping-carts/entities/shopping-cart.entity";

@Entity('user')
export class User extends Base implements IUser {
  @Index()
  @Column()
  firstName: string;

  @Index()
  @Column()
  lastName: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    transformer: {
      to(password: string) {
        return hashSync(password, 10);
      },
      from(hash: string) {
        return hash;
      },
    },
  })
  password: string;

  @OneToMany(() => ShoppingCart, shoppingCart => shoppingCart.user)
  shoppingCarts: ShoppingCart[];

  @Column({ default: false })
  isActive: boolean;
}
