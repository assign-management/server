import { Knex } from 'knex';
import { options } from '../config/cli';
import { Env } from '../config/constants';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_ROOT_CONNECTION,
  DATABASE_USERNAME,
  isEnv,
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

/**
 * @link https://github.com/vincit/tarn.js
 */
const pool = freeze<Knex.PoolConfig>({ min: 0, max: 10 });

const DATABASE_CONFIG = freeze<Knex.Config>({
  client,
  connection,
  pool,
  migrations,
  seeds,
  debug: options.debug ?? false,
  /**
   * turn on stack trace capture for all query builders, raw queries and schema builders.
   * When a DB driver returns an error, this previously captured stack trace is thrown instead of a new one.
   * This helps to mitigate default behavior of await in node.js/V8
   * This has small performance overhead, so it is advised to use only for development. Turned off by default.
   * @link https://knexjs.org/#Installation-asyncStackTraces
   */
  asyncStackTraces: isEnv(Env.Development),
});

const config: { [key: string]: Knex.Config } = {
  development: DATABASE_CONFIG,
  test: DATABASE_CONFIG,
  production: DATABASE_CONFIG,
};
/**
 * use root knex config to create or remove database with available connection via
 * DATABASE_ROOT_CONNECTION env variable.
 */
export const rootKnexConfig = freeze<Knex.Config>({ client, connection: DATABASE_ROOT_CONNECTION });
/**
 * use knexConfig for every operation in the application
 */
export const knexConfig = config[NODE_ENV];
/**
 * another export to support the knex cli don't use it
 */
export default config[NODE_ENV];
