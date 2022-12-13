import { makeClassValidator } from "../../../../src/functions/makeDuckValidator";

test("test makeClassValidator", ()=>{
    class Test {}
    class NotTest {}
    let isTest = makeClassValidator(Test);
    expect(isTest(new Test())).toBe(true);
    expect(isTest(new NotTest())).toBe(false);
})