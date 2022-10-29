import isPrimativeConstructor from "../../../functions/is/isPrimativeConstructor";

test('tests Primative classes', ()=>{
    expect(isPrimativeConstructor(String)).toBe(true);
    expect(isPrimativeConstructor(Boolean)).toBe(true);
    expect(isPrimativeConstructor(Number)).toBe(true);
    expect(isPrimativeConstructor("adsf")).toBe(false);
    expect(isPrimativeConstructor(true)).toBe(false);
    expect(isPrimativeConstructor(132)).toBe(false);
    expect(isPrimativeConstructor(class Test{})).toBe(false);
});