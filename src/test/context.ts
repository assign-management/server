import { randomBytes } from 'crypto';
import _ from 'lodash';
import { DATABASE_CONFIG, getCustomDatabaseConfig } from '../config/database';
import { DATABASE_NAME } from '../config/environment';
import pool from '../pool';

export class Context {
  static rootUserConfig = getCustomDatabaseConfig();
  static async build() {
    console.log('happen');

    // Randomly generate a role name to connect a PG as
    const NAME_SUFFIX = randomBytes(4).toString('hex');
    console.log('NAME_SUFFIX', NAME_SUFFIX);

    const databaseName = `${DATABASE_NAME}-${NAME_SUFFIX}`;
    console.log('databaseName', databaseName);

    // Create a database for testing assign-test
    await pool.connect(Context.rootUserConfig);
    await pool.query('CREATE DATABASE %I', databaseName);
    await pool.close();
    // // Connect to PG
    // await pool.connect(getCustomDatabaseConfig(databaseName)); // change name
    await pool.connect(getCustomDatabaseConfig(databaseName, 'src/database/migrations', 'src/database/seeds'));
    await pool.knex.migrate.latest();
    await pool.knex.seed.run();
    return new Context(databaseName);
  }

  constructor(private databaseName: string) {}

  async close() {
    // Disconnect from PG
    console.log(this.databaseName);
    await pool.close();
    // Reconnect as our root user
    await pool.connect(Context.rootUserConfig);
    // Delete the role and schema we created
    await pool.query('DROP DATABASE %I', this.databaseName);
    // Disconnect
    await pool.close();
  }

  async reset() {
    return pool.query(`DELETE FROM projects;`);
  }
}
