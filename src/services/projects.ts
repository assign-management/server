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
import { createProjectArg } from '../repositories';
import { createProjectValidation } from '../validations';
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
  static async create(data: CreateProjectArgs): Promise<ProjectMutationResponse> {
    createProjectValidation.validate(data);
    const project = await createProjectArg.create(data);
    return { code: 201, success: true, message: 'User email was successfully updated', project };
  }
  static async update(id: string, data: any): Promise<ProjectMutationResponse> {
    const project = await createProjectArg.update({ id }, data);
    return { code: 200, success: true, message: '', project };
  }

  static async fetchProjects(args: PaginationArgs): Promise<ProjectsResponse> {
    const projects = await createProjectArg.find();
    console.log('projects', projects);

    return { total: 2, projects };
  }

  static async fetch(id: string): Promise<Project> {
    return createProjectArg.findOne({ id });
  }

  static async delete(id: string): Promise<ProjectMutationResponse> {
    const project = await createProjectArg.delete({ id });
    return { code: 204, message: '', success: true, project };
  }
}
