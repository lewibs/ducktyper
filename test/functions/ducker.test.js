import {makeDuck, updateDefaults} from "../../functions/ducker";

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

    const isAged = makeDuck({
        age: Number,
    })

    const isAddress = makeDuck({
        city: String,
        state: String
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
})

test("test updateDefaults", ()=>{
    const isAddress = makeDuck({
        city: String,
        state: String
    });

    const hasAddress = updateDefaults(makeDuck({
        address: isAddress,
    }), {throw: false});

    expect(hasAddress({name: "yellow"})).toBe(false);
})