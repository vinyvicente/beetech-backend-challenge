import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Type } from 'class-transformer';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    readonly: true,
    default: () => '0',
  })
  createdAt: Date;

  @Column({
    type: 'int',
    width: 11,
    nullable: true,
    default: () => null,
  })
  updatedAt?: Date;
}
