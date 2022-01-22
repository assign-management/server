import { DATABASE_CONFIG, getCustomDatabaseConfig } from '../config/database';
import pool from '../pool';
import { randomBytes } from 'crypto';
import { DATABASE_NAME } from '../config/environment';
import { knex } from 'knex';

console.log('happen');

export default async () => {
  const rootUserConfig = getCustomDatabaseConfig();
  const NAME_SUFFIX = randomBytes(4).toString('hex');
  const databaseName = `${DATABASE_NAME}-${NAME_SUFFIX}`;
  console.log('databaseName', databaseName);
  await pool.connect(rootUserConfig);
  await pool.query('DROP DATABASE IF EXISTS %I', databaseName);

  await pool.query('CREATE DATABASE %I', databaseName);
  await pool.close();
  await pool.connect(getCustomDatabaseConfig(databaseName, 'src/database/migrations', 'src/database/seeds'));
  await pool.knex.migrate.latest();

  // await pool.query('CREATE DATABASE %I', databaseName);
  // await pool.close();
  // console.log('DATABASE_CONFIG', DATABASE_CONFIG);
};
