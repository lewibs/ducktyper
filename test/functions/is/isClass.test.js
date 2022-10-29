import isClass from "../../../functions/is/isClass";

test('tests with Array class', () => {
  class Test{
    field;
  }
  expect(isClass(Test)).toBe(true);
  expect(isClass(Array)).toBe(true);
});

test("test fails", ()=>{
  expect(isClass(()=>{})).toBe(false);
  expect(isClass(12345)).toBe(false);
})