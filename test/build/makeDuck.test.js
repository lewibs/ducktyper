const { makeDuck, duckfaults } = require("../../lib/index");

test("makeDuck", ()=>{
    
    {
        const isType = makeDuck(String);
        expect(isType("test")).toBe(true);
        expect(isType(1)).toBe(false);
    }

    {
        let isAlwaysTrue = makeDuck(()=>true);
        expect(isAlwaysTrue("test")).toBe(true);
        expect(isAlwaysTrue()).toBe(false);
        
        isAlwaysTrue = duckfaults(isAlwaysTrue, {
            allowUndefined: true,
        })
        expect(isAlwaysTrue()).toBe(true);
    }

    {
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
    
        const isAged = duckfaults(makeDuck({
            age: (v)=>v >= 0,
        }), {
            message: 'invalid age',
        });
    
        const isAddress = duckfaults(makeDuck({
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
    }
});