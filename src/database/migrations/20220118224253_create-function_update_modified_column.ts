import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE OR REPLACE FUNCTION update_modified_column()   
    RETURNS TRIGGER AS $$
    BEGIN
        NEW."updatedAt" = now();
        RETURN NEW;   
    END;
    $$ language 'plpgsql';
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`DROP FUNCTION IF EXISTS update_modified_column;`);
}
