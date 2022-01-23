import { getCustomDatabaseConfig } from '../config/database';
import { DATABASE_NAME } from '../config/environment';
import pool from '../pool';

async function createTestDatabase() {
  await pool.connect(getCustomDatabaseConfig());
  await pool.query('DROP DATABASE IF EXISTS %I', DATABASE_NAME);
  await pool.query('CREATE DATABASE %I', DATABASE_NAME);
  await pool.close();
  await pool.connect(getCustomDatabaseConfig(DATABASE_NAME, 'src/database/migrations', 'src/database/seeds'));
  await pool.knex.migrate.latest();

  try {
    // require('ts-node/register');
  } catch (err) {}
  // await pool.knex.seed.run();
  await pool.close();
}

export default async () => {
  try {
    await createTestDatabase();
    console.log('Test database created successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
