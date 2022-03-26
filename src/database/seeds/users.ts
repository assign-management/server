import faker from '@faker-js/faker';
import { Knex } from 'knex';
import { generateProjectArgsArray } from '../../test/mock/projects';
import { CreateProjectArgs } from '../../types/generated/graphql';
import { map } from 'bluebird';
import { generateSectionArgsArray } from '../../test/mock/sections';

export async function seed(knex: Knex): Promise<void> {
  await knex('projects').del();
  await knex('sections').del();
  const projects = await knex('projects').insert(generateProjectArgsArray(100)).returning('*');
  await map(projects, ({ id }) => knex('sections').insert(generateSectionArgsArray(id, 100)).returning('*'));

  // Deletes ALL existing entries
  //
  // Inserts seed entries
  // await knex("table_name").insert([
  //     { id: 1, colName: "rowValue1" },
  //     { id: 2, colName: "rowValue2" },
  //     { id: 3, colName: "rowValue3" }
  // ]);
}
