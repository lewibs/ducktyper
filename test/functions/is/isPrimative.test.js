import isPrimitive from "../../../functions/is/isPrimative";

test('tests is Primative with some generic primatives', ()=>{
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive("adsf")).toBe(true);
    expect(isPrimitive(123)).toBe(true);
    expect(isPrimitive(3.342)).toBe(true);
});

test('test fails', ()=>{
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(String)).toBe(false);
    expect(isPrimitive(function f(){})).toBe(false);
})
