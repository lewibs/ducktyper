import {makeDuck, duckfaults as updateDefaults} from "../../../src/functions/ducker";
import {Any} from "../../../src/functions/Any";
import { isString } from "../../../src";

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
    } catch (e:any) {
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
});

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

test("test Any", ()=>{
    const isAny = makeDuck(Any);
    expect(isAny({name: "yellow"})).toBe(true);
    expect(isAny({glarp: [1,2,3,4]})).toBe(true);
    expect(isAny([1])).toBe(true);
    expect(isAny([])).toBe(true);
    expect(isAny("adsf")).toBe(true);
    expect(isAny(567)).toBe(true);
    expect(isAny([1,2,3,4,5])).toBe(true);
    expect(isAny([{}, {}, 9])).toBe(true);
    expect(isAny(()=>{})).toBe(true);
    expect(isAny(function func(){})).toBe(true);
    function func2(){}
    let func3 = func2;
    expect(isAny(func3)).toBe(true);
    expect(isAny(isAny)).toBe(true);
})

test("test Number", ()=>{
    const isNumber = makeDuck(Number);
    expect(isNumber(69)).toBe(true);
    expect(isNumber("penis")).toBe(false);
});

test("test String", ()=>{
    const isString = makeDuck(String);
    expect(isString("")).toBe(true);
    expect(isString("enis")).toBe(true);
    expect(isString(89)).toBe(false);
});

test("test custom object", ()=>{
    class TestObj {}
    const isObject = makeDuck(TestObj);
    expect(isObject(new TestObj())).toBe(true);
    expect(isObject(89)).toBe(false);

    const isError = makeDuck(Error);
    expect(isError(new Error('this is an error'))).toBe(true);
});

test("test options allow empty", ()=>{
    // throw: Boolean 	Value indicating if a boolean for success will be returned or if it will throw a message on error
    // allowUndefiend: Boolean 	Value indicating if an undefined input will be accepted
    // message: String
    const isNumberArray = updateDefaults(makeDuck([Number]), {
        allowEmpty: false,
    });
    expect(isNumberArray([])).toBe(false);
    expect(isNumberArray([], {
        allowEmpty: true,
    })).toBe(true);

    const isStringArray = updateDefaults(makeDuck([String]), {
        allowEmpty: false,
    });
    expect(isStringArray([])).toBe(false);
    expect(isStringArray([], {
        allowEmpty: true,
    })).toBe(true);

    const isString = makeDuck(String);
    expect(isString("")).toBe(true);
    expect(isString("", {
        allowEmpty: false,
    })).toBe(false);
});

test("testing common use case with options", ()=>{
    const isUserName = updateDefaults(makeDuck(String), {
        message: "not user name",
    })

    const isUserAge = updateDefaults(makeDuck(Number), {
        message: "not a valid age"
    })

    const isFavoriteColor = makeDuck(String);

    const isUser = makeDuck({
        name: isUserName,
        age: isUserAge,
        color: isFavoriteColor,
        array: [String],
    });

    expect(isUser({
        name: "",
        age: 32,
        color: "",
        array: [],
    }, {
        allowEmptyString: false,
    })).toBe(false);

    expect(isUser({
        name: "",
        age: 32,
        color: "",
        array: [],
    }, {
        allowEmptyArray: false,
    })).toBe(false);

    expect(isUser({
        name: "",
        age: 32,
        color: "",
        array: [],
    })).toBe(true);

    try {
        isUser({
            name: "",
            age: 32,
            color: "",
            array: [],
        }, {
            message: "not a valid user",
            childMessage: false,
            throw: true,
        });
    } catch (e) {
        expect(e.message).toBe("not a valid user");
    }

    try {
        isUser({
            name: "",
            age: 32,
            color: "",
            array: [],
        }, {
            message: "not a valid user",
            throw: true,
        });
    } catch (e) {
        expect(e.message !== "not a valid user").toBe(true);
    }

    try {
        //try to fail a child without a message and get the parent
        isUser({
            name: "",
            age: 32,
            color: "",
            array: [],
        }, {
            message: "not a valid user",
            childMessage: true,
            throw: true,
        });
    } catch (e) {
        expect(e.message === "not a valid user").toBe(true);
    }
});

test("test undefined options", ()=>{
    const isUserName = updateDefaults(makeDuck(String), {
        message: "not user name",
        allowUndefined: false,
    });

    expect(isUserName(undefined)).toBe(false);
    expect(isUserName(undefined, {allowUndefined:true})).toBe(true);
    expect(isString(undefined, {allowUndefined:false})).toBe(false);

    try {
        isString(undefined, {allowUndefined:false, throw:true});
        expect(true).toBe(false);
    } catch (error) {
        expect(error.message).toBe("Not a string");
    }
});

// test("test enums", ()=>{
//     enum Direction {
//         Up,
//         Down,
//         Left,
//         Right,
//     }

//     const isDirection = makeDuck(Direction);

//     expect(isDirection(Direction.Down)).toBe(true);
//     expect(isDirection(Direction)).toBe(false);
// });
