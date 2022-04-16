import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`CREATE TYPE roles AS ENUM ('ADMIN', 'MODERATOR', 'MEMBER');`);
  await knex.schema.raw(`CREATE TYPE providers AS ENUM ('github', 'google');`);
  await knex.schema.raw(`
  CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL DEFAULT 'unknown',
    "role" ROLES NOT NULL DEFAULT 'MEMBER',
    "resetToken" VARCHAR(255),
    "provider" PROVIDERS,
    "image" VARCHAR(255),
    "resetTokenExpires" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id"),
    CHECK (provider IS NOT NULL OR PASSWORD IS NOT NULL)
  );
  `);
  await knex.schema.raw(`
    CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`DROP TRIGGER IF EXISTS update_users_updated_at ON users;`);
  await knex.schema.raw(`DROP TABLE IF EXISTS users;`);
  await knex.schema.raw(`DROP TYPE IF EXISTS roles;`);
}
