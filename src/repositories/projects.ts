import { Project } from '../@types/project';
import { CreateProjectArgs } from '../generated/graphql';
import { projectsValidation } from '../validations';
import { Repository } from '../utils/repository';

class ProjectRepository extends Repository<Project, CreateProjectArgs> {}

export const projectRepository = new ProjectRepository(
  'projects',
  ['id', 'title', 'accessibility', 'createdAt', 'updatedAt'],
  projectsValidation,
  'p',
);
