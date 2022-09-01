import isFunction from "../../../functions/is/isFunction";

test('tests with function', () => {
  expect(isFunction(()=>{})).toBe(true);
});

test("test fails", ()=>{
  expect(isFunction(Array)).toBe(false);
  expect(isFunction(12345)).toBe(false);
})