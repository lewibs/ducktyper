import { makeTypeValidator } from "../../../../src/functions/makeDuckValidator";

test("tests makeTypeValidator", ()=>{
    let isString = makeTypeValidator(String);
    expect(isString("string")).toBe(true);
    expect(isString(false)).toBe(false);
    expect(isString(undefined)).toBe(false);

    let isBool = makeTypeValidator(Boolean);
    expect(isBool(true)).toBe(true);
    expect(isBool(false)).toBe(true);

    let isNumber = makeTypeValidator(Number);
    expect(isNumber(6)).toBe(true);
})