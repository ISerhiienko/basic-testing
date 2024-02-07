import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Add });
    expect(result).toEqual(7);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 8, b: 5, action: Action.Subtract });
    expect(result).toEqual(3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 7, action: Action.Multiply });
    expect(result).toEqual(42);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 20, b: 4, action: Action.Divide });
    expect(result).toEqual(5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(result).toEqual(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: '%' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'abc', b: 'def', action: Action.Add });
    expect(result).toBeNull();
  });
});