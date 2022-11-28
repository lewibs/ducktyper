const { makeDuck, duckfaults } = require("../functions/ducker");

test("test decorator class", ()=>{
    try {
        let isName = makeDuck(String);

        @isName
        class Named {
            name="asdf";

            meth() {}
        }
    } catch (e) {
        expect(e.message).toBe("Using a duck as a class decorator is not yet supported")
    }
});

test("test decorator method", ()=>{
    try {
        let isName = makeDuck(String);

        class Named {
            name="asdf";

            @isName
            meth() {}
        }
    } catch (e) {
        expect(e.message).toBe("Using a duck as a method decorator is not yet supported")
    }
});

test("test decorator method", ()=>{
    let isName = duckfaults(makeDuck(String), {
        message: "name must be a string",
    });

    class Named {
        @isName
        name;

        meth() {}
    }

    let named = new Named();
    named.name = "benjamin";
    expect(named.name).toBe("benjamin");

    try {
        named.name = 12312;
    } catch(e) {
        expect(e.message).toBe("name must be a string");
    }
});

