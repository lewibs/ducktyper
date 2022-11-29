import { makePrimativeValidator } from "../../../../src/functions/makeDuckValidator";

test("test makePrimativeValidator", ()=>{
    let isApple = makePrimativeValidator("apple");
    expect(isApple("apple")).toBe(true);
    expect(isApple("notApple")).toBe(false);
    expect(isApple(324)).toBe(false); 
});