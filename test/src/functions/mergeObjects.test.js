import mergeObjects from "../../../src/functions/mergeObjects";

test("tests that it returns a new object instance", ()=>{
    let orig = {a:"a"};
    let a = mergeObjects(orig);
    a.a = "b";
    expect(a.a).toBe("b");
    expect(orig.a).toBe("a");
})

test("tests that it merges two objects", ()=>{
    let a = mergeObjects({a:"a"},{b:"b"});
    expect(a.a).toBe("a");
    expect(a.b).toBe("b");
})