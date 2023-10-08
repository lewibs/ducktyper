import {isPrimativeConstructor} from "../../../../src/functions/is/isPrimativeConstructor";

test('isPrimativeConstructor', ()=>{
    expect(isPrimativeConstructor(true)).toBe(false);
    expect(isPrimativeConstructor(false)).toBe(false);
    expect(isPrimativeConstructor("adsf")).toBe(false);
    expect(isPrimativeConstructor(123)).toBe(false);
    expect(isPrimativeConstructor(3.342)).toBe(false);
    expect(isPrimativeConstructor(Number)).toBe(true);
    expect(isPrimativeConstructor(Object)).toBe(false);
    expect(isPrimativeConstructor(String)).toBe(true);
});
