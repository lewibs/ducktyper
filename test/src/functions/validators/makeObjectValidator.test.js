import { makeObjectValidator } from "../../../../src/functions/makeDuckValidator";

test("test makeObjectValidator", ()=>{
    let isNamed = makeObjectValidator({name:String});
    expect(isNamed({name:"benjamin", age:45})).toBe(true);
    expect(isNamed({name:"benjamin"})).toBe(true);
    expect(isNamed({})).toBe(false);
    expect(isNamed({named:"not correct name"})).toBe(false);

    let isAgedAndNamed = makeObjectValidator({
        name: String,
        age: Number,
    })

    expect(isAgedAndNamed({name:"benjamin", age:45})).toBe(true);
    expect(isAgedAndNamed({name:"benjamin"})).toBe(false);
    expect(isAgedAndNamed({})).toBe(false);
    expect(isAgedAndNamed({named:"not correct name"})).toBe(false);
})