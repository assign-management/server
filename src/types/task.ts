export interface Task {
  id: string;
  title: string;
  order: number;
  dueDate: string;
  description: string;
  sectionId: string;
  createdAt: Date;
  updatedAt: Date;
}
