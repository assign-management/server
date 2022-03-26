import { taskRepository } from '../repositories/tasks';
import { CreateTaskArgs, MutationStatus, TaskMutationResponse, UpdateTaskArgs } from '../types/generated/graphql';
import { createTaskValidation, updateTaskValidation } from '../validations/tasks';

export const deleteTask = async (id: string): Promise<TaskMutationResponse> => {
  const task = await taskRepository.delete({ id });
  return { status: MutationStatus.Success, task };
};

export const createTask = async (data: CreateTaskArgs): Promise<TaskMutationResponse> => {
  createTaskValidation.validate(data);
  const task = await taskRepository.create(data);
  console.log('happen');

  return { status: MutationStatus.Success, task };
};

export const updateTask = async ({ id, ...data }: UpdateTaskArgs): Promise<TaskMutationResponse> => {
  updateTaskValidation.validate(data);
  const task = await taskRepository.update({ id }, data as any);
  return { status: MutationStatus.Success, task };
};
