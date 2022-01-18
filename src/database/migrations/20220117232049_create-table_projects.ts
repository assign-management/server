import { Knex } from 'knex';

// "owner" UUID, should be included later
export async function up(knex: Knex): Promise<void> {
  knex.raw(`
  CREATE TABLE "projects" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "accessibility" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
  );


  CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
  `);
}

export async function down(knex: Knex): Promise<void> {}
