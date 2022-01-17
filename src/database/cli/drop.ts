import DATABASE_CONFIG from '../../config/database';
import { DATABASE_NAME } from '../../config/environment';
import pool from '../pool';
import format from 'pg-format';
import Logger from '../../utils/logger';

async function dropDatabase() {
  const config = JSON.parse(JSON.stringify(DATABASE_CONFIG));
  delete config.connection.database;
  await pool.connect(config).catch((err) => {
    Logger.error('database connection failed\n', err);
    process.exit(1);
  });
  await pool.knex?.raw(format('DROP DATABASE %I', DATABASE_NAME)).catch((err) => {
    Logger.error('database "assign-test" not exists\n', err);
    process.exit(1);
  });

  await pool.close();
}

dropDatabase();
