import { knexConfig } from '../../database/knexfile';
import pool from '../../pool';
import http, { Server } from 'http';

export class Context {
  static async build(app: Server) {
    await pool.connect(knexConfig);
    return new Context(app);
  }

  constructor(public readonly app: Server) {}

  async close() {
    await pool.close();
    return this.app.close();
  }
}
