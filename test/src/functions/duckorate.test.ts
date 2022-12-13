import { makeDuck, duckorate, isString } from "../../../src/index";

test("testing decorators", ()=>{
    const test = makeDuck({
        field: (val)=>val==="asdf",
    });

    @duckorate(test, {
        type: "class",
    })
    class Test {
        field="asdf";

        @duckorate(isString)
        fart;

        meth(@duckorate(isString, {type:DuckTypes.parameter}) val: any){
            return val;
        }
    }

    let a = new Test();
    a.fart = "asdf";
    expect(a.fart).toBe("asdf");
    expect(a.field).toBe("asdf");
    
    try {
        a.fart = 123;
    } catch(e) {
        expect(e.message).toBe("Not a string");
    }

    expect({...a}.fart).toBe(a.fart);
    expect(JSON.parse(JSON.stringify(a)).fart).toBe(a.fart);
});