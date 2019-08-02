import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {
  INestApplication,
  HttpService,
  HttpModule,
  Logger,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { ProductsModule } from '../modules/products/products.module';
import { AppController } from '../modules/app/controllers/app.controller';
import { AppService } from '../modules/app/services/app.service';
import { getConnection } from 'typeorm';
import { ProductEntity } from '../modules/products/product.entity';

describe('API (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;
  let token: '';

  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'beetech_postgres_test',
          port: 5432,
          username: 'root',
          password: 'beet3ch',
          database: 'beetech_test',
          synchronize: true,
          logging: false,
          entities: [ProductEntity],
        }),
        AuthModule,
        UsersModule,
        ProductsModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = mockAppModule.createNestApplication();
    httpService = mockAppModule.get<HttpService>(HttpService);

    await getConnection().synchronize(true);

    await app.init();
  });

  it('GET welcome Beetech', async () => {
    const expected = 'Hello Beetech!';
    const response = await request(app.getHttpServer())
      .get('/api')
      .expect(200);
    expect(response.text).toEqual(expected);
  });

  it('GET products empty', async () => {
    const result: AxiosResponse = {
      data: [],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    const expected = '[]';
    const response = await request(app.getHttpServer())
      .get('/api/products')
      .expect(200);
    expect(response.text).toEqual(expected);
  });

  afterAll(async () => {
    app.close();
  });

  it('POST product', async () => {
    const result: AxiosResponse = {
      data: [],
      status: 201,
      statusText: 'Created',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));

    return await request(app.getHttpServer())
      .post('/api/products')
      .send({ name: 'Produto 1', createdAt: 0, updatedAt: 0 })
      .expect(201);
  });

  it('GET product list', async () => {
    const expected =
      '[{"id":1,"name":"Produto 1","createdAt":0,"updatedAt":0}]';
    const response = await request(app.getHttpServer())
      .get('/api/products')
      .expect(200);
    expect(response.text).toEqual(expected);
  });

  it('PUT product', async () => {
    return await request(app.getHttpServer())
      .put('/api/products/1')
      .send({ name: 'Produto 2' })
      .expect(200);
  });

  it('GET product changed', async () => {
    const expected =
      '[{"id":1,"name":"Produto 2","createdAt":0,"updatedAt":0}]';
    const response = await request(app.getHttpServer())
      .get('/api/products')
      .expect(200);
    expect(response.text).toEqual(expected);
  });

  it('DELETE product', async () => {
    return await request(app.getHttpServer())
      .delete('/api/products/1')
      .expect(200);
  });

  it('GET profile no authenticated', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/me')
      .auth(token, { type: 'bearer' })
      .expect(401);
  });

  it('POST Create Token Wrong', async () => {
    return await request(app.getHttpServer())
      .post('/api/login')
      .send({ username: 'admin', password: 'bee' })
      .expect(401);
  });

  it('POST Create Token', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/login')
      .send({ username: 'admin', password: 'beet3ch' })
      .expect(201);

    token = response.body.access_token;
  });

  it('GET profile', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/me')
      .auth(token, { type: 'bearer' })
      .expect(200);
  });
});
