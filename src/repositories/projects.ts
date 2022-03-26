import { Project } from '../types/project';
import { Accessibility, CreateProjectArgs } from '../types/generated/graphql';
import { Repository } from '../utils/repository';

class ProjectRepository extends Repository<Project, CreateProjectArgs> {
  constructor() {
    super({
      tableName: 'projects',
      returnedColumns: ['id', 'title', 'accessibility', 'createdAt', 'updatedAt'],
    });
  }
}

export const projectRepository = new ProjectRepository();
