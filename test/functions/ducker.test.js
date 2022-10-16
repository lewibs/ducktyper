import {makeDuck, duckfaults as updateDefaults} from "../../functions/ducker";

test("test makeDuck", ()=>{
    let person = {
        name: "Benjamin",
        age: 25,
        address: {
            city: "secret",
            state: "secret",
        },
        children: [{name:"goliath"}, {name:"fin"}],
        employed: false,
        single: true,
    }

    const isNamed = makeDuck({
        name: String,
    })

    const isAged = updateDefaults(makeDuck({
        age: (v)=>v >= 0,
    }), {
        message: 'invalid age',
    });

    const isAddress = updateDefaults(makeDuck({
        city: String,
        state: String
    }), {
        message: "not a valid address",
    });

    const hasAddress = makeDuck({
        address: isAddress,
    })

    const hasChildren = makeDuck({
        children: [isNamed],
    })

    const isPerson = makeDuck(isNamed, isAged, hasAddress, hasChildren);

    expect(isNamed(person)).toBe(true);
    expect(isAged(person)).toBe(true);
    expect(hasAddress(person)).toBe(true);
    expect(isPerson(person)).toBe(true);
    person.age = -10;
    try {
        isPerson(person, {throw: true});
        throw new Error("failed");
    } catch (e) {
        expect(e.message).toBe("invalid age");
    }

    expect(isPerson(person, {throw: false})).toBe(false);
})

test ("test nested makeDucks", ()=>{
    const isString = updateDefaults(makeDuck(String), {
        message: "not a string",
        allowUndefined: true,
    });

    const hasString = updateDefaults(makeDuck({
        string: isString
    }),{
        message: "fails to have a string",
    });

    expect(hasString({
        string: undefined,
    })).toBe(true);

    try {
        hasString({
            string: 1,
        },{
            throw: true,
        });
        throw new Error("failed to throw");
    } catch(e) {
        expect(e.message).toBe("not a string");
    }
});

test("test messy arrays", ()=>{
    let arr = makeDuck([String]);
    expect(arr(["asdf","asdf","asdf"])).toBe(true);
    expect(arr([])).toBe(true);
    arr = makeDuck([]);
    expect(arr(["asdf","asdf","asdf"])).toBe(true);
    expect(arr("adsf")).toBe(false);
    arr = makeDuck([String, Number]);
    expect(arr(["asdf","asdf","asdf"])).toBe(false);
    expect(arr(["asdf",123,"asdf"])).toBe(true);
    expect(arr([])).toBe(false);
    arr = makeDuck([makeDuck(String)]);
    expect(arr(["asdf","asdf","asdf"])).toBe(true);
    expect(arr(["asdf",123,"asdf"])).toBe(false);
    expect(arr([])).toBe(true);
    arr = makeDuck([makeDuck(String), 123]);
    expect(arr(["asdf","asdf","asdf"])).toBe(false);
    expect(arr(["asdf",123,"asdf"])).toBe(true);
    expect(arr([])).toBe(false);

})

test("test updateDefaults", ()=>{
    const isAddress = makeDuck({
        city: String,
        state: String
    });

    const hasAddress = updateDefaults(makeDuck({
        address: isAddress,
    }), {
        throw: false
    });

    expect(hasAddress({name: "yellow"})).toBe(false);
})