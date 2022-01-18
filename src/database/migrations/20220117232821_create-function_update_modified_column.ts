import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.raw(`
  CREATE OR REPLACE FUNCTION update_modified_column()   
  RETURNS TRIGGER AS $$
  BEGIN
      NEW.modified = now();
      RETURN NEW;   
  END;
  $$ language 'plpgsql';
  `);
}

export async function down(knex: Knex): Promise<void> {
  knex.raw(`DROP FUNCTION IF EXISTS "update_modified_column()";`);
}
