import { DATABASE_NAME } from '../config/environment';
import { rootKnexConfig } from '../database/knexfile';
import pool from '../pool';

/**
 * Delete testing DB.
 */
export default async () => {
  await pool.connect(rootKnexConfig);
  await pool.query('DROP DATABASE %I', DATABASE_NAME);
  await pool.close();
};
