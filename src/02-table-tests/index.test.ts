// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: -1, b: 1, action: Action.Add, expected: 0 },
  { a: -1, b: -1, action: Action.Add, expected: -2 },
  { a: 0, b: 0, action: Action.Add, expected: 0 },
  { a: 1000, b: 5000, action: Action.Add, expected: 6000 },
  { a: 5, b: 10, action: Action.Subtract, expected: -5 },
  { a: -5, b: -10, action: Action.Subtract, expected: 5 },
  { a: 0, b: 5, action: Action.Subtract, expected: -5 },
  { a: 0, b: -5, action: Action.Subtract, expected: 5 },
  { a: 0, b: 5, action: Action.Multiply, expected: 0 },
  { a: 5, b: 0, action: Action.Multiply, expected: 0 },
  { a: -5, b: 5, action: Action.Multiply, expected: -25 },
  { a: -5, b: -5, action: Action.Multiply, expected: 25 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: 0, b: 5, action: Action.Divide, expected: 0 },
  { a: -10, b: 2, action: Action.Divide, expected: -5 },
  { a: 10, b: -2, action: Action.Divide, expected: -5 },
  { a: 0, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 0, b: 5, action: Action.Exponentiate, expected: 0 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
  { a: -2, b: 2, action: Action.Exponentiate, expected: 4 },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'should return $expected when a is $a, b is $b, and action is $action',
    ({ a, b, action, expected }) => {
      const test = simpleCalculator({ a, b, action });
      expect(test).toBe(expected);
    },
  );
});
