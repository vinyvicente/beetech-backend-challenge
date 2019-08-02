import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductsModule {}
