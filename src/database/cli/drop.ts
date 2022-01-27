import { DATABASE_NAME } from '../../config/environment';
import pool from '../../pool';
import { Logger } from '../../utils/logger';
import { handleException } from '../../errors/handle-exception';
import { rootKnexConfig } from '../knexfile';

async function dropDatabase() {
  await pool.connect(rootKnexConfig);
  await pool
    .query('DROP DATABASE %I', DATABASE_NAME)
    .catch((err) => {
      Logger.error(`database "${DATABASE_NAME}" not exists\n`);
      handleException(err);
    })
    .finally(() => pool.close());
}

dropDatabase();
