import { app } from './app';
import { Env } from './config/constants';
import { isEnv, PORT } from './config/environment';
import pool from './pool';
import { handleException } from './errors/handle-exception';
import { Logger } from './utils/logger';
import { knexConfig } from './database/knexfile';

process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleException);

async function startServer() {
  try {
    await pool.connect(knexConfig);
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
