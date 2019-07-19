import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ProductEntity } from './modules/products/product.entity';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'typeormtest',
  password: 'password',
  database: 'typeormtest',
  synchronize: true,
  logging: false,
  entities: [ProductEntity],
};

export { typeOrmConfig };
