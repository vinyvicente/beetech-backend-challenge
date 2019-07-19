import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ProductEntity } from './modules/products/product.entity';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'beetech_postgres',
  port: 5432,
  username: 'root',
  password: 'beet3ch',
  database: 'beetech',
  synchronize: true,
  logging: false,
  entities: [ProductEntity],
};

export { typeOrmConfig };
