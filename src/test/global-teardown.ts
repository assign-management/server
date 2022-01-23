import { getCustomDatabaseConfig } from '../config/database';
import { DATABASE_NAME } from '../config/environment';
import pool from '../pool';

/**
 * Open connection as root user delete database and close connection.
 */
export default async () => {
  await pool.connect(getCustomDatabaseConfig());
  await pool.query('DROP DATABASE %I', DATABASE_NAME);
  await pool.close();
};
