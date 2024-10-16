// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 23;
    const test = await resolveValue(value);
    expect(test).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errMessage = 'error message';
    expect(() => throwError(errMessage)).toThrow(Error);
    expect(() => throwError(errMessage)).toThrow(errMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(Error);
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const awError = new MyAwesomeError();
    expect(() => throwCustomError()).toThrow(awError);
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const awError = new MyAwesomeError();
    await expect(rejectCustomError()).rejects.toThrow(awError);
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
