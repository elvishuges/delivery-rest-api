import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Base } from '@/core/entities/base';

@Entity('category')
export class Category extends Base {
    @Index()
    @Column()
    name: string;

    @Column()
    description: string;
}
