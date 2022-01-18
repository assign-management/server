import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE users (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) DEFAULT 'unknown',
      role VARCHAR(255) DEFAULT 'user',
      reset_token VARCHAR(255),
      reset_token_expires TIMESTAMPTZ(6),
      created_at TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    );

    CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TABLE users;
  `);
}
