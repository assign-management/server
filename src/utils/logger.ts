import _ from 'lodash';
import winston from 'winston';
import { Env } from '../config/constants';
import { isEnv } from '../config/environment';

const levels = Object.freeze({
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
});

const levelKeys = _.invert(levels);

// const colors = {
//   error: 'red',
//   warn: 'yellow',
//   info: 'green',
//   http: 'magenta',
//   debug: 'white',
// };

// winston.addColors(colors);

const { combine, timestamp, printf, colorize, errors } = winston.format;
const format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  colorize({ level: true }),
  printf(({ timestamp, level, message, stack }) =>
    Boolean(stack) ? `${timestamp} ${level}: ${message}\n${stack}` : `${timestamp} ${level}: ${message}`,
  ),
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'logs/all.log' }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
];

const level = isEnv(Env.Development)
  ? // if env is development show all logs
    levelKeys[levels.debug]
  : isEnv(Env.Production)
  ? // if env is production show info logs and above
    levelKeys[levels.info]
  : // if env is test show only error logs and above
    levelKeys[levels.error];

export const Logger = winston.createLogger({
  format,
  level,
  levels,
  transports,
});
