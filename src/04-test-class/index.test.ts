// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const biggestNum = Number.MAX_VALUE;
  const smallestNum = Number.MIN_VALUE;
  const smallNum = 1;
  const bigNum = 999999999999999;
  test('should create account with initial balance', () => {
    const testAccount_1 = getBankAccount(biggestNum);
    const testAccount_2 = getBankAccount(smallestNum);
    const testAccount_3 = getBankAccount(smallNum);
    const testAccount_4 = getBankAccount(bigNum);

    expect(testAccount_1.getBalance()).toBe(biggestNum);
    expect(testAccount_2.getBalance()).toBe(smallestNum);
    expect(testAccount_3.getBalance()).toBe(smallNum);
    expect(testAccount_4.getBalance()).toBe(bigNum);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const testAccount = getBankAccount(smallestNum);
    expect(() => testAccount.withdraw(smallestNum + smallestNum)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const testAccount_1 = getBankAccount(smallestNum);
    const testAccount_2 = getBankAccount(biggestNum);
    expect(() => testAccount_1.transfer(smallNum, testAccount_2)).toThrow(
      Error,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const testAccount = getBankAccount(Infinity);
    expect(() => testAccount.transfer(Infinity, testAccount)).toThrow(Error);
  });

  test('should deposit money', () => {
    const testAccount = getBankAccount(smallestNum);
    testAccount.deposit(smallestNum);
    expect(testAccount.getBalance()).toBe(smallestNum + smallestNum);
  });

  test('should withdraw money', () => {
    const testAccount = getBankAccount(biggestNum);
    testAccount.withdraw(smallestNum);
    expect(testAccount.getBalance()).toBe(biggestNum - smallestNum);
  });

  test('should transfer money', () => {
    const testAccount_1 = getBankAccount(smallNum);
    const testAccount_2 = getBankAccount(bigNum);

    testAccount_1.transfer(smallNum, testAccount_2);

    expect(testAccount_1.getBalance()).toBe(smallNum - smallNum);
    expect(testAccount_2.getBalance()).toBe(bigNum + smallNum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const testAccount = getBankAccount(biggestNum);

    jest.spyOn(testAccount, 'fetchBalance').mockResolvedValueOnce(smallestNum);

    const balance = await testAccount.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const testAccount = getBankAccount(smallestNum);
    const fetchBalanceSpy = jest
      .spyOn(testAccount, 'fetchBalance')
      .mockResolvedValue(biggestNum);
    await testAccount.synchronizeBalance();
    expect(testAccount.getBalance()).toBe(biggestNum);
    fetchBalanceSpy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(smallestNum);
    const fetchBalanceSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    fetchBalanceSpy.mockRestore();
  });
});
