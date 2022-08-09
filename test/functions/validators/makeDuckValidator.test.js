import makeDuckValidator from "../../../functions/makeDuckValidator";

test("test different valid normal arrays", ()=>{
    let isStringArray = makeDuckValidator([String]);
    expect(isStringArray(["a"])).toBe(true);
    expect(isStringArray(["a", "b"])).toBe(true);
    expect(isStringArray(["a", "b", "c"])).toBe(true);
    expect(isStringArray(["a", "b", "c", "d"])).toBe(true);
    expect(isStringArray([])).toBe(true);

    let isBoolArray = makeDuckValidator([Boolean]);
    expect(isBoolArray([true, false, true, true])).toBe(true);
    expect(isBoolArray([])).toBe(true);

    let isNumberArray = makeDuckValidator([Number]);
    expect(isNumberArray([1,2,3,4,5])).toBe(true);
    expect(isNumberArray([])).toBe(true);

    let isObjectArray = makeDuckValidator([{name:String}]);
    expect(isObjectArray([])).toBe(true);
})