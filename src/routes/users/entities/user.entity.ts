import { Column, Entity, Index } from 'typeorm';
import { hashSync } from 'bcryptjs';

import { Base } from '@/core/entities/base';
import { IUser } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';

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

  @Column({ default: false })
  isActive: boolean;
}
