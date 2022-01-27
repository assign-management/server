import { Knex } from 'knex';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_ROOT_CONNECTION,
  DATABASE_USERNAME,
  NODE_ENV,
} from '../config/environment';

const { freeze } = Object;

const client = 'postgresql';

const connection = freeze<Knex.PgConnectionConfig>({
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  user: DATABASE_USERNAME,
  port: Number.parseInt(DATABASE_PORT),
  database: DATABASE_NAME,
});

const migrations = freeze<Knex.MigratorConfig>({
  extension: 'ts',
  tableName: 'knex_migrations',
  directory: `${__dirname}/migrations`,
});

const seeds = freeze<Knex.SeederConfig>({
  extension: 'ts',
  directory: `${__dirname}/seeds`,
});

const pool = freeze<Knex.PoolConfig>({ min: 0, max: 10 });

const DATABASE_CONFIG = freeze<Knex.Config>({
  client,
  connection,
  pool,
  migrations,
  seeds,
});

const config: { [key: string]: Knex.Config } = {
  development: DATABASE_CONFIG,
  test: DATABASE_CONFIG,
  production: DATABASE_CONFIG,
};

export const rootKnexConfig = freeze<Knex.Config>({
  client,
  connection: DATABASE_ROOT_CONNECTION,
});

export const knexConfig = config[NODE_ENV];
