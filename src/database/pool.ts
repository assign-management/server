import { Knex, knex } from 'knex';
import format from 'pg-format';
import { Logger } from '../utils/logger';

class Pool {
  private _knex!: Knex;

  public get knex(): Knex {
    return this._knex;
  }

  public set knex(v: Knex) {
    this._knex = v;
  }

  async connect(options: Knex.Config) {
    try {
      this.knex = knex(options);
      const res = await this.knex.select(this.knex.raw('1 + 1'));
      Logger.info('database connection established');
      return res;
    } catch (err) {
      Logger.error('database connection failed\n', err);
      this.close();
      process.exit(1);
    }
  }

  close() {
    return this.knex?.destroy();
  }

  query(sql: string, ...args: any[]) {
    return this.knex?.raw(format(sql, ...args));
  }
}

export default new Pool();
