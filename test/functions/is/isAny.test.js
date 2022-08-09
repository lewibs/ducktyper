import isAny from "../../../functions/is/isAny";
import {Any, ANY} from "../../../enums/Any";

test('tests with string enum ANY and Any', () => {
  expect(isAny(ANY)).toBe(true);
  expect(isAny(Any)).toBe(true);
});

test('tests fails', () => {
  expect(isAny({})).toBe(false);
  expect(isAny([])).toBe(false);
  expect(isAny(true)).toBe(false);
  expect(isAny(1)).toBe(false);
  expect(isAny("anyy")).toBe(false);
  expect(isAny("an")).toBe(false);
});