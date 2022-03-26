import { Knex } from 'knex';
import pool from '../pool';
import { CreateTaskArgs, Section, Task } from '../types/generated/graphql';
import { FindProps, Repository } from '../utils/repository';

const TASK_SECTION_ID_COLUMN = 'sectionId';

class TaskRepository extends Repository<Task, CreateTaskArgs> {
  constructor() {
    super({
      tableName: 'tasks',
      returnedColumns: [
        'id',
        'title',
        'order',
        'dueDate',
        'description',
        TASK_SECTION_ID_COLUMN,
        'createdAt',
        'updatedAt',
      ],
    });
  }

  find(): Knex.QueryBuilder<Task> {
    const taskColumns = this.returnedColumns?.map((col) => `'${col}', "${col}" `);
    const taskJsonAgg = pool.knex.raw(`jsonb_agg(json_build_object(${taskColumns})) AS tasks`);
    return this.getBuilder().select([TASK_SECTION_ID_COLUMN, taskJsonAgg]).groupBy(TASK_SECTION_ID_COLUMN);
  }
}

export const taskRepository = new TaskRepository();
