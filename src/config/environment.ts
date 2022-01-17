import { config } from 'dotenv';
import { randomBytes } from 'crypto';
import { Env } from './constants';

config({
  debug: true,
  path: './',
});

const randomKey = randomBytes(32).toString('hex');

export const isEnv = (env: Env) => NODE_ENV === env;

export const {
  NODE_ENV,
  PORT = 5000,
  SECRET = randomKey,
  DATABASE_NAME = isEnv(Env.Test) ? `assign-test` : 'assign',
  DATABASE_USERNAME = 'postgres',
  DATABASE_PASSWORD = 'postgres',
  DATABASE_HOST = 'localhost',
  DATABASE_PORT = '5432',
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GITHUB_KEY,
  GITHUB_SECRET,
  CLIENT_BASE_URL,
} = process.env;
