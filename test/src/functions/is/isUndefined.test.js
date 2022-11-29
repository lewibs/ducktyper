import isUndefined from "../../../../src/functions/is/isUndefined";

test("test isUndefined", ()=>{
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined()).toBe(true);
    expect(isUndefined(3124)).toBe(false);
    expect(isUndefined(null)).toBe(false);
})