import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
  CREATE TABLE IF NOT EXISTS "sections" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR(255) NOT NULL,
    "order" SERIAL NOT NULL,
    "projectId" UUID,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE
  );
  `);
  await knex.schema.raw(`
    CREATE TRIGGER update_sections_updated_at
    BEFORE UPDATE ON sections
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`DROP TRIGGER IF EXISTS update_sections_updated_at ON sections;`);
  await knex.schema.raw(`DROP TABLE IF EXISTS sections;`);
}
