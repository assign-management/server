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
import {
  createProjectValidation,
  paginationParamValidation,
  updateProjectValidation,
  UUIDValidation,
} from '../validations';
import { FindProps } from '../utils/repository';

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

export const fetchProjects = async (
  paginationArgs: InputMaybe<PaginationArgs> = { offset: 0, limit: 20, filter: [] },
): Promise<ProjectsResponse> => {
  paginationParamValidation.validate(paginationArgs);
  const projects = await projectRepository.find(paginationArgs as FindProps<Project>);

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
