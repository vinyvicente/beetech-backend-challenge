import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Type } from 'class-transformer';

@Entity()
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
    transformer: {
      to: (value?: Date) =>
        !value ? value : Math.round(value.getTime() / 1000),
      from: (value?: number) => (!value ? value : new Date(value * 1000)),
    },
  })
  @Type(() => Date)
  createdAt: Date;

  @Column({
    type: 'int',
    width: 11,
    nullable: true,
    default: () => null,
    transformer: {
      to: (value?: Date) =>
        !value ? value : Math.round(value.getTime() / 1000),
      from: (value?: number) => (!value ? value : new Date(value * 1000)),
    },
  })
  @Type(() => Date)
  updatedAt?: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date();
  }
}
