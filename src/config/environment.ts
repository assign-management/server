import { config } from 'dotenv';
import { randomBytes } from 'crypto';
import { Env } from './constants';

config({
  debug: !process.env.NODE_ENV || process.env.NODE_ENV == Env.Development,
  path: './.env',
});

const randomKey = randomBytes(32).toString('hex');

export const isEnv = (env: Env) => NODE_ENV === env;

export const {
  NODE_ENV = 'development',
  PORT = 4000,
  SECRET = randomKey,
  DATABASE_NAME = isEnv(Env.Test) ? `assign-test` : 'assign',
  DATABASE_USERNAME = 'postgres',
  DATABASE_PASSWORD = 'postgres',
  DATABASE_HOST = 'localhost',
  DATABASE_PORT = '5432',
  DATABASE_ROOT_CONNECTION = 'postgres://postgres:postgres@localhost',
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  CLIENT_URL = 'http://localhost:3000',
} = process.env;
