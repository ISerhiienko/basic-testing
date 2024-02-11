import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const withdrawAmount = 200;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(withdrawAmount)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalanceSender = 100;
    const initialBalanceReceiver = 50;
    const transferAmount = 200;
    const sender = getBankAccount(initialBalanceSender);
    const receiver = getBankAccount(initialBalanceReceiver);
    expect(() => sender.transfer(transferAmount, receiver)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const transferAmount = 50;
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(transferAmount, account)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 50;
    const account = getBankAccount(initialBalance);
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawAmount = 50;
    const account = getBankAccount(initialBalance);
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalanceSender = 100;
    const initialBalanceReceiver = 50;
    const transferAmount = 50;
    const sender = getBankAccount(initialBalanceSender);
    const receiver = getBankAccount(initialBalanceReceiver);
    sender.transfer(transferAmount, receiver);
    expect(sender.getBalance()).toBe(initialBalanceSender - transferAmount);
    expect(receiver.getBalance()).toBe(initialBalanceReceiver + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();
    expect(typeof balance === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const balance = 200;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(balance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError);
  });
});
