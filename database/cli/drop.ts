import { DATABASE_NAME } from '../../src/config/environment';
import pool from '../../src/pool';
import { Logger } from '../../src/utils/logger';
import { handleException } from '../../src/errors/handle-exception';
import { DATABASE_CLI_CONFIG } from './common';

async function dropDatabase() {
  await pool.connect(DATABASE_CLI_CONFIG);
  await pool
    .query('DROP DATABASE %I', DATABASE_NAME)
    .catch((err) => {
      Logger.error(`database "${DATABASE_NAME}" not exists\n`);
      handleException(err);
    })
    .finally(() => pool.close());
}

dropDatabase();
