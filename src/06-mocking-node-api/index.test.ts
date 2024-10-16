// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval * 1000);

    expect(callback).toHaveBeenCalledTimes(1000);
  });
});

describe('readFileAsynchronously', () => {
  const mockFile = 'mockFile.txt';
  const mockPath = 'qwertyuiop/mockFile.txt';

  beforeEach(() => {
    jest.clearAllMocks();
    (join as jest.Mock).mockReturnValue(mockPath);
  });

  test('should call join with pathToFile', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from('mock file content'));

    await readFileAsynchronously(mockFile);

    expect(join).toHaveBeenCalledWith(__dirname, mockFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from('mock file content'));

    const result = await readFileAsynchronously(mockFile);

    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from('mock file content'));

    const result = await readFileAsynchronously(mockFile);

    expect(result).toBe('mock file content');
  });
});
