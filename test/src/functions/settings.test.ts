import { 
    ISDUCK_OPTIONS,
    initIsDuckOptions, 
    makeDuck,
} from "../../../src";

test("testing updating init settings", ()=>{
    const clone01 = {...ISDUCK_OPTIONS};
    clone01.throw = true;
    initIsDuckOptions(clone01);
    expect(ISDUCK_OPTIONS).toStrictEqual(clone01);

    try {
        makeDuck({glarp:String})({});
        expect(false).toBe(true);
    } catch (e) {
        expect(e.message).toBe(clone01.message);
    }
});