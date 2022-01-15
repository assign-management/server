import databaseConfig from '../config/database';
import { Knex } from 'knex';

export default {
  ...databaseConfig,
  migrations: {
    extension: 'ts',
    tableName: 'knex_migrations',
    directory: 'migrations',
  },
  seeds: {
    extension: 'ts',
    directory: 'seeds',
  },
} as Knex.Config;
