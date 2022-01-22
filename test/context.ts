import { randomBytes } from 'crypto';
import { Knex } from 'knex';
import _ from 'lodash';
import { DATABASE_CONFIG } from '../src/config/database';
import pool from '../src/pool';
export class Context {
  static async build() {
    // Randomly generate a role name to connect a PG as
    const roleName = `test-${randomBytes(4).toString('hex')}`;
    // Connect to PG
    await pool.connect(DATABASE_CONFIG);
    // Create a new role
    await pool.query('CREATE ROLE %I WITH SUPERUSER LOGIN PASSWORD %L;', roleName, roleName);
    // Create a schema with the same name
    await pool.query('CREATE SCHEMA %I AUTHORIZATION %I;', roleName, roleName);
    //  Disconnect from PG
    await pool.close();
    // Run migration in the new schema

    const config = _.omit(DATABASE_CONFIG, ['connection.database.user', 'connection.database.password']);

    console.log(`${__dirname}/`);

    await pool.connect({
      ...config,
      connection: {
        ...(config.connection as Knex.ConnectionConfigProvider),
        user: roleName,
        password: roleName,
      },
      migrations: {
        ...config.migrations,
        directory: 'src/database/migrations',
      },
    });
    try {
      await pool.knex.migrate.latest();
    } catch (err) {
      console.log('test', err);
    }
    return new Context(roleName);
  }

  constructor(private roleName: string) {}

  async close() {
    // Disconnect from PG
    await pool.close();
    // Reconnect as our root user
    await pool.connect(DATABASE_CONFIG);
    // Delete the role and schema we created
    await pool.query('DROP SCHEMA %I CASCADE;', this.roleName);
    await pool.query('DROP ROLE %I;', this.roleName);
    // Disconnect
    await pool.close();
  }

  async reset() {
    return pool.query(`DELETE FROM users;`);
  }
}
