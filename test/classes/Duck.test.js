import Duck from "../../classes/Duck";

test("test Duck", ()=>{
    const hasFeet = new Duck({
        leftFoot: Boolean,
        rightFoot: Boolean,
    });

    const hasName = new Duck({
        name: String,
    })

    const hasAge = new Duck({
        age: Number,
    }) 

    const isPerson = new Duck(
        hasName,
        hasAge
    )

    isPerson.add(hasFeet);
    isPerson.defaults = {throw:false}

    expect(isPerson.test({
        name: "benjamin",
        age: 21,
        leftFoot: true,
        rightFoot: true,
    })).toBe(true)

    expect(isPerson.test({
        name: "benjamin",
        age: 21,
        leftFoot: true,
    })).toBe(false)
})