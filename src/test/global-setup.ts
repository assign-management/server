// import { getCustomDatabaseConfig } from '../config/database';
// import { DATABASE_NAME } from '../config/environment';
// import pool from '../pool';

// async function createTestDatabase() {
//   await pool.connect(getCustomDatabaseConfig());
//   await pool.query('DROP DATABASE IF EXISTS %I', DATABASE_NAME);
//   await pool.query('CREATE DATABASE %I', DATABASE_NAME);
//   await pool.close();
//   await pool.connect(getCustomDatabaseConfig(DATABASE_NAME, 'src/database/migrations', 'src/database/seeds'));
//   await pool.knex.migrate.latest();
//   // await pool.knex.seed.run();
//   await pool.close();
// }

// export default async () => {
//   try {
//     await createTestDatabase();
//     console.log('Test database created successfully');
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

import Knex from 'knex';

const database = 'assign-test';

// Create the database
async function createTestDatabase() {
  const knex = Knex({
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
    },
  });

  try {
    await knex.raw(`DROP DATABASE IF EXISTS "${database}"`);
    await knex.raw(`CREATE DATABASE "${database}"`);
  } catch (error) {
    throw new Error(error as any);
  } finally {
    await knex.destroy();
  }
}

// Seed the database with schema and data
async function seedTestDatabase() {
  const knex = Knex({
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
    },
    migrations: {
      extension: 'ts',
      directory: 'src/database/migrations',
    },
  });

  try {
    await knex.migrate.latest();
    // await knex.seed.run();
  } catch (error) {
    console.log(error);

    throw new Error(error as any);
  } finally {
    await knex.destroy();
  }
}
module.exports = async () => {
  try {
    await createTestDatabase();
    await seedTestDatabase();
    console.log('Test database created successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
