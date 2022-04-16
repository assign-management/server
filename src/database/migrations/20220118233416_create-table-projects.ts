import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`CREATE TYPE accessibility AS ENUM ('PRIVATE', 'TEAM', 'PUBLIC');`);
  await knex.schema.raw(`
  CREATE TABLE IF NOT EXISTS "projects" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR(255) NOT NULL,
    "accessibility" ACCESSIBILITY NOT NULL DEFAULT 'PUBLIC',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
  );
  `);
  await knex.schema.raw(`
    CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;`);
  await knex.schema.raw(`DROP TABLE IF EXISTS projects;`);
  await knex.schema.raw(`DROP TYPE IF EXISTS accessibility;`);
}
