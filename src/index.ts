import app from './app';
import DATABASE_CONFIG from './config/database';
import { PORT } from './config/environment';
import pool from './database/pool';
import { handleException } from './errors/handle-exception';
import Logger from './utils/logger';

process.on('uncaughtException', handleException());
process.on('unhandledRejection', handleException());

pool
  .connect(DATABASE_CONFIG)
  .then(async () => {
    Logger.info('database connection established');
    app()
      .then((server) => server.listen(PORT, () => Logger.info(`Listening on port ${PORT}`)))
      .catch(handleException());
  })
  .catch(handleException('database connection failed\n'));
