// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const test = simpleCalculator({ a: 23, b: 23, action: Action.Add });
    expect(test).toBe(46);
  });

  test('should subtract two numbers', () => {
    const test = simpleCalculator({ a: 23, b: 23, action: Action.Subtract });
    expect(test).toBe(0);
  });

  test('should multiply two numbers', () => {
    const test = simpleCalculator({ a: 23, b: 23, action: Action.Multiply });
    expect(test).toBe(529);
  });

  test('should divide two numbers', () => {
    const test = simpleCalculator({ a: 23, b: 23, action: Action.Divide });
    expect(test).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const test = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(test).toBe(8);
  });

  test('should return null for invalid action', () => {
    const test = simpleCalculator({
      a: 23,
      b: 23,
      action: 'InvalidAction' as Action,
    });
    expect(test).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const test1 = simpleCalculator({
      a: null,
      b: 23,
      action: Action.Add,
    });
    const test2 = simpleCalculator({
      a: 23,
      b: null,
      action: Action.Add,
    });
    const test3 = simpleCalculator({
      a: undefined,
      b: 23,
      action: Action.Add,
    });
    const test4 = simpleCalculator({
      a: 23,
      b: undefined,
      action: Action.Add,
    });

    expect(test1).toBeNull();
    expect(test2).toBeNull();
    expect(test3).toBeNull();
    expect(test4).toBeNull();
  });
});
