import {
  CreateProjectArgs,
  InputMaybe,
  MutationStatus,
  PaginationArgs,
  Project,
  ProjectMutationResponse,
  ProjectsResponse,
  UpdateProjectArgs,
} from '../types/generated/graphql';
import { projectRepository } from '../repositories';
import { createProjectValidation } from '../validations';
import { UUIDValidation } from '../validations/common';
export abstract class ProjectServices {
  static async create(data: CreateProjectArgs): Promise<ProjectMutationResponse> {
    createProjectValidation.validate(data);
    const project = await projectRepository.create(data);
    return { status: MutationStatus.Success, project };
  }
  static async update({ id, ...data }: UpdateProjectArgs): Promise<ProjectMutationResponse> {
    const project = await projectRepository.update({ id }, data as any);
    return { status: MutationStatus.Success, project };
  }

  static async fetchProjects(args: InputMaybe<PaginationArgs> | undefined): Promise<ProjectsResponse> {
    const skip = args?.offset ?? 0;
    const take = args?.limit ?? 20;
    const projects = await projectRepository.find({ skip, take });

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
