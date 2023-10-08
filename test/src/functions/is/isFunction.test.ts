import isFunction from "../../../../src/functions/is/isFunction";

test('tests with function', () => {
  expect(isFunction(()=>{})).toBe(true);
  expect(isFunction(function func(){})).toBe(true);
  expect(isFunction(Array)).toBe(true);
  expect(isFunction(12345)).toBe(false);
});