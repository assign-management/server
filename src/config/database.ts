import { Knex } from 'knex';
import { Env } from './constants';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_PORT,
  isEnv,
} from './environment';

const databaseConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: DATABASE_HOST,
    port: Number.parseInt(DATABASE_PORT),
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: isEnv(Env.Test) ? DATABASE_NAME : `${DATABASE_NAME}-test`,
  },
  pool: { min: 0, max: 10 },
};

export default databaseConfig;
