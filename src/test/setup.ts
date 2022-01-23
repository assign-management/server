import { Knex } from 'knex';
import { getCustomDatabaseConfig } from '../config/database';
import { DATABASE_NAME } from '../config/environment';
import pool from '../pool';
import { Context } from './context';

const promisify = (fn: any) => new Promise((resolve, reject) => fn(resolve));

let content: Context;
let transaction: Knex.Transaction<any, any[]>;
beforeAll(async () => {
  await pool.connect(getCustomDatabaseConfig(DATABASE_NAME, 'src/database/migrations', 'src/database/seeds'));
  console.log('success');
  transaction = await pool.knex.transaction();
  // console.log(content);
});
afterAll(async () => {
  transaction.rollback();
  await pool.close();
});
