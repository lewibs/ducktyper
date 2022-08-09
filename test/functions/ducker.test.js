import {makeDuck, updateDefaults} from "../../functions/ducker";

test("test makeDuck", ()=>{
    let person = {
        name: "Benjamin",
        age: 25,
        address: {
            city: "secret",
            state: "secret",
            address: "secret",
        },
        children: [{name:"goliath"}, {name:"fin"}],
        employed: false,
        single: true,
    }


    let isNamed = makeDuck({
        name: String,
    })

    expect(isNamed(person)).toBe(true);
})

test("test updateDefaults", ()=>{})