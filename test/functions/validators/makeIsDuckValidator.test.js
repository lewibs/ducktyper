import {makeIsDuckValidator} from "../../../functions/makeDuckValidator";

//to trivial to seriously test
test("test makeIsDuckValidator", ()=>{
    let testIsDuck = makeIsDuckValidator();
    expect(testIsDuck.name).toBe("duckValidator");
})