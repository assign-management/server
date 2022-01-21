import { app } from './app';
import { Env } from './config/constants';
import { DATABASE_CONFIG } from './config/database';
import { isEnv, PORT } from './config/environment';
import pool from './database/pool';
import { handleException } from './errors/handle-exception';
import { Logger } from './utils/logger';

process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleException);

async function startServer() {
  try {
    await pool.connect(DATABASE_CONFIG);
    const { httpServer, apolloServer } = await app();
    httpServer.listen(PORT, () => {
      Logger.info(`Listening on port ${PORT}`);
      if (isEnv(Env.Development)) Logger.info(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  } catch (err) {
    handleException(err as Error);
  }
}

startServer();
