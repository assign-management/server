import { Section } from '../types/section';
import { FindProps, Repository } from '../utils/repository';
import { taskRepository } from './tasks';
import pool from '../pool';
import { CreateSectionData, UpdateSectionData } from '../types/generated/graphql';

class SectionRepository extends Repository<Section, CreateSectionData, UpdateSectionData> {
  constructor() {
    super({
      tableName: 'sections',
      returnedColumns: ['id', 'title', 'order', 'projectId', 'createdAt', 'updatedAt'],
    });
  }

  find(args: FindProps<Section> = {}) {
    const query = super.find(args);
    const tasksSubQuery = taskRepository.find().as('ta');
    query.leftJoin(tasksSubQuery, 'ta.sectionId', 'id');
    query.select(pool.knex.raw(`(COALESCE(ta.tasks, '[]'::JSONB)) as tasks`));
    return query;
  }
}

export const sectionRepository = new SectionRepository();
