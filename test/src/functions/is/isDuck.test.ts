import isDuck from "../../../../src/functions/is/isDuck";
import {makeDuck, duckfaults} from "../../../../src/functions/ducker";
import isFunction from "../../../../src/functions/is/isFunction";


test('tests is duck with ducker function', () => {
    expect(isDuck(makeDuck(Array))).toBe(true);
});


test('test fails', ()=>{
    expect(isDuck(function duck(){})).toBe(false);
})

test('test isDuck with updated isDuck', ()=>{
  let duck = makeDuck(Function);
  expect(isDuck(duck)).toBe(true);
  duck = makeDuck(duck);
  expect(isDuck(duck)).toBe(true);

  duck = duckfaults(duck, {
    message:"still a duck",
  });
  expect(isDuck(duck)).toBe(true);
  duck = duckfaults(duck, {
    message:"another layer",
  })
  expect(isDuck(duck)).toBe(true);


  duck = duckfaults(makeDuck(isFunction), {
    message: "no",
  })
  expect(isDuck(duck)).toBe(true);
});