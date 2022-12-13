import { makeDuck, duckorate } from "../../../src/index";

test("testing decorators", ()=>{
    const test = makeDuck({
        field: (val)=>val==="asdf",
    });

    @duckorate(test, {
        type: "class",
    })
    class Test {
        field="asdf";

        // #glarp;

        // @test
        // get glarp() {
        //     return this.#glarp;
        // }

        // @test
        // meth() {

        // }

        // meth2(@test a:any) {
        //     console.log(a);
        // }
    }

    let a = new Test();
});