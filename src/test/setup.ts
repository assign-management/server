/**
 * When you're writing tests, you often need to check that values meet certain conditions.
 * expect gives you access to a number of "matchers" that let you validate different things.
 * For additional Jest matchers maintained by the Jest Community check out jest-extended.
 * @link https://github.com/jest-community/jest-extended
 */
import { Context } from './helpers/context';
import { app } from '../app';

declare global {
  var context: Context;
}

beforeAll(async () => {
  const { httpServer } = await app();
  global.context = await Context.build(httpServer);
});
afterAll(() => global.context.close());
