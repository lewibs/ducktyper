import { makeDuck, duckorator } from "../../../src/index";

test("testing decorators", ()=>{
    const test = duckorator(makeDuck({}));

    // @test
    // class Test {
    //     @duckorator(test)
    //     field;

    //     // #glarp;

    //     // @test
    //     // get glarp() {
    //     //     return this.#glarp;
    //     // }

    //     // @test
    //     // meth() {

    //     // }

    //     // meth2(@test a:any) {
    //     //     console.log(a);
    //     // }
    // }

    // let a = new Test();
});