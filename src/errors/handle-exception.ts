import Logger from '../utils/logger';

export const handleException = (message?: String) => (err: Error) => {
  if (message) Logger.error('database connection failed\n', err);
  else Logger.error(err);
  process.exit(1);
};
