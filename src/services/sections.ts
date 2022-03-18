import { faker } from '@faker-js/faker';
import { sectionRepository } from '../repositories/sections';
import {
  CreateSectionArgs,
  MutationStatus,
  SectionMutationResponse,
  SectionsResponse,
} from '../types/generated/graphql';
import { createSectionValidation, updateSectionValidation } from '../validations/sections';

export const fetchSections = async (): Promise<SectionsResponse> => {
  const sections = await sectionRepository.find();

  return { total: sections.length, sections };
};

export const deleteSection = async (id: string): Promise<SectionMutationResponse> => {
  const section = await sectionRepository.delete({ id });
  return { status: MutationStatus.Success, section };
};

export const createSection = async (data: CreateSectionArgs): Promise<SectionMutationResponse> => {
  createSectionValidation.validate(data);
  const section = await sectionRepository.create(data);
  return { status: MutationStatus.Success, section };
};

export const updateSection = async (id: string, data: any): Promise<SectionMutationResponse> => {
  updateSectionValidation.validate(data);
  const section = await sectionRepository.update({ id }, data);
  return { status: MutationStatus.Success, section };
};

//  const fetch = async (id: string): Promise<Project> => {
//   UUIDValidation.validate(id);
//   return projectRepository.findOne({ id });
// }
