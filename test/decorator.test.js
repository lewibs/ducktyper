const { makeDuck } = require("../functions/ducker");

test("test decorator basics", ()=>{
    let isName = makeDuck(String);

    class Named {
        @isName
        name="asdf";

        meth() {}
    }
});