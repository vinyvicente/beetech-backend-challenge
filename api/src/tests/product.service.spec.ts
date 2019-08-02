import { Test, TestingModule } from '@nestjs/testing';
import { ProductEntity } from '../modules/products/product.entity';
import { ProductsService } from '../modules/products/products.service';
import { DeleteResult, UpdateResult } from 'typeorm';

class ProductEntityMock extends ProductEntity {
  id: 1;
  name: 'Produto 1';
}

class ProductServiceMock {
  findAll() {
    return [new ProductEntityMock()];
  }
  create(product: ProductEntity) {
    return new ProductEntityMock();
  }

  update(id, product: ProductEntity) {
    return new UpdateResult();
  }

  delete(id) {
    return new DeleteResult();
  }
}

describe('Product Service (unit)', () => {
  let app: TestingModule;
  let service: ProductsService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ProductsService,
      useClass: ProductServiceMock,
    };
    app = await Test.createTestingModule({
      providers: [ProductsService, ApiServiceProvider],
    }).compile();
    service = app.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('list products', async () => {
      const result = await service.findAll();

      expect(result).toEqual([new ProductEntityMock()]);
    });
  });

  describe('create', () => {
    it('create Product', async () => {
      const result = await service.create(new ProductEntityMock());

      expect(result).toEqual(new ProductEntityMock());
    });
  });

  describe('update', () => {
    it('update Product', async () => {
      const result = await service.update(1, new ProductEntityMock());

      expect(result).toEqual(new UpdateResult());
    });
  });

  describe('delete', () => {
    it('Delete Product', async () => {
      const result = await service.delete(1);

      expect(result).toEqual(new DeleteResult());
    });
  });
});
