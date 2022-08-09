import {Any, ANY} from "../../enums/Any";

test("tests Any against ANY against any", ()=>{
    expect("any" === ANY).toBe(true);
    expect("any" === Any).toBe(true);
    expect(ANY === Any).toBe(true);
});

test("test fails", ()=>{
    expect('asdfsafd'=== ANY).toBe(false);
})