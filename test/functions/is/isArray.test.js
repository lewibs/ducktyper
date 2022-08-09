import isArray from "../../../functions/is/isArray";

test('tests with Array', () => {
  expect(isArray([])).toBe(true);
});

test("test fails", ()=>{
  expect(isArray({})).toBe(false);
  expect(isArray(true)).toBe(false);
})