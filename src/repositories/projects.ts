import { Project } from '../@types/project';
import { Accessibility, CreateProjectArgs } from '../generated/graphql';
import { Repository } from '../utils/repository';

class ProjectRepository extends Repository<Project, CreateProjectArgs> {}

export const createProjectArg = new ProjectRepository({
  tableName: 'projects',
  returnedColumns: ['id', 'title', 'accessibility', 'createdAt', 'updatedAt'],
});
