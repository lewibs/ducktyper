import { makeObjectValidator } from "../../../functions/makeDuckValidator";

test("test makeObjectValidator", ()=>{
    let isNamed = makeObjectValidator({name:String});
    expect(isNamed({name:"benjamin", age:45})).toBe(true);
})