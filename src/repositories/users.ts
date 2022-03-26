import { Knex } from 'knex';
import { User } from 'knex/types/tables';
import pool from '../pool';

class UserRepository {
  USER_COLUMNS = ['id', 'email', 'name', 'role'];
  queryBuilder = pool.knex.from('users');

  findOne(where: any) {
    return pool.knex.from('users').where(where).select(this.USER_COLUMNS).first();
  }

  create(data: Knex.DbRecordArr<User>) {
    return pool.knex('users').insert(data).returning('*')[0];
  }

  find() {
    const test = this.queryBuilder.select('id', 'email', 'created_at', 'updated_at');
  }
}

export const userRepository = new UserRepository();
