// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockOneSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      return null;
    });
    const mockTwoSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      return null;
    });
    const mockThreeSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      return null;
    });

    mockOne();
    mockTwo();
    mockThree();

    expect(mockOneSpy).not.toHaveBeenCalled();
    expect(mockTwoSpy).not.toHaveBeenCalled();
    expect(mockThreeSpy).not.toHaveBeenCalled();

    mockOneSpy.mockRestore();
    mockTwoSpy.mockRestore();
    mockThreeSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const unmockedFunctionSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {
        return null;
      });

    unmockedFunction();

    expect(unmockedFunctionSpy).toHaveBeenCalledWith('I am not mocked');

    unmockedFunctionSpy.mockRestore();
  });
});
