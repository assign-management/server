import { Logger } from '../utils/logger';

export const handleException = (err: Error) => {
  Logger.error(err);
  process.exit(1);
};
