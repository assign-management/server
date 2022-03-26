import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { CreateSectionData } from '../../types/generated/graphql';
import { createSectionArrayValidation, createSectionValidation } from '../../validations/sections';

const GENERATE_SECTIONS_DEFAULT_AMOUNT = 2;

export const generateSectionArgs = (projectId: string): CreateSectionData => {
  const sectionArgs = {
    title: faker.name.title(),
    projectId,
  };
  createSectionValidation.validate(sectionArgs);
  return sectionArgs as CreateSectionData;
};

export const generateSectionArgsArray = (
  projectId: string,
  length: number = GENERATE_SECTIONS_DEFAULT_AMOUNT,
): CreateSectionData[] => {
  const sectionsArgs = Array.from({ length }, () => generateSectionArgs(projectId));
  createSectionArrayValidation.validate(sectionsArgs);
  return sectionsArgs;
};
