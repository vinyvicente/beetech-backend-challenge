import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.repository.find();
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    return await this.repository.save(product);
  }

  async update(id, product: ProductEntity): Promise<UpdateResult> {
    product.id = Number(id);

    return await this.repository.update(product.id, product);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
