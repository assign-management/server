import { DATABASE_NAME } from '../../config/environment';
import pool from '../pool';
import { Logger } from '../../utils/logger';
import { handleException } from '../../errors/handle-exception';
import { DATABASE_CLI_CONFIG } from './common';

async function createDatabase() {
  await pool.connect(DATABASE_CLI_CONFIG);
  await pool
    .query('CREATE DATABASE %I', DATABASE_NAME)
    .catch((err) => {
      Logger.error(`database "${DATABASE_NAME}" already exists\n`);
      handleException(err);
    })
    .finally(() => pool.close());
}

createDatabase();
