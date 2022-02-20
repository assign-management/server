import { knexConfig } from '../../database/knexfile';
import pool from '../../pool';

export class Context {
  static async build() {
    await pool.connect(knexConfig);
    return new Context();
  }

  constructor() {}
  async close() {
    await pool.close();
  }
}
