import {
  CreateProjectData,
  InputMaybe,
  MutationStatus,
  PaginationArgs,
  Project,
  ProjectMutationResponse,
  ProjectsResponse,
  UpdateProjectData,
} from '../types/generated/graphql';
import { projectRepository } from '../repositories';
import { createProjectValidation, updateProjectValidation } from '../validations';
import { UUIDValidation } from '../validations/common';

export const createProject = async (data: CreateProjectData): Promise<ProjectMutationResponse> => {
  createProjectValidation.validate(data);
  const project = await projectRepository.create(data);
  return { status: MutationStatus.Success, project };
};
export const updateProject = async (id: string, data?: UpdateProjectData): Promise<ProjectMutationResponse> => {
  UUIDValidation.validate(id);
  updateProjectValidation.validate(data);
  const project = await projectRepository.update({ id }, data);
  return { status: MutationStatus.Success, project };
};

export const fetchProjects = async (args: InputMaybe<PaginationArgs> | undefined): Promise<ProjectsResponse> => {
  const skip = args?.offset ?? 0;
  const take = args?.limit ?? 20;
  const projects = await projectRepository.find({ skip, take });

  return { total: projects.length, projects };
};

export const fetchProject = async (id: string): Promise<Project> => {
  UUIDValidation.validate(id);
  return projectRepository.findOne({ id });
};

export const deleteProject = async (id: string): Promise<ProjectMutationResponse> => {
  UUIDValidation.validate(id);
  const project = await projectRepository.delete({ id });
  return { status: MutationStatus.Success, project };
};
