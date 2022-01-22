import pool from '../pool';

class UserRepo {
  queryBuilder = pool.knex.from('users');

  find() {
    const test = this.queryBuilder.select('id', 'email', 'created_at', 'updated_at');

    console.log(test);
  }
}

export default new UserRepo();
