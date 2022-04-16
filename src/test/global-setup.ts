import { DATABASE_NAME, DATABASE_USERNAME } from '../config/environment';
import { knexConfig, rootKnexConfig } from '../database/knexfile';
import pool from '../pool';
import { Logger } from '../utils/logger';

export default async () => {
  try {
    // setup an available connection
    await pool.connect(rootKnexConfig);
    // remove testing db if exists
    await pool.query('DROP DATABASE IF EXISTS %I', DATABASE_NAME);
    // create role for testing
    await pool.query(
      `DO $body$ BEGIN CREATE ROLE %I LOGIN PASSWORD %L;
      EXCEPTION WHEN others THEN RAISE NOTICE 'User exists, not re-creating'; END $body$;`,
      DATABASE_NAME,
      DATABASE_USERNAME,
    );
    // create testing database
    await pool.query(
      `CREATE DATABASE %I OWNER = '%I' ENCODING = 'UTF-8' TEMPLATE template1`,
      DATABASE_NAME,
      DATABASE_USERNAME,
    );
    // finish database creation
    await pool.close();
    // connect to the testing DB to run migrations and seeds.
    await pool.connect(knexConfig);
    await pool.knex.migrate.latest();
    // await pool.knex.seed.run();
    await pool.close();
    Logger.info(`${DATABASE_NAME} database initialization succeeded.`);
  } catch (error) {
    Logger.error(`${DATABASE_NAME} database initialization failed.\n${error}`);
    process.exit(1);
  }
};
