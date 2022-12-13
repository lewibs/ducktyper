import isObject from "../../../../src/functions/is/isObject";

test("tests object with generic object", ()=>{
    expect(isObject({})).toBe(true);
})

test("test fails", ()=>{
    expect(isObject([])).toBe(false);
    expect(isObject(Array)).toBe(false);
})