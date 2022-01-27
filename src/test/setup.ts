/**
 * When you're writing tests, you often need to check that values meet certain conditions.
 * expect gives you access to a number of "matchers" that let you validate different things.
 * For additional Jest matchers maintained by the Jest Community check out jest-extended.
 * @link https://github.com/jest-community/jest-extended
 */
import 'jest-extended';
import 'jest-extended/all';
import { Context } from './context';

let content: Context;
beforeAll(async () => {
  content = await Context.build();
});
afterAll(() => content.close());
