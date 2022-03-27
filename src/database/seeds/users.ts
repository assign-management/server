import { Knex } from 'knex';
import { generateProjectArgsArray } from '../../test/mock/projects';
import { Project } from '../../types/project';
import { Section } from '../../types/section';
import { Task } from '../../types/task';

import { map, reduce } from 'bluebird';
import { generateSectionArgsArray } from '../../test/mock/sections';
import { generateTaskArgsArray } from '../../test/mock/tasks';

const ROOT_USER_PROJECTS = 50;
const ROOT_USER_SECTIONS = 50;
const ROOT_USER_tasks = 5;

export async function seed(knex: Knex): Promise<void> {
  await knex('projects').del();
  await knex('sections').del();
  await knex('tasks').del();
  const projects = await knex('projects')
    .insert(generateProjectArgsArray(ROOT_USER_PROJECTS))
    .returning<Project[]>('*');
  const sections = await reduce<Project, Section[]>(
    projects,
    async (sectionsAcc, currentProject) => {
      const sections = await knex('sections')
        .insert(generateSectionArgsArray(currentProject.id, ROOT_USER_SECTIONS))
        .returning<Section[]>('*');
      return [...sectionsAcc, ...sections];
    },
    [],
  );

  const tasks = await reduce<Section, Task[]>(
    sections,
    async (tasksAcc, currentTask) => {
      const sections = await knex('tasks')
        .insert(generateTaskArgsArray(currentTask.id, ROOT_USER_tasks))
        .returning<Task[]>('*');
      return [...tasksAcc, ...sections];
    },
    [],
  );

  console.log('sections', tasks);

  // console.log(sections);
  // Deletes ALL existing entries
  //
  // Inserts seed entries
  // await knex("table_name").insert([
  //     { id: 1, colName: "rowValue1" },
  //     { id: 2, colName: "rowValue2" },
  //     { id: 3, colName: "rowValue3" }
  // ]);
}
