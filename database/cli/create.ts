import { DATABASE_NAME } from '../../src/config/environment';
import pool from '../../src/pool';
import { Logger } from '../../src/utils/logger';
import { handleException } from '../../src/errors/handle-exception';
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
