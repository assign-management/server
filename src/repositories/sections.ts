import { Section } from '../types/section';
import { CreateSectionArgs } from '../types/generated/graphql';
import { Repository } from '../utils/repository';

class SectionRepository extends Repository<Section, CreateSectionArgs> {}

export const sectionRepository = new SectionRepository({
  tableName: 'sections',
  returnedColumns: ['id', 'title', 'order', 'projectId', 'createdAt', 'updatedAt'],
});
