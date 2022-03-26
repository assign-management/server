import { sectionRepository } from '../repositories/sections';
import {
  CreateSectionData,
  MutationStatus,
  SectionMutationResponse,
  SectionsResponse,
  UpdateSectionData,
} from '../types/generated/graphql';
import { UUIDValidation } from '../validations/common';
import { createSectionValidation, updateSectionValidation } from '../validations/sections';

export const fetchSections = async (projectId: string): Promise<SectionsResponse> => {
  const sections = await sectionRepository.find({ where: { projectId } });
  return { total: sections.length, sections };
};

export const createSection = async (data: CreateSectionData): Promise<SectionMutationResponse> => {
  createSectionValidation.validate(data);
  const section = await sectionRepository.create(data);
  return { status: MutationStatus.Success, section };
};

export const updateSection = async (id: string, data: UpdateSectionData): Promise<SectionMutationResponse> => {
  UUIDValidation.validate(id);
  updateSectionValidation.validate(data);
  const section = await sectionRepository.update({ id }, data as any);
  return { status: MutationStatus.Success, section };
};

export const deleteSection = async (id: string): Promise<SectionMutationResponse> => {
  UUIDValidation.validate(id);
  const section = await sectionRepository.delete({ id });
  return { status: MutationStatus.Success, section };
};
