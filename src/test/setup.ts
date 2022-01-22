import { Knex } from 'knex';
import pool from '../pool';
import { Context } from './context';

const promisify = (fn: any) => new Promise((resolve, reject) => fn(resolve));

let content: Context;
// let transaction: Knex.Transaction<any, any[]>;
beforeAll(async () => {
  // content = await Context.build();
  // transaction = await pool.knex.transaction();
  console.log(content);
});
afterAll(async () => {
  // transaction.rollback();
  // await content.close();
});
