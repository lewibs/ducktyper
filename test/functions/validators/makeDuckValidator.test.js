import makeDuckValidator from "../../../functions/makeDuckValidator";

test("test makeDuckValidator", ()=>{
    let person = {
        name: String,
        age: Number,
        children: [String],
        favoriteFoods: [String, String, String],
        address: {
            city: String,
            state: String,
            road: String,
        }
    }

    let legs = {
        leftLeg: Boolean,
        rightLeg: Boolean,
    }

    let isPerson = makeDuckValidator(person);
    expect(isPerson({
        name: "benjamin",
        age: 21,
        children: ["none"],
        favoriteFoods: ["pizza", "rice", "popcorn", "grilled cheese"],
        address: {
            city: "bejing",
            state: "wyoming",
            road: "awsome st",
        }
    })).toBe(true);

    let hasLegStatus = makeDuckValidator(legs);
    expect(hasLegStatus({
        leftLeg: true,
        rightLeg: false,
    })).toBe(true);
});