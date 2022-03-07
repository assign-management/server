import faker from '@faker-js/faker';
import { gql, UserInputError } from 'apollo-server-core';
import { MutationStatus, Project } from '../../types/generated/graphql';
import { projectRepository } from '../../repositories';
import { graphqlRequest } from '../../test/helpers';
import { formatToResponse } from '../../test/helpers/format-to-response';
import { mockUserInputError } from '../../test/mock/common';
import { generateProjectArgs, generateProjectArgsArray } from '../../test/mock/projects';

describe('projects', () => {
  describe('fetchProject', () => {
    let project: Project;

    beforeEach(async () => {
      project = await projectRepository.create(generateProjectArgs());
    });

    afterEach(async () => {
      await projectRepository.delete({ id: project.id });
    });

    it('should return a project', async () => {
      const res = await graphqlRequest({
        query: gql`
          query FetchProject($id: ID!) {
            fetchProject(id: $id) {
              id
              title
              accessibility
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          id: project.id,
        },
      });
      const data = res.body.data.fetchProject;
      expect(data).toMatchObject(formatToResponse(project));
    });

    it('should return user input error', async () => {
      const res = await graphqlRequest({
        query: gql`
          query FetchProject($id: ID!) {
            fetchProject(id: $id) {
              id
              title
              accessibility
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          id: faker.datatype.number(),
        },
      });

      const data = res.body.data.fetchProject;
      const [firstError] = res.body.errors;
      expect(firstError.message).toMatch(/uuid/);
      expect(firstError.extensions.code).toBe(mockUserInputError.extensions.code);
      expect(data).toBeNull();
    });
  });

  describe('fetchProjects', () => {
    let projects: Project[];
    beforeEach(async () => {
      projects = await projectRepository.bulkCreate(generateProjectArgsArray());
    });
    afterEach(async () => {
      const ids = projects.map(({ id }) => id);
      await projectRepository.bulkDelete('id', ids);
    });
    it('should return all projects', async () => {
      const res = await graphqlRequest({
        query: gql`
          query FetchProjects($args: PaginationArgs!) {
            fetchProjects(args: $args) {
              total
              projects {
                title
                accessibility
                createdAt
                updatedAt
                id
              }
            }
          }
        `,
        variables: {
          args: {
            offset: 0,
            limit: 20,
          },
        },
      });
      const data = res.body.data.fetchProjects;
      expect(data.projects).toIncludeSameMembers(formatToResponse(projects));
      expect(data.total).toBe(2);
    });
  });
  describe('create project', () => {
    it('should create a project if the params valid', async () => {
      const data = generateProjectArgs();
      const { body } = await graphqlRequest({
        query: gql`
          mutation ($data: CreateProjectArgs!) {
            createProject(data: $data) {
              status
              project {
                id
                title
                accessibility
                createdAt
                updatedAt
              }
            }
          }
        `,
        variables: {
          data,
        },
      });

      const res = body.data.createProject;

      expect(res.status).toBe(MutationStatus.Success);
      expect(res.project.title).toInclude(data.title);
      expect(res.project.accessibility).toMatch(data.accessibility!);
    });
  });
});
