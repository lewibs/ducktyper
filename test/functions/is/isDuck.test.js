import isDuck from "../../../functions/is/isDuck";
import {makeDuck as ducker} from "../../../functions/ducker";

test('tests is duck with generic function', () => {
  expect(isDuck(function isDuck() {})).toBe(true);
});

test('tests is duck with ducker function', () => {
    expect(isDuck(ducker(Array))).toBe(true);
});


test('test fails', ()=>{
    expect(isDuck(function duck(){})).toBe(false);
})