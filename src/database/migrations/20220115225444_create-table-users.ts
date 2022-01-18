import { Knex } from 'knex';

// "owner" UUID NOT NULL, should be included later
export async function up(knex: Knex): Promise<void> {
  console.log('happen');

  knex.raw(`
  CREATE TYPE IF NOT EXISTS roles AS ENUM ('ADMIN', 'MODERATOR', 'MEMBER');
  
  CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT 'unknown',
    "role" ROLES NOT NULL DEFAULT 'MEMBER',
    "reset_token" VARCHAR(255),
    "reset_token_expires" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
  );

  CREATE TRIGGER IF NOT EXISTS update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
  `);
}

export async function down(knex: Knex): Promise<void> {
  knex.raw(`
  DROP TYPE IF EXISTS roles;
  DROP TRIGGER IF EXISTS update_users_updated_at; 
  DROP TABLE IF EXISTS users;
  `);
}
