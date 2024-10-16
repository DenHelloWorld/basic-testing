// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const testPath = '/test/1';
  const testResponse = { data: { id: 1, title: 'Test' } };
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue(testResponse),
    });
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(testPath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
