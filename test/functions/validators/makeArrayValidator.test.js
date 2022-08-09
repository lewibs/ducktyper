import {makeArrayValidator} from "../../../functions/makeDuckValidator";

test("test different valid normal arrays", ()=>{
    let isStringArray = makeArrayValidator([String]);
    expect(isStringArray(["a"])).toBe(true);
    expect(isStringArray(["a", "b"])).toBe(true);
    expect(isStringArray(["a", "b", "c"])).toBe(true);
    expect(isStringArray(["a", "b", "c", "d"])).toBe(true);
    expect(isStringArray([])).toBe(true);

    let isBoolArray = makeArrayValidator([Boolean]);
    expect(isBoolArray([true, false, true, true])).toBe(true);
    expect(isBoolArray([])).toBe(true);

    let isNumberArray = makeArrayValidator([Number]);
    expect(isNumberArray([1,2,3,4,5])).toBe(true);
    expect(isNumberArray([])).toBe(true);

    //let isObjectArray = makeDuckValidator([{name:String}]);
    //expect(isObjectArray([])).toBe(true);
})

test("test different structured arrays", ()=>{
    let isStringArray = makeArrayValidator([String, String]);
    expect(isStringArray(["a", "b"])).toBe(true);
    expect(isStringArray(["a", "b", 1])).toBe(true);
    expect(isStringArray(["a", 1])).toBe(false);
    expect(isStringArray(["a"])).toBe(false);
})