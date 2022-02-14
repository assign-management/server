import { faker } from '@faker-js/faker';
import {
  Accessibility,
  CreateProjectArgs,
  InputMaybe,
  PaginationArgs,
  Project,
  ProjectMutationResponse,
  ProjectsResponse,
  UpdateProjectArgs,
} from '../generated/graphql';
import { ProjectRepository } from '../repositories';
import { mockSection } from './sections';

const mockProject = (title?: string, accessibility?: Accessibility) => {
  const id = faker.datatype.uuid();

  return {
    accessibility: accessibility || faker.datatype.boolean() ? Accessibility.Public : Accessibility.Private,
    createdAt: faker.date.recent().toISOString(),
    id,
    title: title || faker.name.title(),
    updatedAt: faker.date.recent().toISOString(),
    sections: [mockSection(id)],
  };
};

export abstract class ProjectServices {
  static async createProject(data: CreateProjectArgs): Promise<ProjectMutationResponse> {
    const project = await ProjectRepository.create(data);
    return { code: 201, success: true, message: 'User email was successfully updated', project };
  }
  static async updateProject(id: string, data: any): Promise<ProjectMutationResponse> {
    const project = await ProjectRepository.update(id, data);
    return { code: 200, success: true, message: '', project };
  }

  static async getProjects(args: PaginationArgs): Promise<ProjectsResponse> {
    const projects = await ProjectRepository.find();
    console.log('projects', projects);

    return { total: 2, projects };
  }

  static async getProject(id: string): Promise<Project> {
    return ProjectRepository.findById(id);
  }

  static async deleteProject(id: string): Promise<ProjectMutationResponse> {
    const project = await ProjectRepository.delete(id);
    return { code: 204, message: '', success: true, project };
  }
}