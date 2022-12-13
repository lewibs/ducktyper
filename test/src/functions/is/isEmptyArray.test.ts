import isEmptyArray from "../../../../src/functions/is/isEmptyArray";

test("tests empty array", ()=>{
    expect(isEmptyArray([])).toBe(true)
});

test("tests non empty array", ()=>{
    expect(isEmptyArray([1])).toBe(false)
});

test("tests non array", ()=>{
    expect(isEmptyArray(1)).toBe(false)
});