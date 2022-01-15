import { Knex, knex } from 'knex';

class Pool {
  public knex?: Knex<any, unknown[]>;

  connect(options: Knex.Config) {
    this.knex = knex(options);
    return this.knex.select(this.knex.raw('1 + 1'));
  }

  close() {
    return this.knex?.destroy();
  }
  // query(sql, params) {
  //   return this._pool.query(sql, params);
  // }
}

export default new Pool();
