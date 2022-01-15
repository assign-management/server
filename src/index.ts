import { PORT } from 'config/environment';
import databaseConfig from 'config/database';
import app from './app';
import pool from './pool';

const handleEx = (err: Error) => {
  console.error(err);
  process.exit(1);
};

process.on('uncaughtException', handleEx);
process.on('unhandledRejection', handleEx);

pool
  .connect(databaseConfig)
  .then(() => {
    console.log('database connection established');
    app().then((server) => server.listen(PORT, () => console.log(`Listening on port ${PORT}`)));
  })
  .catch((err) => {
    console.error('database connection failed\n', err);
    process.exit(1);
  });
