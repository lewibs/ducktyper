const { makeDuck, duckfaults, DuckDto } = require("../../lib/index");

test("makeDuck", ()=>{
    {
        let ran = false;
        let isFunctionTest = makeDuck(()=>{
            ran = true;
            return true;
        });
        
        expect(isFunctionTest("test")).toBe(true);
        expect(ran).toBe(true);

        ran = false;

        isFunctionTest = duckfaults(isFunctionTest, {
            message:"isFunctionTest failed",
        });

        expect(isFunctionTest("test")).toBe(true);
        expect(ran).toBe(true);
    }
    
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

    {//failed in user example
        let ran = false;
        let isDuckDto = makeDuck((val)=>{
            ran = true;
            return val instanceof DuckDto;
        });

        class Duck extends DuckDto {}
        
        isDuckDto("dont matter");
        expect(ran).toBe(true);

        ran = false;
        isDuckDto(new Duck());
        expect(ran).toBe(true);

        ran = false;
        isDuckDto(Duck);
        expect(ran).toBe(true);

        expect(isDuckDto(new Duck())).toBe(true);
        expect(isDuckDto(Duck)).toBe(true);
        expect(isDuckDto({})).toBe(false);
        expect(isDuckDto(()=>{})).toBe(false);
        expect(isDuckDto(123)).toBe(false);
        expect(isDuckDto("string")).toBe(false);
    }
});