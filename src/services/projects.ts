import { faker } from '@faker-js/faker';
import {
  Accessibility,
  CreateProjectArgs,
  MutationStatus,
  PaginationArgs,
  Project,
  ProjectMutationResponse,
  ProjectsResponse,
} from '../types/generated/graphql';
import { projectRepository } from '../repositories';
import { createProjectValidation } from '../validations';
import { UUIDValidation } from '../validations/common';
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
    const project = await projectRepository.create(data);
    return { status: MutationStatus.Success, project };
  }
  static async update(id: string, data: any): Promise<ProjectMutationResponse> {
    const project = await projectRepository.update({ id }, data);
    return { status: MutationStatus.Success, project };
  }

  static async fetchProjects(args: PaginationArgs): Promise<ProjectsResponse> {
    const projects = await projectRepository.find();

    return { total: projects.length, projects };
  }

  static async fetch(id: string): Promise<Project> {
    UUIDValidation.validate(id);
    return projectRepository.findOne({ id });
  }

  static async delete(id: string): Promise<ProjectMutationResponse> {
    const project = await projectRepository.delete({ id });
    return { status: MutationStatus.Success, project };
  }
}
