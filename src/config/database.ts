import { Knex } from 'knex';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME, DATABASE_PORT } from './environment';

export const DATABASE_CONFIG: Knex.Config = {
  client: 'pg',
  connection: {
    host: DATABASE_HOST,
    port: Number.parseInt(DATABASE_PORT),
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  },
  pool: { min: 0, max: 10 },

  migrations: {
    extension: 'ts',
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    extension: 'ts',
    directory: './seeds',
  },
};
