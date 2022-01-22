import { Knex } from 'knex';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME, DATABASE_PORT } from './environment';

const { freeze } = Object;

const connection: Knex.ConnectionConfig = freeze({
  host: DATABASE_HOST,
  port: Number.parseInt(DATABASE_PORT),
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});

const migrations: Knex.MigratorConfig = freeze({
  extension: 'ts',
  tableName: 'knex_migrations',
  directory: 'migrations',
});

const seeds: Knex.SeederConfig<any> = freeze({
  extension: 'ts',
  directory: 'seeds',
});

const pool: Knex.PoolConfig = freeze({ min: 0, max: 10 });

export const DATABASE_CONFIG: Knex.Config = {
  client: 'pg',
  pool,
  connection,
  migrations,
  seeds,
};

export const getCustomDatabaseConfig = (
  databaseName?: string,
  migrationsDir?: string,
  seedsDir?: string,
): Knex.Config => {
  return {
    ...DATABASE_CONFIG,
    connection: {
      ...connection,
      database: databaseName,
    },
    migrations: migrationsDir ? { ...migrations, directory: migrationsDir } : migrations,
    seeds: seedsDir ? { ...migrations, directory: seedsDir } : seeds,
  };
};
