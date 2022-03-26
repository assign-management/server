import { sectionRepository } from '../repositories/sections';
import {
  CreateSectionArgs,
  MutationStatus,
  SectionMutationResponse,
  SectionsResponse,
  UpdateSectionArgs,
} from '../types/generated/graphql';
import { createSectionValidation, updateSectionValidation } from '../validations/sections';

export const fetchSections = async (projectId: string): Promise<SectionsResponse> => {
  const sections = await sectionRepository.find({ where: { projectId } });

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

export const updateSection = async ({ id, ...data }: UpdateSectionArgs): Promise<SectionMutationResponse> => {
  updateSectionValidation.validate(data);
  const section = await sectionRepository.update({ id }, data as any);
  return { status: MutationStatus.Success, section };
};
