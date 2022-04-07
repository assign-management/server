import { taskRepository } from '../repositories/tasks';
import { CreateTaskData, MutationStatus, TaskMutationResponse, UpdateTaskData } from '../types/generated/graphql';
import { UUIDValidation } from '../validations/common';
import { createTaskValidation, updateTaskValidation } from '../validations/tasks';

export const fetchTask = async (id: string) => {
  UUIDValidation.validate(id);
  return taskRepository.findOne({ id });
};

export const createTask = async (data: CreateTaskData): Promise<TaskMutationResponse> => {
  createTaskValidation.validate(data);
  const task = await taskRepository.create(data);
  return { status: MutationStatus.Success, task };
};

export const updateTask = async (id: string, data: UpdateTaskData): Promise<TaskMutationResponse> => {
  UUIDValidation.validate(id);
  updateTaskValidation.validate(data);
  const task = await taskRepository.update({ id }, data as any);
  return { status: MutationStatus.Success, task };
};

export const deleteTask = async (id: string): Promise<TaskMutationResponse> => {
  UUIDValidation.validate(id);
  const task = await taskRepository.delete({ id });
  return { status: MutationStatus.Success, task };
};
