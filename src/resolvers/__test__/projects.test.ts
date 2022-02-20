import { gql } from 'apollo-server-core';
import { graphqlRequest } from '../../test/helpers';

describe('projects', () => {
  describe('create project', () => {
    it('should create a project if the params valid', async () => {
      const data = {
        title: 'test2',
        accessibility: 'PRIVATE',
      };
      const { body } = await graphqlRequest({
        query: gql`
          mutation ($data: CreateProjectArgs!) {
            createProject(data: $data) {
              code
              success
              message
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

      expect(res.code).toBe(201);
      expect(res.project.title).toInclude(data.title);
      expect(res.project.accessibility).toInclude(data.accessibility);
    });
  });
});
