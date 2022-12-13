import { 
    ISDUCK_OPTIONS,
    DUCKORATE_OPTIONS,
    initDuckorateOptions,
    initIsDuckOptions, 
    DuckTypes,
    makeDuck,
} from "../../../src";

test("testing updating init settings", ()=>{
    const clone01 = {...ISDUCK_OPTIONS};
    clone01.throw = true;
    const clone02 = {...DUCKORATE_OPTIONS};
    clone02.type = DuckTypes.accessor;

    initDuckorateOptions(clone02);
    expect(DUCKORATE_OPTIONS).toStrictEqual(clone02);
    initIsDuckOptions(clone01);
    expect(ISDUCK_OPTIONS).toStrictEqual(clone01);

    try {
        makeDuck({glarp:String})({});
        expect(false).toBe(true);
    } catch (e) {
        expect(e.message).toBe(clone01.message);
    }
});