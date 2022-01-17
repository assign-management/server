import { Knex, knex } from 'knex';
import { Env } from '../config/constants';
import { isEnv } from '../config/environment';

class Pool {
  private _knex!: Knex;

  public get knex(): Knex {
    return this._knex;
  }

  public set knex(v: Knex) {
    this._knex = v;
  }

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
