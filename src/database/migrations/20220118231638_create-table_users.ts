import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
  BEGIN;
  CREATE TYPE roles AS ENUM ('ADMIN', 'MODERATOR', 'MEMBER');
  
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

  CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
  COMMIT;
`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`
  BEGIN;
  DROP TRIGGER update_users_updated_at ON users;
  DROP TABLE IF EXISTS users;
  DROP TYPE IF EXISTS roles;
  COMMIT;
`);
}
