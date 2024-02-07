import {  simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 2, action: '%', expected: null }, 
  { a: 'abc', b: 'def', action: Action.Add, expected: null }, 
];

describe('simpleCalculator', () => {
  testCases.forEach((testCase) => {
    const { a, b, action, expected } = testCase;
    test(`should perform ${action} operation on ${a} and ${b}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    });
  });
});