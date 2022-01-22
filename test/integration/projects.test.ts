// import { default as request } from 'supertest';
// import { app } from '../../app';
// import projectRepo from '../../repos/project-repo';
// import { Context } from '../context';

// describe('users', () => {
//   let context: Context;
//   beforeAll(async () => {
//     context = await Context.build();
//   });

//   beforeEach(() => context.reset());

//   afterAll(() => context.close());

//   it('create a user', async () => {
//     const startingCount = await projectRepo.create({ title: 'string' });
//     await request(await app())
//       .post('/graphql')
//       .send({ username: 'testuser', bio: 'test bio' })
//       .expect(200);

//     const finishingCount = await UserRepo.count();
//     expect(finishingCount - startingCount).toEqual(1);
//   });
// });
