import isClass from "../../../functions/is/isClass";

test('tests with Array class', () => {
  expect(isClass(Array)).toBe(true);
});

test("test fails", ()=>{
  expect(isClass(()=>{})).toBe(false);
  expect(isClass(12345)).toBe(false);
})