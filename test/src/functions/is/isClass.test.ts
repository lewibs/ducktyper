import isClass from "../../../../src/functions/is/isClass";

test('tests with Array class', () => {
  //class Test{
  //  field;
  //}
  //expect(isClass(Test)).toBe(true);
  //expect(isClass(Array)).toBe(true);
});

test("test fails", ()=>{
  //expect(isClass(()=>{})).toBe(false);
  expect(isClass(function func(){})).toBe(false);
  //expect(isClass(12345)).toBe(false);
})