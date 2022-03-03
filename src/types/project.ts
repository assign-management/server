import { Accessibility } from './generated/graphql';

export interface Project {
  id: string;
  title: string;
  accessibility: Accessibility;
  createdAt: Date;
  updatedAt: Date;
}
