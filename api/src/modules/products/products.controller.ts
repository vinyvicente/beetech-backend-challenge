import {
  Post,
  Put,
  Delete,
  Body,
  Param,
  Controller,
  Get,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from './product.entity';

@Controller('api/products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  async index(): Promise<ProductEntity[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() data: ProductEntity): Promise<any> {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() data: ProductEntity): Promise<any> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.service.delete(id);
  }
}
