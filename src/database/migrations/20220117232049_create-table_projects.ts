import { Knex } from 'knex';

// "owner" UUID NOT NULL, should be included later
export async function up(knex: Knex): Promise<void> {
  console.log('happen');

  knex.raw(`
  CREATE TYPE IF NOT EXISTS accessibility AS ENUM ('PRIVATE', 'TEAM', 'PUBLIC');
  
  CREATE TABLE IF NOT EXISTS "projects" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR(255) NOT NULL,
    "accessibility" ACCESSIBILITY NOT NULL DEFAULT 'PUBLIC',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
  );

  CREATE TRIGGER IF NOT EXISTS update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
  `);
}

export async function down(knex: Knex): Promise<void> {
  knex.raw(`
  DROP TYPE IF EXISTS accessibility;
  DROP TRIGGER IF EXISTS update_projects_updated_at; 
  DROP TABLE IF EXISTS projects;
  `);
}
